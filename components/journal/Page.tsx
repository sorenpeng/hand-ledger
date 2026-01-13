'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { easings } from '@/lib/animations';
import type { ReactNode } from 'react';

interface PageProps {
  index: number;
  currentPage: number;
  totalPages: number;
  frontContent: ReactNode;
  backContent?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Page({
  index,
  currentPage,
  totalPages,
  frontContent,
  backContent,
  onClick,
  className,
}: PageProps) {
  const isFlipped = index < currentPage;
  const isActive = index === currentPage;
  const zIndex = totalPages - index + (isFlipped ? totalPages : 0);

  return (
    <motion.div
      className={cn(
        'absolute inset-0 origin-left preserve-3d',
        isActive && 'cursor-pointer',
        className
      )}
      initial={false}
      animate={{
        rotateY: isFlipped ? -180 : 0,
      }}
      transition={{
        duration: 0.8,
        ease: easings.pageTurn,
      }}
      style={{
        zIndex,
        transformStyle: 'preserve-3d',
      }}
      onClick={isActive ? onClick : undefined}
    >
      {/* Front face */}
      <div
        className={cn(
          'absolute inset-0 backface-hidden',
          'bg-paper-cream rounded-r-sm',
          'shadow-page overflow-hidden'
        )}
      >
        {/* Paper texture */}
        <div className="absolute inset-0 paper-texture" />

        {/* Aged effect */}
        <div className="absolute inset-0 aged-effect" />

        {/* Page content */}
        <div className="relative z-10 h-full">{frontContent}</div>

        {/* Page edge shadow */}
        <div
          className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(0,0,0,0.05), transparent)',
          }}
        />

        {/* Subtle page curl hint on hover */}
        {isActive && (
          <div
            className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none opacity-0 hover:opacity-100 transition-opacity"
            style={{
              background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%)',
            }}
          />
        )}
      </div>

      {/* Back face */}
      <div
        className={cn(
          'absolute inset-0 backface-hidden',
          'bg-paper-aged rounded-l-sm',
          '[transform:rotateY(180deg)]',
          'overflow-hidden'
        )}
      >
        {/* Paper texture */}
        <div className="absolute inset-0 paper-texture" />

        {/* Aged effect */}
        <div className="absolute inset-0 aged-effect" />

        {/* Back content */}
        <div className="relative z-10 h-full">
          {backContent || (
            <div className="h-full flex items-center justify-center">
              <span className="text-ink-faded/30 typewriter text-xs">blank page</span>
            </div>
          )}
        </div>

        {/* Page edge shadow (left side) */}
        <div
          className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent)',
          }}
        />
      </div>
    </motion.div>
  );
}
