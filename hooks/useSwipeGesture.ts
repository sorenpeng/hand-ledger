'use client';

import type { PanInfo } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { isInteractiveTarget } from '@/lib/interaction';

interface UseSwipeGestureOptions {
  threshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

interface UseSwipeGestureReturn {
  onDragStart: (event: MouseEvent | TouchEvent | PointerEvent) => void;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  isDragging: boolean;
  dragX: number;
}

/**
 * Hook for detecting swipe gestures
 */
export function useSwipeGesture({
  threshold = 50,
  onSwipeLeft,
  onSwipeRight,
}: UseSwipeGestureOptions): UseSwipeGestureReturn {
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const ignoreSwipeRef = useRef(false);

  const onDragStart = useCallback((event: MouseEvent | TouchEvent | PointerEvent) => {
    if (isInteractiveTarget(event.target)) {
      ignoreSwipeRef.current = true;
      setIsDragging(false);
      setDragX(0);
      return;
    }

    ignoreSwipeRef.current = false;
    setIsDragging(true);
  }, []);

  const onDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      setDragX(0);

      if (ignoreSwipeRef.current) {
        ignoreSwipeRef.current = false;
        return;
      }

      const velocity = info.velocity.x;
      const offset = info.offset.x;

      // Check if swipe was fast enough or far enough
      const isSwipe = Math.abs(velocity) > 500 || Math.abs(offset) > threshold;

      if (isSwipe) {
        if (offset < 0 || velocity < -500) {
          onSwipeLeft?.();
        } else if (offset > 0 || velocity > 500) {
          onSwipeRight?.();
        }
      }
    },
    [threshold, onSwipeLeft, onSwipeRight],
  );

  return {
    onDragStart,
    onDragEnd,
    isDragging,
    dragX,
  };
}
