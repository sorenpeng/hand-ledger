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
    <div className={cn('relative preserve-3d', 'w-[90vw] max-w-[1000px] aspect-[10/8.25]', className)}>
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
                'bg-cover-dark',
                'rounded-sm shadow-deep',
                'border border-white/5'
              )}
            >
              {/* Industrial Grain Texture */}
              <div className="absolute inset-0 texture-grain opacity-80" />
              
              {/* Spine line */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/50 border-r border-white/5" />
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
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/40 text-sm font-industrial tracking-widest uppercase"
          >
            [ Click to Open Log ]
          </motion.div>
        ) : (
          <motion.div
            key="open-hint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-white/20 text-xs font-industrial tracking-widest uppercase text-center"
          >
            Use arrow keys / click corners
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
