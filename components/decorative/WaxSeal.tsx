'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface WaxSealProps {
  color?: 'red' | 'burgundy' | 'gold' | 'green';
  size?: 'sm' | 'md' | 'lg';
  symbol?: ReactNode;
  rotation?: number;
  className?: string;
}

/**
 * Wax seal decorative element with 3D effect
 */
export function WaxSeal({
  color = 'red',
  size = 'md',
  symbol = '❦',
  rotation = 0,
  className,
}: WaxSealProps) {
  const colorMap = {
    red: { base: '#8b2323', highlight: '#a63030', shadow: '#5c1717' },
    burgundy: { base: '#6b1c1c', highlight: '#8a2525', shadow: '#4a1313' },
    gold: { base: '#b8860b', highlight: '#d4a017', shadow: '#8b6914' },
    green: { base: '#2d5a3d', highlight: '#3d7a52', shadow: '#1e3d29' },
  };

  const sizeMap = {
    sm: { outer: 48, inner: 40, font: 16 },
    md: { outer: 64, inner: 54, font: 22 },
    lg: { outer: 80, inner: 68, font: 28 },
  };

  const colors = colorMap[color];
  const sizes = sizeMap[size];

  return (
    <motion.div
      className={cn('relative', className)}
      style={{
        width: sizes.outer,
        height: sizes.outer,
        transform: `rotate(${rotation}deg)`,
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Outer irregular edge */}
      <div
        className="absolute inset-0"
        style={{
          background: colors.base,
          borderRadius: '45% 55% 50% 50% / 50% 45% 55% 50%',
          boxShadow: `
            inset 3px 3px 6px ${colors.highlight}40,
            inset -2px -2px 4px ${colors.shadow}60,
            2px 3px 8px rgba(0, 0, 0, 0.3)
          `,
        }}
      />

      {/* Inner circle with symbol */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          top: (sizes.outer - sizes.inner) / 2,
          left: (sizes.outer - sizes.inner) / 2,
          width: sizes.inner,
          height: sizes.inner,
          background: `radial-gradient(circle at 35% 35%, ${colors.highlight}, ${colors.base} 50%, ${colors.shadow} 100%)`,
          borderRadius: '50%',
          boxShadow: `inset 0 1px 3px rgba(255, 255, 255, 0.2)`,
        }}
      >
        <span
          className="text-center"
          style={{
            fontSize: sizes.font,
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          }}
        >
          {symbol}
        </span>
      </div>

      {/* Highlight reflection */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '15%',
          left: '20%',
          width: '30%',
          height: '20%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 100%)',
          borderRadius: '50%',
          transform: 'rotate(-30deg)',
        }}
      />
    </motion.div>
  );
}

interface RibbonProps {
  color?: string;
  width?: number;
  className?: string;
}

/**
 * Ribbon decoration typically used with wax seals
 */
export function Ribbon({ color = '#8b2323', width = 20, className }: RibbonProps) {
  return (
    <div className={cn('absolute', className)}>
      {/* Left ribbon tail */}
      <div
        style={{
          position: 'absolute',
          width,
          height: 60,
          background: `linear-gradient(90deg, ${color}dd, ${color})`,
          transform: 'rotate(-30deg) translateX(-10px)',
          transformOrigin: 'top center',
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
        }}
      />
      {/* Right ribbon tail */}
      <div
        style={{
          position: 'absolute',
          width,
          height: 60,
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          transform: 'rotate(30deg) translateX(10px)',
          transformOrigin: 'top center',
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
        }}
      />
    </div>
  );
}
