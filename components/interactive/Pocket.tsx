'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { type ReactNode, useState } from 'react';
import { pocketVariants, revealVariants, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface PocketProps {
  children?: ReactNode;
  color?: string;
  pattern?: 'solid' | 'kraft' | 'striped' | 'dotted';
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Interactive pocket that opens to reveal contents
 * The flap rotates open on click with spring physics
 */
export function Pocket({
  children,
  color = '#d4c4a8',
  pattern = 'solid',
  width = 180,
  height = 120,
  className,
}: PocketProps) {
  const [isOpen, setIsOpen] = useState(false);

  const flapHeight = height * 0.35;

  const getPatternStyle = () => {
    switch (pattern) {
      case 'kraft':
        return {
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundBlendMode: 'multiply' as const,
        };
      case 'striped':
        return {
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          )`,
        };
      case 'dotted':
        return {
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: '8px 8px',
        };
      default:
        return {};
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn('relative cursor-pointer', className)}
      style={{ width, height: height + flapHeight }}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }
      }}
    >
      {/* Pocket body */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height,
          backgroundColor: color,
          ...getPatternStyle(),
          borderRadius: '0 0 4px 4px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {/* Pocket opening shadow */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: 8,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)',
          }}
        />

        {/* Contents container */}
        <AnimatePresence>
          {isOpen && children && (
            <motion.div
              className="absolute inset-4 overflow-hidden"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div variants={revealVariants}>{children}</motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Flap */}
      <motion.div
        className="absolute top-0 left-0 right-0"
        style={{
          height: flapHeight,
          backgroundColor: color,
          ...getPatternStyle(),
          transformOrigin: 'bottom center',
          transformStyle: 'preserve-3d',
          clipPath: 'polygon(0 0, 50% 30%, 100% 0, 100% 100%, 0 100%)',
          boxShadow: isOpen ? '0 -2px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
        }}
        variants={pocketVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        {/* Flap fold line */}
        <div
          className="absolute bottom-0 left-2 right-2"
          style={{
            height: 2,
            background: `linear-gradient(90deg,
              transparent,
              rgba(0,0,0,0.1) 20%,
              rgba(0,0,0,0.1) 80%,
              transparent
            )`,
          }}
        />
      </motion.div>

      {/* Flap backside (visible when open) */}
      <motion.div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: flapHeight,
          height: flapHeight,
          backgroundColor: adjustColor(color, -15),
          transformOrigin: 'top center',
          backfaceVisibility: 'hidden',
          clipPath: 'polygon(0 100%, 50% 70%, 100% 100%, 100% 0, 0 0)',
        }}
        initial={{ opacity: 0, rotateX: 180 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          rotateX: isOpen ? 0 : 180,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

/**
 * Adjusts a hex color brightness
 */
function adjustColor(hex: string, amount: number): string {
  const num = Number.parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
