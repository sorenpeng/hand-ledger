'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { easings } from '@/lib/animations';
import { isInteractiveTarget } from '@/lib/interaction';
import { cn } from '@/lib/utils';

interface PageProps {
  index: number;
  currentPage: number;
  totalPages: number;
  frontContent: ReactNode;
  backContent?: ReactNode;
  onClickForward?: () => void;
  onClickBackward?: () => void;
  className?: string;
}

export function Page({
  index,
  currentPage,
  totalPages,
  frontContent,
  backContent,
  onClickForward,
  onClickBackward,
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

  const isClickable = isActive || isFlipped;

  // Generate accessible label based on page state
  const ariaLabel = isActive
    ? `Page ${index + 1} of ${totalPages} - Click to flip forward`
    : isFlipped
      ? `Page ${index + 1} (flipped) - Click to flip backward`
      : `Page ${index + 1} (upcoming)`;

  const handleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!isClickable) return;
    if (event.defaultPrevented) return;
    if (isInteractiveTarget(event.target)) return;

    if (isActive) {
      onClickForward?.();
    } else if (isFlipped) {
      onClickBackward?.();
    }
  };

  return (
    <motion.div
      className={cn(
        'absolute inset-0 origin-left preserve-3d',
        isClickable && 'cursor-pointer',
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
      onClick={isClickable ? handleClick : undefined}
      role={isClickable ? 'button' : undefined}
      aria-label={ariaLabel}
      data-page-index={index}
      data-page-state={isActive ? 'active' : isFlipped ? 'flipped' : 'upcoming'}
    >
      {/* Front face */}
      <div
        className={cn(
          'absolute inset-0 backface-hidden',
          'bg-paper-cream rounded-r-sm',
          'overflow-hidden',
        )}
        style={{
          boxShadow: `2px 0 10px rgba(0, 0, 0, 0.15)`,
        }}
      >
        {/* Paper texture overlay */}
        <div className="absolute inset-0 paper-texture" />

        {/* Aged effect */}
        <div className="absolute inset-0 aged-effect" />

        {/* Subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.05) 100%)',
          }}
        />

        {/* Page content */}
        <div className="relative z-10 h-full">{frontContent}</div>

        {/* Right edge gradient (page thickness illusion) */}
        <div
          className="absolute right-0 top-0 bottom-0 w-6 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(0,0,0,0.08), transparent)',
          }}
        />

        {/* Corner page curl hint */}
        {isActive && (
          <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none overflow-hidden opacity-50 hover:opacity-80 transition-opacity">
            <div
              className="absolute bottom-0 right-0 w-16 h-16"
              style={{
                background: `linear-gradient(135deg, transparent 45%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.08) 50%, ${getCssVar('--color-paper-aged')} 50%)`,
                transform: 'rotate(0deg)',
              }}
            />
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
        )}
        style={{
          boxShadow: `-2px 0 8px rgba(0, 0, 0, 0.12)`,
        }}
      >
        {/* Paper texture overlay */}
        <div className="absolute inset-0 paper-texture" />

        {/* Aged effect - slightly more aged on back */}
        <div className="absolute inset-0 aged-effect opacity-70" />

        {/* Subtle coffee stain at random position */}
        <div
          className="absolute w-32 h-32 rounded-full pointer-events-none opacity-10"
          style={{
            background: `radial-gradient(ellipse at center, ${getCssVar('--color-coffee-light')}, transparent 70%)`,
            top: '60%',
            left: '20%',
            transform: 'rotate(-15deg) scale(1.5, 1)',
          }}
        />

        {/* Back content */}
        <div className="relative z-10 h-full">
          {backContent || (
            <div className="h-full flex items-center justify-center">
              <span className="text-ink-faded/30 typewriter text-xs">blank page</span>
            </div>
          )}
        </div>

        {/* Left edge gradient (page thickness illusion) */}
        <div
          className="absolute left-0 top-0 bottom-0 w-6 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent)',
          }}
        />
      </div>

      {/* Dynamic shadow during flip (cast on pages below) */}
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

// Helper to safely get CSS custom property value
function getCssVar(name: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#e8dcc4';
}
