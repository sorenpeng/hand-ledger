'use client';

import { motion } from 'framer-motion';
import { type ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface FlipOutProps {
  /** Content visible when folded */
  front: ReactNode;
  /** Content revealed when unfolded */
  back: ReactNode;
  /** Fold direction */
  foldFrom?: 'left' | 'right' | 'top' | 'bottom';
  /** Paper color */
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Folded page section that unfolds to reveal hidden content
 * Can fold from any direction with realistic paper effect
 */
export function FlipOut({
  front,
  back,
  foldFrom = 'right',
  color = '#f5f0e1',
  width = 200,
  height = 150,
  className,
}: FlipOutProps) {
  const [isUnfolded, setIsUnfolded] = useState(false);

  const getTransformOrigin = () => {
    switch (foldFrom) {
      case 'left':
        return 'right center';
      case 'right':
        return 'left center';
      case 'top':
        return 'center bottom';
      case 'bottom':
        return 'center top';
    }
  };

  const getRotation = () => {
    switch (foldFrom) {
      case 'left':
      case 'right':
        return { rotateY: isUnfolded ? (foldFrom === 'right' ? -180 : 180) : 0 };
      case 'top':
      case 'bottom':
        return { rotateX: isUnfolded ? (foldFrom === 'bottom' ? -180 : 180) : 0 };
    }
  };

  const getFoldLinePosition = () => {
    switch (foldFrom) {
      case 'left':
        return { right: 0, top: 0, bottom: 0, width: 2 };
      case 'right':
        return { left: 0, top: 0, bottom: 0, width: 2 };
      case 'top':
        return { left: 0, right: 0, bottom: 0, height: 2 };
      case 'bottom':
        return { left: 0, right: 0, top: 0, height: 2 };
    }
  };

  const getBackContentPosition = (): React.CSSProperties => {
    switch (foldFrom) {
      case 'right':
        return { right: 0, top: 0 };
      case 'left':
        return { left: 0, top: 0 };
      case 'bottom':
        return { bottom: 0, left: 0 };
      case 'top':
        return { top: 0, left: 0 };
    }
  };

  const isHorizontal = foldFrom === 'left' || foldFrom === 'right';

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isUnfolded}
      aria-label="Foldable content section"
      className={cn('relative cursor-pointer', className)}
      style={{
        width: isHorizontal ? (isUnfolded ? width * 2 : width) : width,
        height: !isHorizontal ? (isUnfolded ? height * 2 : height) : height,
        perspective: 1000,
        transition: 'width 0.4s ease, height 0.4s ease',
      }}
      onClick={(e) => {
        e.stopPropagation();
        setIsUnfolded(!isUnfolded);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          setIsUnfolded(!isUnfolded);
        }
      }}
    >
      {/* Back content (revealed) */}
      <motion.div
        className="absolute"
        style={{
          width,
          height,
          backgroundColor: color,
          ...getBackContentPosition(),
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isUnfolded ? 1 : 0 }}
        transition={{ delay: isUnfolded ? 0.2 : 0 }}
      >
        <div className="p-3">{back}</div>
      </motion.div>

      {/* Folding panel */}
      <motion.div
        className="absolute"
        style={{
          width,
          height,
          backgroundColor: color,
          transformOrigin: getTransformOrigin(),
          transformStyle: 'preserve-3d',
          zIndex: 10,
          [foldFrom === 'left' ? 'right' : 'left']: isHorizontal && isUnfolded ? width : 0,
          [foldFrom === 'top' ? 'bottom' : 'top']: !isHorizontal && isUnfolded ? height : 0,
        }}
        animate={getRotation()}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: color,
            backfaceVisibility: 'hidden',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          {/* Fold line hint */}
          <div
            className="absolute bg-gradient-to-r from-transparent via-black/10 to-transparent"
            style={getFoldLinePosition()}
          />
          <div className="p-3">{front}</div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: adjustColor(color, -10),
            transform: isHorizontal ? 'rotateY(180deg)' : 'rotateX(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Paper texture on back */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0,0,0,0.03) 2px,
                rgba(0,0,0,0.03) 4px
              )`,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Multi-fold accordion style flipout
 */
interface AccordionFlipOutProps {
  panels: ReactNode[];
  color?: string;
  panelWidth?: number;
  panelHeight?: number;
  className?: string;
}

export function AccordionFlipOut({
  panels,
  color = '#f5f0e1',
  panelWidth = 150,
  panelHeight = 200,
  className,
}: AccordionFlipOutProps) {
  const [expandedCount, setExpandedCount] = useState(0);

  const handleClick = () => {
    setExpandedCount((prev) => (prev >= panels.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={expandedCount > 0}
      aria-label={`Accordion panels, ${expandedCount} of ${panels.length - 1} expanded`}
      className={cn('relative cursor-pointer', className)}
      style={{
        width: panelWidth + expandedCount * panelWidth,
        height: panelHeight,
        perspective: 1200,
        transition: 'width 0.5s ease',
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {panels.map((panel, index) => {
        const isExpanded = index < expandedCount;
        const isNext = index === expandedCount;

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              width: panelWidth,
              height: panelHeight,
              backgroundColor: adjustColor(color, -index * 5),
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              left: 0,
              zIndex: panels.length - index,
              boxShadow: isNext ? '2px 0 8px rgba(0,0,0,0.15)' : 'none',
            }}
            animate={{
              rotateY: isExpanded ? -180 : 0,
              x: isExpanded ? index * panelWidth : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
              delay: index * 0.1,
            }}
          >
            <div className="p-3 h-full">{panel}</div>
          </motion.div>
        );
      })}
    </div>
  );
}

function adjustColor(hex: string, amount: number): string {
  const num = Number.parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
