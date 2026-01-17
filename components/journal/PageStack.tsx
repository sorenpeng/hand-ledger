'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { allPages } from '@/content/pages';
import { usePageFlip } from '@/hooks/usePageFlip';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { cn } from '@/lib/utils';
import { Page } from './Page';

interface PageStackProps {
  className?: string;
}

export function PageStack({ className }: PageStackProps) {
  const { currentPage, flipPage, totalPages, isFlipping } = usePageFlip(allPages.length);

  // Swipe gesture handlers
  const swipeHandlers = useSwipeGesture({
    threshold: 80,
    onSwipeLeft: () => flipPage('forward'),
    onSwipeRight: () => flipPage('backward'),
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        flipPage('forward');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        flipPage('backward');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flipPage]);

  const handlePageClickForward = useCallback(() => {
    if (!isFlipping) {
      flipPage('forward');
    }
  }, [flipPage, isFlipping]);

  const handlePageClickBackward = useCallback(() => {
    if (!isFlipping) {
      flipPage('backward');
    }
  }, [flipPage, isFlipping]);

  return (
    <motion.div
      className={cn('absolute inset-0 cursor-grab active:cursor-grabbing', className)}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragStart={swipeHandlers.onDragStart}
      onDragEnd={swipeHandlers.onDragEnd}
    >
      {/* Page edge stack effect (visible pages underneath) */}
      <PageEdges currentPage={currentPage} totalPages={totalPages} />

      {/* Rendered pages */}
      {allPages.map((page, index) => (
        <Page
          key={page.id}
          index={index}
          currentPage={currentPage}
          totalPages={totalPages}
          frontContent={page.frontContent}
          backContent={page.backContent}
          onClickForward={handlePageClickForward}
          onClickBackward={handlePageClickBackward}
        />
      ))}

      {/* Navigation controls */}
      <NavigationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => flipPage('backward')}
        onNext={() => flipPage('forward')}
        isFlipping={isFlipping}
      />
    </motion.div>
  );
}

// Page edges for stacking effect
function PageEdges({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const unflippedPages = totalPages - currentPage;
  const flippedPages = currentPage;

  return (
    <>
      {/* Right side edges (unflipped pages) */}
      {unflippedPages > 1 && (
        <div className="absolute right-0 top-0 bottom-0 w-2 pointer-events-none">
          {Array.from({ length: Math.min(unflippedPages - 1, 5) }).map((_, i) => (
            <div
              key={`right-edge-${i}`}
              className="absolute top-0 bottom-0 bg-paper-aged/80"
              style={{
                right: i * 2,
                width: 2,
                boxShadow: '1px 0 2px rgba(0,0,0,0.1)',
              }}
            />
          ))}
        </div>
      )}

      {/* Left side edges (flipped pages) */}
      {flippedPages > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-2 pointer-events-none">
          {Array.from({ length: Math.min(flippedPages, 5) }).map((_, i) => (
            <div
              key={`left-edge-${i}`}
              className="absolute top-0 bottom-0 bg-paper-aged/70"
              style={{
                left: i * 2,
                width: 2,
                boxShadow: '-1px 0 2px rgba(0,0,0,0.1)',
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}

// Navigation controls
interface NavigationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  isFlipping: boolean;
}

function NavigationControls({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  isFlipping,
}: NavigationControlsProps) {
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6">
      {/* Previous button */}
      <button
        type="button"
        onClick={onPrev}
        disabled={!canGoPrev || isFlipping}
        aria-label="Flip backward"
        className={cn(
          'typewriter text-xs transition-all duration-200',
          canGoPrev && !isFlipping
            ? 'text-paper-aged/70 hover:text-paper-cream cursor-pointer'
            : 'text-paper-aged/30 cursor-not-allowed',
        )}
      >
        ← prev
      </button>

      {/* Page indicator */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              i < currentPage
                ? 'bg-paper-aged/60'
                : i === currentPage
                  ? 'bg-paper-cream w-3'
                  : 'bg-paper-aged/30',
            )}
          />
        ))}
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext || isFlipping}
        aria-label="Flip forward"
        className={cn(
          'typewriter text-xs transition-all duration-200',
          canGoNext && !isFlipping
            ? 'text-paper-aged/70 hover:text-paper-cream cursor-pointer'
            : 'text-paper-aged/30 cursor-not-allowed',
        )}
      >
        next →
      </button>
    </div>
  );
}
