'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { JournalCover } from './JournalCover';
import { PageStack } from './PageStack';

interface JournalProps {
  className?: string;
}

// Moleskine Large page ratio: 5" x 8.25" = 0.606 (portrait)
// Open spread ratio: 10" x 8.25" = 1.212 (landscape)
const SPREAD_RATIO = 10 / 8.25;

export function Journal({ className }: JournalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        'relative preserve-3d',
        // Responsive scaling with max constraints, preserving Moleskine spread ratio
        'w-[95vw] max-w-[960px] max-h-[85vh]',
        className,
      )}
      style={{
        aspectRatio: SPREAD_RATIO,
      }}
    >
      {/* Journal container with 3D perspective */}
      <div className="relative w-full h-full preserve-3d">
        {/* Back cover (always visible when open) - industrial black */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn('absolute inset-0', 'bg-cover-black', 'rounded-sm shadow-lifted')}
            >
              {/* Subtle texture overlay */}
              <div
                className="absolute inset-0 opacity-5 rounded-sm"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
              {/* Spine accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-cover-edge" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page stack with gutter */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <PageStack />
              {/* Gutter/spine shadow overlay */}
              <div className="gutter-shadow absolute inset-0 pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Front cover */}
        <JournalCover isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      </div>

      {/* Instructions hint */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed-hint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-paper-aged/60 text-xs typewriter"
          >
            Click to open
          </motion.div>
        ) : (
          <motion.div
            key="open-hint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-paper-aged/40 text-xs typewriter text-center"
          >
            Arrow keys or swipe to turn pages
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
