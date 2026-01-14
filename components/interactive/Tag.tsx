'use client';

import { motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { tagSwingVariants } from '@/lib/animations';

interface TagProps {
  children?: ReactNode;
  /** Back side content */
  backContent?: ReactNode;
  /** Tag shape */
  variant?: 'luggage' | 'gift' | 'price' | 'bookmark';
  /** Tag color */
  color?: string;
  /** String/ribbon color */
  stringColor?: string;
  /** Tag rotation angle */
  rotation?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Hanging tag with swing animation on hover
 * Can flip to show back content
 */
export function Tag({
  children,
  backContent,
  variant = 'luggage',
  color = '#f5f0e1',
  stringColor = '#8b7355',
  rotation = -5,
  size = 'md',
  className,
}: TagProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const sizeMap = {
    sm: { width: 60, height: 80, hole: 8, fontSize: 10 },
    md: { width: 80, height: 110, hole: 10, fontSize: 12 },
    lg: { width: 100, height: 140, hole: 12, fontSize: 14 },
  };

  const { width, height, hole, fontSize } = sizeMap[size];

  const getTagShape = () => {
    switch (variant) {
      case 'luggage':
        return {
          clipPath: `polygon(
            ${hole * 2}px 0,
            calc(100% - ${hole * 2}px) 0,
            100% ${hole * 2}px,
            100% 100%,
            0 100%,
            0 ${hole * 2}px
          )`,
          borderRadius: '0 0 4px 4px',
        };
      case 'gift':
        return {
          clipPath: 'polygon(50% 0%, 100% 15%, 100% 100%, 0% 100%, 0% 15%)',
          borderRadius: '0 0 8px 8px',
        };
      case 'price':
        return {
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
          borderRadius: '4px 4px 0 0',
        };
      case 'bookmark':
        return {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
          borderRadius: '4px 4px 0 0',
        };
    }
  };

  const tagShape = getTagShape();

  return (
    <div
      className={cn('relative', className)}
      style={{
        width,
        paddingTop: 30, // Space for string
      }}
    >
      {/* String */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2"
        width={40}
        height={35}
        style={{ overflow: 'visible' }}
      >
        {/* String loop */}
        <path
          d={`M 20 0 Q 5 15 20 30 Q 35 15 20 0`}
          fill="none"
          stroke={stringColor}
          strokeWidth={2}
          strokeLinecap="round"
        />
        {/* String ends going to tag */}
        <path
          d={`M 15 25 L ${width / 2 - 5} 35`}
          fill="none"
          stroke={stringColor}
          strokeWidth={1.5}
        />
        <path
          d={`M 25 25 L ${width / 2 + 5} 35`}
          fill="none"
          stroke={stringColor}
          strokeWidth={1.5}
        />
      </svg>

      {/* Tag body with swing */}
      <motion.div
        className="relative cursor-pointer"
        style={{
          width,
          height,
          transformOrigin: 'top center',
          transform: `rotate(${rotation}deg)`,
          perspective: 600,
        }}
        variants={tagSwingVariants}
        initial="rest"
        whileHover="swing"
        onClick={(e) => {
          e.stopPropagation();
          if (backContent) setIsFlipped(!isFlipped);
        }}
      >
        {/* Front face */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundColor: color,
            ...tagShape,
            backfaceVisibility: 'hidden',
            boxShadow: '2px 3px 8px rgba(0,0,0,0.15)',
          }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Hole */}
          <div
            className="absolute"
            style={{
              top: hole,
              left: '50%',
              transform: 'translateX(-50%)',
              width: hole,
              height: hole,
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.1)',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
            }}
          />

          {/* Hole reinforcement ring */}
          <div
            className="absolute"
            style={{
              top: hole - 2,
              left: '50%',
              transform: 'translateX(-50%)',
              width: hole + 4,
              height: hole + 4,
              borderRadius: '50%',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          />

          {/* Content */}
          <div
            className="absolute inset-0 flex items-center justify-center p-2 pt-6"
            style={{ fontSize }}
          >
            {children}
          </div>

          {/* Paper texture */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              ...tagShape,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>

        {/* Back face */}
        {backContent && (
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundColor: adjustColor(color, -10),
              ...tagShape,
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              boxShadow: '2px 3px 8px rgba(0,0,0,0.15)',
            }}
            animate={{ rotateY: isFlipped ? 0 : -180 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* Content */}
            <div
              className="absolute inset-0 flex items-center justify-center p-2 pt-6"
              style={{ fontSize }}
            >
              {backContent}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

interface LabelTagProps {
  children?: ReactNode;
  color?: string;
  className?: string;
}

/**
 * Simple flat label tag (non-hanging)
 */
export function LabelTag({ children, color = '#f5f0e1', className }: LabelTagProps) {
  return (
    <motion.div
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs',
        className,
      )}
      style={{
        backgroundColor: color,
        clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 8px 100%, 0 50%)',
        boxShadow: '1px 1px 3px rgba(0,0,0,0.1)',
      }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
}

interface RibbonTagProps {
  children?: ReactNode;
  color?: string;
  position?: 'left' | 'right';
  className?: string;
}

/**
 * Corner ribbon tag
 */
export function RibbonTag({
  children,
  color = '#8b2323',
  position = 'right',
  className,
}: RibbonTagProps) {
  return (
    <div
      className={cn(
        'absolute overflow-hidden',
        position === 'right' ? 'top-0 right-0' : 'top-0 left-0',
        className,
      )}
      style={{ width: 100, height: 100 }}
    >
      <div
        className="absolute text-white text-xs font-bold text-center py-1"
        style={{
          width: 140,
          backgroundColor: color,
          transform:
            position === 'right'
              ? 'rotate(45deg) translateY(-10px) translateX(15px)'
              : 'rotate(-45deg) translateY(-10px) translateX(-15px)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        {children}
      </div>
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
