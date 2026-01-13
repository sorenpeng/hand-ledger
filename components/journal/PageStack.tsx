'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { usePageFlip } from '@/hooks/usePageFlip';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { cn } from '@/lib/utils';
import { Page } from './Page';

interface PageStackProps {
  className?: string;
}

// Sample pages showcasing junk journal aesthetic
const journalPages = [
  {
    id: 'page-1',
    frontContent: (
      <div className="p-8 h-full flex flex-col">
        <h2 className="vintage-serif text-2xl md:text-3xl text-ink-brown mb-4">Welcome</h2>
        <p className="handwriting text-ink-sepia text-lg md:text-xl leading-relaxed">
          This is your junk journal. Each page is a canvas for memories, ephemera, and beautiful
          chaos.
        </p>
        <div className="mt-auto">
          <p className="typewriter text-ink-faded text-xs">click or swipe to turn pages</p>
        </div>
      </div>
    ),
    backContent: (
      <div className="p-8 h-full">
        <div className="h-full border-2 border-dashed border-ink-faded/20 rounded flex flex-col items-center justify-center gap-4">
          <div className="w-24 h-24 rounded-full border-2 border-ink-faded/30 flex items-center justify-center">
            <span className="handwriting text-ink-faded/50 text-2xl">✿</span>
          </div>
          <p className="typewriter text-ink-faded/40 text-xs">a space for something special</p>
        </div>
      </div>
    ),
  },
  {
    id: 'page-2',
    frontContent: (
      <div className="p-8 h-full">
        <h2 className="vintage-serif text-xl md:text-2xl text-ink-brown mb-6">Collected Moments</h2>
        <div className="space-y-4">
          <div className="bg-paper-aged/50 p-4 rounded shadow-paper transform -rotate-1">
            <p className="handwriting text-ink-sepia">Train ticket from Paris</p>
            <p className="typewriter text-ink-faded text-xs mt-2">June 15, 2024</p>
          </div>
          <div className="bg-tape-cream/70 p-3 rounded shadow-paper transform rotate-2 ml-8">
            <p className="handwriting text-ink-sepia text-sm">a pressed flower from the garden</p>
          </div>
          <div className="bg-paper-dark/30 p-4 rounded shadow-paper transform -rotate-2">
            <p className="typewriter text-ink-faded text-xs">
              &quot;The best things in life
              <br />
              are the moments we create.&quot;
            </p>
          </div>
        </div>
      </div>
    ),
    backContent: (
      <div className="p-8 h-full relative">
        <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-wax-red/80 flex items-center justify-center shadow-lifted transform rotate-12">
          <span className="text-paper-cream text-2xl">❦</span>
        </div>
        <div className="h-full flex items-center justify-center">
          <p className="handwriting text-ink-sepia/60 text-center text-lg">
            memories are
            <br />
            the architecture
            <br />
            of identity
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'page-3',
    frontContent: (
      <div className="p-8 h-full">
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="bg-paper-aged/40 p-4 rounded">
            <h3 className="vintage-serif text-lg text-ink-brown mb-2">Notes</h3>
            <div className="space-y-2">
              <p className="handwriting text-ink-sepia text-sm">• Buy more washi tape</p>
              <p className="handwriting text-ink-sepia text-sm">• Find vintage postcards</p>
              <p className="handwriting text-ink-sepia text-sm">• Press autumn leaves</p>
            </div>
          </div>
          <div className="bg-coffee-stain/20 p-4 rounded transform rotate-1">
            <div className="border-l-4 border-ink-brown/30 pl-3">
              <p className="handwriting text-ink-sepia italic">
                &quot;Art is not what you see,
                <br />
                but what you make others see.&quot;
              </p>
              <p className="typewriter text-ink-faded text-xs mt-2">— Edgar Degas</p>
            </div>
          </div>
        </div>
      </div>
    ),
    backContent: (
      <div className="p-8 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block border-4 border-double border-ink-faded/40 p-6">
            <p className="vintage-serif text-ink-brown text-xl mb-2">Ephemera</p>
            <p className="typewriter text-ink-faded text-xs">
              fragments of everyday life
              <br />
              preserved for eternity
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'page-4',
    frontContent: (
      <div className="p-8 h-full relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-lace-ivory/50 rounded-full blur-xl" />
        <h2 className="vintage-serif text-2xl text-ink-brown mb-6 relative z-10">
          Textures & Layers
        </h2>
        <div className="space-y-3 relative z-10">
          <div className="h-3 bg-gradient-to-r from-wax-red/30 via-coffee-stain/40 to-ink-sepia/20 rounded" />
          <div className="h-3 bg-gradient-to-r from-paper-dark/40 via-tape-cream/60 to-paper-aged/30 rounded" />
          <div className="h-3 bg-gradient-to-r from-ink-faded/20 via-wax-burgundy/30 to-coffee-light/40 rounded" />
        </div>
        <p className="handwriting text-ink-sepia mt-6 relative z-10">
          The magic is in the layers...
        </p>
      </div>
    ),
    backContent: (
      <div className="p-8 h-full bg-gradient-to-br from-paper-cream via-paper-aged/50 to-paper-cream">
        <div className="h-full flex flex-col items-center justify-center gap-6">
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-wax-red/60 rounded-full" />
            <div className="w-8 h-8 bg-coffee-stain/60 rounded-full" />
            <div className="w-8 h-8 bg-ink-sepia/60 rounded-full" />
          </div>
          <p className="typewriter text-ink-faded text-xs text-center">
            color palette
            <br />
            of memories
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'page-5',
    frontContent: (
      <div className="p-8 h-full">
        <div className="h-full flex flex-col">
          <h2 className="vintage-serif text-xl text-ink-brown mb-4">Hidden Treasures</h2>
          <div className="flex-1 grid grid-rows-2 gap-4">
            <div className="bg-paper-stained/40 p-4 rounded shadow-paper relative">
              <div className="absolute top-2 right-2 w-6 h-6 bg-tape-cream/80 transform rotate-45" />
              <p className="handwriting text-ink-sepia">A pocket to hold secrets...</p>
              <p className="typewriter text-ink-faded text-xs mt-2">[coming in phase 4]</p>
            </div>
            <div className="bg-paper-aged/30 p-4 rounded flex items-center justify-center border border-dashed border-ink-faded/30">
              <p className="typewriter text-ink-faded/50 text-xs text-center">
                fold-out section
                <br />
                placeholder
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    backContent: (
      <div className="p-8 h-full flex items-center justify-center">
        <div className="text-center">
          <p className="handwriting text-ink-sepia text-2xl mb-4">The End</p>
          <p className="typewriter text-ink-faded text-xs">...for now</p>
          <div className="mt-6 w-16 h-px bg-ink-faded/30 mx-auto" />
          <p className="handwriting text-ink-faded/60 text-sm mt-4 italic">
            more pages coming soon
          </p>
        </div>
      </div>
    ),
  },
];

export function PageStack({ className }: PageStackProps) {
  const { currentPage, flipPage, totalPages, isFlipping } = usePageFlip(journalPages.length);

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

  const handlePageClick = useCallback(() => {
    if (!isFlipping) {
      flipPage('forward');
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
      {journalPages.map((page, index) => (
        <Page
          key={page.id}
          index={index}
          currentPage={currentPage}
          totalPages={totalPages}
          frontContent={page.frontContent}
          backContent={page.backContent}
          onClick={handlePageClick}
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
