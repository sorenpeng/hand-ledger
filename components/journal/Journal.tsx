'use client';

import { cn } from '@/lib/utils';
import { JournalCover } from './JournalCover';
import { PageStack } from './PageStack';
import { useState } from 'react';

interface JournalProps {
  className?: string;
}

export function Journal({ className }: JournalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        'relative preserve-3d',
        'w-[90vw] max-w-[900px] aspect-[3/2]',
        className
      )}
    >
      {/* Journal container with 3D perspective */}
      <div className="relative w-full h-full preserve-3d">
        {/* Back cover (always visible when open) */}
        {isOpen && (
          <div
            className={cn(
              'absolute inset-0',
              'bg-paper-dark rounded-r-sm',
              'shadow-page'
            )}
          />
        )}

        {/* Page stack */}
        {isOpen && <PageStack />}

        {/* Front cover */}
        <JournalCover
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Instructions hint */}
      {!isOpen && (
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-paper-aged/60 text-sm typewriter">
          Click to open the journal
        </div>
      )}
    </div>
  );
}
