'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { JournalCover } from './JournalCover';
import { PageStack } from './PageStack';

interface JournalProps {
  className?: string;
}

export function Journal({ className }: JournalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('relative preserve-3d', 'w-[90vw] max-w-[900px] aspect-[3/2]', className)}>
      {/* Journal container with 3D perspective */}
      <div className="relative w-full h-full preserve-3d">
        {/* Back cover (always visible when open) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                'absolute inset-0',
                'bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950',
                'rounded-sm shadow-lifted',
              )}
            >
              {/* Texture overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  mixBlendMode: 'overlay',
                }}
              />
              {/* Spine line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-950/50" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page stack */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <PageStack />
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
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-paper-aged/60 text-sm typewriter"
          >
            Click to open the journal
          </motion.div>
        ) : (
          <motion.div
            key="open-hint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-paper-aged/40 text-xs typewriter text-center"
          >
            Use arrow keys, click, or swipe to turn pages
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
