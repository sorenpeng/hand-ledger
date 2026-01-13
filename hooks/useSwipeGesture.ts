'use client';

import type { PanInfo } from 'framer-motion';
import { useCallback, useState } from 'react';

interface UseSwipeGestureOptions {
  threshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

interface UseSwipeGestureReturn {
  onDragStart: () => void;
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

  const onDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const onDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      setDragX(0);

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
