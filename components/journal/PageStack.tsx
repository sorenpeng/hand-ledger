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

// Industrial junk journal pages with shipping sticker / warning label aesthetic
const journalPages = [
  {
    id: 'page-1',
    frontContent: (
      <div className="p-6 md:p-8 h-full flex flex-col">
        {/* Warning label header */}
        <div className="inline-block bg-label-red px-3 py-1 mb-4 transform -rotate-0.5 self-start">
          <span className="typewriter text-white text-xs tracking-widest">NOTICE</span>
        </div>

        <h2 className="typewriter text-xl md:text-2xl text-ink-black mb-4 tracking-wide">
          DAILY LEDGER
        </h2>

        <p className="typewriter text-ink-main text-sm md:text-base leading-relaxed mb-6">
          This journal contains collected ephemera, notes, and documentation. Handle with care.
        </p>

        {/* Masking tape accent */}
        <div className="w-20 h-4 bg-tape-masking transform rotate-2 mb-4 opacity-70" />

        <div className="mt-auto flex items-center gap-2">
          <div className="flex-1 h-px bg-ink-muted/30" />
          <p className="typewriter text-ink-faded text-[10px] tracking-wider">
            SWIPE OR CLICK TO PROCEED
          </p>
          <div className="flex-1 h-px bg-ink-muted/30" />
        </div>
      </div>
    ),
    backContent: (
      <div className="p-6 md:p-8 h-full">
        <div className="h-full border border-ink-muted/20 flex flex-col items-center justify-center gap-4">
          {/* Industrial circle stamp */}
          <div className="w-20 h-20 border-2 border-ink-muted/40 rounded-full flex items-center justify-center">
            <span className="typewriter text-ink-muted/60 text-xs text-center leading-tight">
              QUALITY
              <br />
              CONTROL
            </span>
          </div>
          <p className="typewriter text-ink-faded/50 text-[10px] tracking-wider">INSPECTION AREA</p>
        </div>
      </div>
    ),
  },
  {
    id: 'page-2',
    frontContent: (
      <div className="p-6 md:p-8 h-full">
        {/* Section label */}
        <div className="inline-block bg-white border border-ink-muted/40 px-2 py-1 mb-4 transform rotate-0.5">
          <span className="typewriter text-ink-main text-xs tracking-wide">SECTION 01</span>
        </div>

        <h2 className="typewriter text-lg md:text-xl text-ink-black mb-4 tracking-wide">
          COLLECTED ITEMS
        </h2>

        <div className="space-y-3">
          {/* Receipt-style item */}
          <div className="bg-paper-aged/40 p-3 border-l-2 border-ink-main/30 transform -rotate-0.5">
            <p className="typewriter text-ink-main text-sm">Transit Pass #4492</p>
            <p className="typewriter text-ink-faded text-[10px] mt-1">DATE: 2024.06.15</p>
          </div>

          {/* Taped note */}
          <div className="relative bg-white p-3 shadow-contact transform rotate-1 ml-4">
            <div className="absolute -top-2 left-4 w-12 h-3 bg-tape-masking opacity-70" />
            <p className="typewriter text-ink-main text-xs leading-relaxed">
              &quot;Document everything.
              <br />
              Trust nothing.&quot;
            </p>
          </div>

          {/* Warning strip */}
          <div className="bg-label-red/10 border border-label-red/30 p-2 transform -rotate-0.5">
            <p className="typewriter text-label-red text-[10px] tracking-wider">
              CONFIDENTIAL MATERIAL
            </p>
          </div>
        </div>
      </div>
    ),
    backContent: (
      <div className="p-6 md:p-8 h-full relative">
        {/* Red stamp */}
        <div className="absolute top-4 right-4 w-14 h-14 border-2 border-label-red rounded-full flex items-center justify-center transform rotate-12 opacity-70">
          <span className="typewriter text-label-red text-[8px] text-center leading-tight">
            VERIFIED
            <br />
            2024
          </span>
        </div>

        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <p className="typewriter text-ink-muted text-sm leading-relaxed">
              MEMORIES ARE
              <br />
              THE ARCHITECTURE
              <br />
              OF IDENTITY
            </p>
            <div className="w-16 h-px bg-ink-muted/30 mx-auto mt-4" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'page-3',
    frontContent: (
      <div className="p-6 md:p-8 h-full">
        <div className="grid grid-cols-2 gap-3 h-full">
          {/* Left column - Notes */}
          <div className="space-y-3">
            <div className="bg-white border border-ink-muted/30 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-label-red rounded-full" />
                <span className="typewriter text-ink-black text-xs tracking-wide">TASKS</span>
              </div>
              <div className="space-y-1">
                <p className="typewriter text-ink-main text-[10px]">□ Archive documents</p>
                <p className="typewriter text-ink-main text-[10px]">□ Catalog specimens</p>
                <p className="typewriter text-ink-main text-[10px]">□ Update inventory</p>
              </div>
            </div>

            {/* Security tape */}
            <div
              className="h-4 transform -rotate-2"
              style={{
                background:
                  'repeating-linear-gradient(-45deg, #c41e3a 0px, #c41e3a 4px, #fff 4px, #fff 8px)',
                opacity: 0.6,
              }}
            />
          </div>

          {/* Right column - Quote */}
          <div className="flex flex-col">
            <div className="bg-paper-aged/30 p-3 border-l-2 border-ink-main/20 transform rotate-0.5 flex-1">
              <p className="typewriter text-ink-main text-[10px] italic leading-relaxed">
                &quot;ART IS NOT WHAT YOU SEE, BUT WHAT YOU MAKE OTHERS SEE.&quot;
              </p>
              <div className="mt-2 pt-2 border-t border-ink-muted/20">
                <p className="typewriter text-ink-faded text-[8px] tracking-wider">— E. DEGAS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    backContent: (
      <div className="p-6 md:p-8 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block border-2 border-ink-muted/40 p-4">
            <p className="typewriter text-ink-black text-sm mb-2 tracking-wider">EPHEMERA</p>
            <div className="w-12 h-px bg-ink-muted/40 mx-auto mb-2" />
            <p className="typewriter text-ink-faded text-[10px] leading-relaxed">
              FRAGMENTS OF
              <br />
              EVERYDAY LIFE
              <br />
              PRESERVED
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'page-4',
    frontContent: (
      <div className="p-6 md:p-8 h-full relative">
        {/* CAUTION label */}
        <div className="absolute top-2 right-2 bg-label-yellow px-2 py-1 transform rotate-3">
          <span className="typewriter text-label-black text-[8px] tracking-widest">CAUTION</span>
        </div>

        <h2 className="typewriter text-lg text-ink-black mb-4 tracking-wide">MATERIAL SAMPLES</h2>

        <div className="space-y-2">
          {/* Color/texture strips */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-label-red/70 border border-label-red" />
            <span className="typewriter text-ink-faded text-[10px]">WARNING RED</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-tape-masking border border-ink-muted/20" />
            <span className="typewriter text-ink-faded text-[10px]">MASKING TAPE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-ink-black border border-ink-black" />
            <span className="typewriter text-ink-faded text-[10px]">ARCHIVE BLACK</span>
          </div>
        </div>

        {/* Diagonal tape */}
        <div className="absolute bottom-8 right-4 w-16 h-3 bg-tape-masking transform rotate-45 opacity-60" />

        <p className="typewriter text-ink-muted text-[10px] mt-6">
          The aesthetic is in the imperfection.
        </p>
      </div>
    ),
    backContent: (
      <div className="p-6 md:p-8 h-full">
        <div className="h-full flex flex-col items-center justify-center gap-4">
          <div className="flex gap-3">
            <div className="w-6 h-6 bg-label-red/60 rounded-full" />
            <div className="w-6 h-6 bg-tape-masking rounded-full border border-ink-muted/20" />
            <div className="w-6 h-6 bg-ink-main/60 rounded-full" />
          </div>
          <p className="typewriter text-ink-faded text-[10px] text-center tracking-wider">
            COLOR PALETTE
            <br />
            REF: 2024-A
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'page-5',
    frontContent: (
      <div className="p-6 md:p-8 h-full">
        <div className="h-full flex flex-col">
          {/* Label strip header */}
          <div className="inline-block bg-white border border-ink-muted/30 px-2 py-1 mb-3 self-start">
            <span className="typewriter text-ink-main text-xs tracking-wide">SECTION 02</span>
          </div>

          <h2 className="typewriter text-lg text-ink-black mb-3 tracking-wide">STORAGE AREAS</h2>

          <div className="flex-1 grid grid-rows-2 gap-3">
            {/* Pocket placeholder */}
            <div className="bg-paper-stained/30 p-3 border border-ink-muted/20 relative">
              <div className="absolute top-1 right-1 w-5 h-5 bg-tape-masking transform rotate-45 opacity-50" />
              <p className="typewriter text-ink-main text-[10px]">POCKET STORAGE</p>
              <p className="typewriter text-ink-faded text-[8px] mt-1">[EXPANSION PLANNED]</p>
            </div>

            {/* Fold-out placeholder */}
            <div className="border border-dashed border-ink-muted/30 p-3 flex items-center justify-center">
              <div className="text-center">
                <p className="typewriter text-ink-faded/60 text-[10px] tracking-wider">
                  FOLD-OUT SECTION
                </p>
                <p className="typewriter text-ink-faded/40 text-[8px] mt-1">RESERVED</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    backContent: (
      <div className="p-6 md:p-8 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block border border-ink-muted/30 p-4 transform -rotate-1">
            <p className="typewriter text-ink-black text-sm mb-2 tracking-wider">END OF FILE</p>
            <div className="w-12 h-px bg-ink-muted/30 mx-auto my-2" />
            <p className="typewriter text-ink-faded text-[10px]">...FOR NOW</p>
          </div>

          <div className="mt-4">
            <p className="typewriter text-ink-faded/50 text-[8px] tracking-wider italic">
              MORE ENTRIES PENDING
            </p>
          </div>
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
