'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';
import { easings } from '@/lib/animations';
import { cn } from '@/lib/utils';

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

  // Motion values for dynamic shadows
  const rotateY = useMotionValue(isFlipped ? -180 : 0);

  // Shadow intensity based on rotation (strongest at 90 degrees)
  const shadowOpacity = useTransform(rotateY, [-180, -90, 0], [0, 0.4, 0]);
  const shadowBlur = useTransform(rotateY, [-180, -90, 0], [0, 30, 0]);
  const shadowX = useTransform(rotateY, [-180, -90, 0], [0, 40, 0]);

  return (
    <motion.div
      className={cn(
        'absolute inset-0 origin-left preserve-3d',
        isActive && 'cursor-pointer',
        className,
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
        rotateY,
      }}
      onClick={isActive ? onClick : undefined}
    >
      {/* Front face */}
      <div
        className={cn(
          'absolute inset-0 backface-hidden',
          'bg-paper-base rounded-r-sm',
          'overflow-hidden',
          'border-r border-black/10'
        )}
        style={{
          boxShadow: `2px 0 5px rgba(0, 0, 0, 0.1)`,
        }}
      >
        {/* Textures */}
        <div className="absolute inset-0 texture-grain opacity-50" />
        <div className="absolute inset-0 texture-scuff opacity-30 mix-blend-multiply" />

        {/* Binding Tape (Left side) */}
        <div className="absolute top-0 bottom-0 left-0 w-8 bg-tape-masking opacity-90 backdrop-blur-[1px] border-r border-white/20 shadow-sm z-20">
             <div className="absolute right-0 top-0 bottom-0 w-px bg-black/10" />
        </div>
        
        {/* Page content */}
        <div className="relative z-10 h-full pl-8">{frontContent}</div>

        {/* Right edge gradient (page thickness illusion) */}
        <div
          className="absolute right-0 top-0 bottom-0 w-6 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(0,0,0,0.05), transparent)',
          }}
        />
        
        {/* Corner Hover Hint */}
        {isActive && (
           <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-2 right-2 text-[0.6rem] font-industrial uppercase tracking-widest text-ink-faded/50 animate-pulse">
                Click to Flip
              </div>
           </div>
        )}
      </div>

      {/* Back face */}
      <div
        className={cn(
          'absolute inset-0 backface-hidden',
          'bg-paper-aged rounded-l-sm',
          '[transform:rotateY(180deg)]',
          'overflow-hidden',
          'border-l border-black/10'
        )}
        style={{
          boxShadow: `-2px 0 5px rgba(0, 0, 0, 0.1)`,
        }}
      >
        {/* Textures */}
        <div className="absolute inset-0 texture-grain opacity-60" />
        <div className="absolute inset-0 texture-scuff opacity-40 mix-blend-multiply" />

        {/* Binding Tape (Right side because flipped) */}
        <div className="absolute top-0 bottom-0 right-0 w-8 bg-tape-masking opacity-90 backdrop-blur-[1px] border-l border-white/20 shadow-sm z-20">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-black/10" />
        </div>

        {/* Back content */}
        <div className="relative z-10 h-full pr-8">
          {backContent || (
            <div className="h-full flex items-center justify-center">
              <span className="text-ink-faded/20 font-industrial text-xs tracking-[0.3em] uppercase rotate-90">Intentionally Blank</span>
            </div>
          )}
        </div>

        {/* Left edge shadow */}
        <div
          className="absolute left-0 top-0 bottom-0 w-6 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.05), transparent)',
          }}
        />
      </div>

      {/* Dynamic shadow during flip */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(-1px)',
          boxShadow: useTransform(
            [shadowOpacity, shadowBlur, shadowX],
            ([opacity, blur, x]) => `${x}px 0 ${blur}px rgba(0, 0, 0, ${opacity})`,
          ),
        }}
      />
    </motion.div>
  );
}


