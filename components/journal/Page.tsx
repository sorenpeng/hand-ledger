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
        )}
        style={{
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.12)',
        }}
      >
        {/* Texture layer stack - all behind content (z-index 1-5) */}
        <div className="absolute inset-0 z-[1] paper-texture" />
        <div className="absolute inset-0 z-[2] aged-effect" />

        {/* Subtle vignette at z-3 */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 65%, rgba(0,0,0,0.03) 100%)',
          }}
        />

        {/* Page content - crisp text layer at z-10+ */}
        <div className="relative z-10 h-full">{frontContent}</div>

        {/* Right edge gradient (page thickness illusion) - above content */}
        <div
          className="absolute right-0 top-0 bottom-0 w-4 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to left, rgba(0,0,0,0.06), transparent)',
          }}
        />

        {/* Corner page curl hint */}
        {isActive && (
          <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none overflow-hidden opacity-40 hover:opacity-60 transition-opacity z-20">
            <div
              className="absolute bottom-0 right-0 w-14 h-14"
              style={{
                background: `linear-gradient(135deg, transparent 45%, rgba(0,0,0,0.04) 45%, rgba(0,0,0,0.06) 50%, #e5ddd0 50%)`,
              }}
            />
          </div>
        )}
      </div>

      {/* Back face */}
      <div
        className={cn(
          'absolute inset-0 backface-hidden',
          'bg-paper-cream rounded-l-sm',
          '[transform:rotateY(180deg)]',
          'overflow-hidden',
        )}
        style={{
          boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Texture layer stack - behind content */}
        <div className="absolute inset-0 z-[1] paper-texture" />
        <div className="absolute inset-0 z-[2] aged-effect" />

        {/* Subtle stain mark - decorative, behind content */}
        <div
          className="absolute z-[3] w-28 h-28 rounded-full pointer-events-none opacity-6"
          style={{
            background: 'radial-gradient(ellipse at center, #a08060, transparent 70%)',
            top: '55%',
            left: '15%',
            transform: 'rotate(-15deg) scale(1.5, 1)',
          }}
        />

        {/* Back content - crisp text layer */}
        <div className="relative z-10 h-full">
          {backContent || (
            <div className="h-full flex items-center justify-center">
              <span className="text-ink-faded/30 typewriter text-[10px] tracking-wider">
                BLANK PAGE
              </span>
            </div>
          )}
        </div>

        {/* Left edge gradient (page thickness illusion) */}
        <div
          className="absolute left-0 top-0 bottom-0 w-4 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.08), transparent)',
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
