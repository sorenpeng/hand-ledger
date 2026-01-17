'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { FlipDirection } from '@/types/journal';

interface UsePageFlipReturn {
  currentPage: number;
  isFlipping: boolean;
  flipDirection: FlipDirection | null;
  flipPage: (direction: FlipDirection) => void;
  goToPage: (pageIndex: number) => void;
  totalPages: number;
}

/**
 * Hook for managing page flip state and animations
 */
export function usePageFlip(totalPages: number): UsePageFlipReturn {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<FlipDirection | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const flipPage = useCallback(
    (direction: FlipDirection) => {
      if (isFlipping) return;

      const nextPage = direction === 'forward' ? currentPage + 1 : currentPage - 1;

      // Bounds check
      if (nextPage < 0 || nextPage >= totalPages) return;

      setIsFlipping(true);
      setFlipDirection(direction);
      setCurrentPage(nextPage);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Reset flipping state after animation
      // Use 600ms instead of 800ms to allow faster consecutive flips
      // while still preventing double-triggers during the critical animation phase
      timeoutRef.current = setTimeout(() => {
        setIsFlipping(false);
        setFlipDirection(null);
      }, 600);
    },
    [currentPage, isFlipping, totalPages],
  );

  const goToPage = useCallback(
    (pageIndex: number) => {
      if (isFlipping) return;
      if (pageIndex < 0 || pageIndex >= totalPages) return;

      setCurrentPage(pageIndex);
    },
    [isFlipping, totalPages],
  );

  return {
    currentPage,
    isFlipping,
    flipDirection,
    flipPage,
    goToPage,
    totalPages,
  };
}
