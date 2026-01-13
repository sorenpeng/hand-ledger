'use client';

import { cn } from '@/lib/utils';
import { Page } from './Page';
import { usePageFlip } from '@/hooks/usePageFlip';
import { useEffect } from 'react';

interface PageStackProps {
  className?: string;
}

// Demo pages for initial setup
const demoPages = [
  {
    id: 'page-1',
    frontContent: (
      <div className="p-8">
        <h2 className="vintage-serif text-2xl text-ink-brown mb-4">Welcome</h2>
        <p className="handwriting text-ink-sepia text-lg">
          This is your junk journal. Each page is a canvas for memories, ephemera, and beautiful chaos.
        </p>
      </div>
    ),
    backContent: (
      <div className="p-8 flex items-center justify-center h-full">
        <p className="typewriter text-ink-faded text-sm text-center">
          [ more pages coming soon ]
        </p>
      </div>
    ),
  },
  {
    id: 'page-2',
    frontContent: (
      <div className="p-8">
        <h2 className="vintage-serif text-2xl text-ink-brown mb-4">Collected Moments</h2>
        <div className="handwriting text-ink-sepia">
          <p className="mb-4">Tickets, receipts, notes...</p>
          <p>Everything has a story.</p>
        </div>
      </div>
    ),
    backContent: (
      <div className="p-8">
        <div className="border-2 border-dashed border-ink-faded/30 h-full rounded flex items-center justify-center">
          <span className="text-ink-faded/50 typewriter text-xs">paste something here</span>
        </div>
      </div>
    ),
  },
];

export function PageStack({ className }: PageStackProps) {
  const { currentPage, flipPage, totalPages } = usePageFlip(demoPages.length);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        flipPage('forward');
      } else if (e.key === 'ArrowLeft') {
        flipPage('backward');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flipPage]);

  return (
    <div className={cn('absolute inset-0', className)}>
      {/* Pages */}
      {demoPages.map((page, index) => (
        <Page
          key={page.id}
          index={index}
          currentPage={currentPage}
          totalPages={totalPages}
          frontContent={page.frontContent}
          backContent={page.backContent}
          onClick={() => flipPage('forward')}
        />
      ))}

      {/* Navigation hint */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 text-paper-aged/50 text-xs typewriter">
        <span>← prev</span>
        <span className="text-paper-aged/70">
          {currentPage + 1} / {totalPages}
        </span>
        <span>next →</span>
      </div>
    </div>
  );
}
