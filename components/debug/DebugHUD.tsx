'use client';

import { useEffect, useState } from 'react';

interface LastInput {
  type: string;
  target: string;
  path: string[];
  timestamp: number;
}

interface DebugHUDProps {
  isOpen?: boolean;
  currentPage?: number;
  totalPages?: number;
  isFlipping?: boolean;
}

/**
 * Development-only debug overlay that shows journal state and input events.
 * Enable by adding ?debug=1 to the URL.
 */
export function DebugHUD({
  isOpen = false,
  currentPage = 0,
  totalPages = 0,
  isFlipping = false,
}: DebugHUDProps) {
  const [enabled, setEnabled] = useState(false);
  const [lastInput, setLastInput] = useState<LastInput | null>(null);

  const [pageState, setPageState] = useState({ currentPage: 0, totalPages: 0 });

  // Check for debug query param
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setEnabled(params.get('debug') === '1');
  }, []);

  // Observe page state from DOM data attributes
  useEffect(() => {
    if (!enabled) return;

    const updatePageState = () => {
      const pages = document.querySelectorAll('[data-page-state]');
      const total = pages.length;
      let current = 0;
      pages.forEach((page) => {
        if (page.getAttribute('data-page-state') === 'active') {
          current = Number.parseInt(page.getAttribute('data-page-index') || '0', 10);
        }
      });
      setPageState({ currentPage: current, totalPages: total });
    };

    // Initial read
    updatePageState();

    // Use MutationObserver to track changes
    const observer = new MutationObserver(updatePageState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-page-state'],
      subtree: true,
    });

    return () => observer.disconnect();
  }, [enabled]);

  // Track input events
  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const path = getEventPath(e);
      setLastInput({
        type: 'click',
        target: getElementDescription(target),
        path: path.map(getElementDescription),
        timestamp: Date.now(),
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      setLastInput({
        type: `keydown: ${e.key}`,
        target: getElementDescription(e.target as HTMLElement),
        path: [],
        timestamp: Date.now(),
      });
    };

    const handleDragStart = () => {
      setLastInput({
        type: 'drag start',
        target: 'PageStack',
        path: [],
        timestamp: Date.now(),
      });
    };

    const handleDragEnd = () => {
      setLastInput((prev) =>
        prev?.type === 'drag start' ? { ...prev, type: 'drag end', timestamp: Date.now() } : prev,
      );
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('mousedown', handleDragStart, true);
    document.addEventListener('mouseup', handleDragEnd, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('mousedown', handleDragStart, true);
      document.removeEventListener('mouseup', handleDragEnd, true);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="fixed top-4 right-4 bg-black/80 text-white text-xs font-mono p-3 rounded-lg z-[9999] max-w-xs"
      style={{ pointerEvents: 'none' }}
    >
      <div className="font-bold text-yellow-400 mb-2">Debug HUD</div>

      <div className="space-y-1">
        <div>
          <span className="text-gray-400">isOpen:</span>{' '}
          <span className={isOpen ? 'text-green-400' : 'text-red-400'}>
            {isOpen ? 'true' : 'false'}
          </span>
        </div>
        <div>
          <span className="text-gray-400">currentPage:</span> {currentPage ?? pageState.currentPage}{' '}
          / {totalPages ?? pageState.totalPages}
        </div>
        <div>
          <span className="text-gray-400">isFlipping:</span>{' '}
          <span className={isFlipping ? 'text-yellow-400' : 'text-gray-500'}>
            {isFlipping ? 'true' : 'false'}
          </span>
        </div>
      </div>

      {lastInput && (
        <div className="mt-3 pt-2 border-t border-gray-600">
          <div className="text-gray-400 mb-1">Last Input:</div>
          <div>
            <span className="text-blue-400">{lastInput.type}</span>
          </div>
          <div className="text-gray-300 truncate">→ {lastInput.target}</div>
          {lastInput.path.length > 0 && (
            <div className="text-gray-500 text-[10px] mt-1">
              Path: {lastInput.path.slice(0, 3).join(' → ')}
              {lastInput.path.length > 3 && '...'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Get a human-readable description of an element
 */
function getElementDescription(el: HTMLElement | null): string {
  if (!el) return '(none)';

  const parts: string[] = [];

  // Role or tag name
  const role = el.getAttribute('role');
  const ariaLabel = el.getAttribute('aria-label');
  const pageState = el.getAttribute('data-page-state');

  if (ariaLabel) {
    parts.push(ariaLabel);
  } else if (role) {
    parts.push(`[${role}]`);
  } else {
    parts.push(el.tagName.toLowerCase());
  }

  if (pageState) {
    parts.push(`(${pageState})`);
  }

  return parts.join(' ');
}

/**
 * Get the event path (list of elements from target to root)
 */
function getEventPath(e: Event): HTMLElement[] {
  if ('composedPath' in e) {
    return (e.composedPath() as HTMLElement[]).filter((el) => el instanceof HTMLElement);
  }
  return [];
}
