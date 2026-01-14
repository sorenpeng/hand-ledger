'use client';

import { motion, type PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { type ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface PullTabProps {
  children?: ReactNode;
  /** Content revealed when pulled */
  hiddenContent?: ReactNode;
  /** Pull direction */
  direction?: 'down' | 'up' | 'left' | 'right';
  /** Tab style */
  tabStyle?: 'rounded' | 'arrow' | 'tag' | 'ribbon';
  /** Tab color */
  tabColor?: string;
  /** Content container color */
  containerColor?: string;
  /** Maximum pull distance */
  maxPull?: number;
  className?: string;
}

/**
 * Pull tab mechanism that reveals hidden content
 * Drag the tab to pull out content from behind
 */
export function PullTab({
  children,
  hiddenContent,
  direction = 'down',
  tabStyle = 'rounded',
  tabColor = '#d4c4a8',
  containerColor = '#f5f0e1',
  maxPull = 150,
  className,
}: PullTabProps) {
  const [isPulled, setIsPulled] = useState(false);

  const isVertical = direction === 'down' || direction === 'up';
  const isPositive = direction === 'down' || direction === 'right';

  const position = useMotionValue(0);
  const progress = useTransform(position, [0, isPositive ? maxPull : -maxPull], [0, 1]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const relevantOffset = isVertical ? info.offset.y : info.offset.x;
    const relevantVelocity = isVertical ? info.velocity.y : info.velocity.x;
    const threshold = maxPull * 0.4;

    const shouldPull = isPositive
      ? relevantOffset > threshold || relevantVelocity > 300
      : relevantOffset < -threshold || relevantVelocity < -300;

    setIsPulled(shouldPull);
  };

  const getTabShape = () => {
    switch (tabStyle) {
      case 'rounded':
        return isVertical
          ? { borderRadius: '0 0 12px 12px', width: 60, height: 24 }
          : { borderRadius: '0 12px 12px 0', width: 24, height: 60 };
      case 'arrow':
        return {
          clipPath: isVertical
            ? 'polygon(20% 0, 80% 0, 100% 50%, 80% 100%, 20% 100%, 0% 50%)'
            : 'polygon(0 20%, 50% 0, 100% 20%, 100% 80%, 50% 100%, 0 80%)',
          width: isVertical ? 50 : 30,
          height: isVertical ? 30 : 50,
        };
      case 'tag':
        return isVertical
          ? {
              clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)',
              width: 50,
              height: 35,
            }
          : {
              clipPath: 'polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%)',
              width: 35,
              height: 50,
            };
      case 'ribbon':
        return isVertical
          ? {
              clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
              width: 40,
              height: 40,
            }
          : {
              clipPath: 'polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)',
              width: 40,
              height: 40,
            };
    }
  };

  const getTabPosition = () => {
    switch (direction) {
      case 'down':
        return { bottom: -20, left: '50%', transform: 'translateX(-50%)' };
      case 'up':
        return { top: -20, left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return { left: -20, top: '50%', transform: 'translateY(-50%)' };
      case 'right':
        return { right: -20, top: '50%', transform: 'translateY(-50%)' };
    }
  };

  const getDragConstraints = () => {
    if (isVertical) {
      return direction === 'down' ? { top: 0, bottom: maxPull } : { top: -maxPull, bottom: 0 };
    }
    return direction === 'right' ? { left: 0, right: maxPull } : { left: -maxPull, right: 0 };
  };

  const tabShape = getTabShape();

  return (
    <div className={cn('relative', className)}>
      {/* Main content container */}
      <div className="relative overflow-hidden" style={{ backgroundColor: containerColor }}>
        {children}

        {/* Revealed content area */}
        <motion.div
          className="absolute"
          style={{
            [direction === 'down'
              ? 'top'
              : direction === 'up'
                ? 'bottom'
                : direction === 'left'
                  ? 'right'
                  : 'left']: '100%',
            width: isVertical ? '100%' : maxPull,
            height: isVertical ? maxPull : '100%',
            backgroundColor: containerColor,
            opacity: progress,
          }}
        >
          <motion.div className="p-3" style={{ opacity: progress }}>
            {hiddenContent}
          </motion.div>
        </motion.div>
      </div>

      {/* Pull tab */}
      <motion.div
        className="absolute cursor-grab active:cursor-grabbing"
        style={{
          ...getTabPosition(),
          ...tabShape,
          backgroundColor: tabColor,
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          zIndex: 20,
          [isVertical ? 'y' : 'x']: position,
        }}
        drag={isVertical ? 'y' : 'x'}
        dragConstraints={getDragConstraints()}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={{
          [isVertical ? 'y' : 'x']: isPulled ? (isPositive ? maxPull : -maxPull) : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pull indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-black/30 text-xs font-bold"
            animate={{
              [isVertical ? 'y' : 'x']: isPulled ? 0 : [0, isPositive ? 3 : -3, 0],
            }}
            transition={{
              repeat: isPulled ? 0 : Number.POSITIVE_INFINITY,
              duration: 1,
            }}
          >
            {direction === 'down' && '↓'}
            {direction === 'up' && '↑'}
            {direction === 'left' && '←'}
            {direction === 'right' && '→'}
          </motion.span>
        </div>

        {/* Tab texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(
              ${isVertical ? '180deg' : '90deg'},
              rgba(255,255,255,0.3) 0%,
              transparent 50%,
              rgba(0,0,0,0.1) 100%
            )`,
          }}
        />
      </motion.div>
    </div>
  );
}

interface SlideRevealProps {
  children?: ReactNode;
  hiddenContent?: ReactNode;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * Simplified slide reveal - click to toggle reveal
 */
export function SlideReveal({
  children,
  hiddenContent,
  direction = 'horizontal',
  className,
}: SlideRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn('relative overflow-hidden cursor-pointer', className)}
      onClick={() => setIsRevealed(!isRevealed)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsRevealed(!isRevealed);
        }
      }}
    >
      <motion.div
        animate={{
          x: direction === 'horizontal' ? (isRevealed ? '-100%' : 0) : 0,
          y: direction === 'vertical' ? (isRevealed ? '-100%' : 0) : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
        }}
      >
        {children}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isRevealed ? 1 : 0,
          x: direction === 'horizontal' ? (isRevealed ? 0 : '100%') : 0,
          y: direction === 'vertical' ? (isRevealed ? 0 : '100%') : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
        }}
      >
        {hiddenContent}
      </motion.div>
    </div>
  );
}
