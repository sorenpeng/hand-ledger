'use client';

import { useState, useCallback } from 'react';
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

  const flipPage = useCallback(
    (direction: FlipDirection) => {
      if (isFlipping) return;

      const nextPage = direction === 'forward' ? currentPage + 1 : currentPage - 1;

      // Bounds check
      if (nextPage < 0 || nextPage > totalPages) return;

      setIsFlipping(true);
      setFlipDirection(direction);
      setCurrentPage(nextPage);

      // Reset flipping state after animation
      setTimeout(() => {
        setIsFlipping(false);
        setFlipDirection(null);
      }, 800);
    },
    [currentPage, isFlipping, totalPages]
  );

  const goToPage = useCallback(
    (pageIndex: number) => {
      if (isFlipping) return;
      if (pageIndex < 0 || pageIndex > totalPages) return;

      setCurrentPage(pageIndex);
    },
    [isFlipping, totalPages]
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
