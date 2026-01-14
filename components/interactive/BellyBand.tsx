'use client';

import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BellyBandProps {
  children?: ReactNode;
  /** Content revealed under the band */
  hiddenContent?: ReactNode;
  /** Band color/style */
  variant?: 'paper' | 'washi' | 'ribbon' | 'kraft';
  /** Custom color override */
  color?: string;
  /** Band height */
  height?: number;
  /** Direction the band slides off */
  slideDirection?: 'left' | 'right';
  className?: string;
}

/**
 * Horizontal band that slides off to reveal content underneath
 * Supports drag interaction with momentum
 */
export function BellyBand({
  children,
  hiddenContent,
  variant = 'paper',
  color,
  height = 60,
  slideDirection = 'right',
  className,
}: BellyBandProps) {
  const [isRemoved, setIsRemoved] = useState(false);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.3, 1, 0.3]);

  const variantStyles = {
    paper: {
      backgroundColor: color || '#f5f0e1',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    washi: {
      backgroundColor: color || '#e8ddd0',
      backgroundImage: `
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 8px,
          rgba(255,255,255,0.4) 8px,
          rgba(255,255,255,0.4) 9px
        )
      `,
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      opacity: 0.9,
    },
    ribbon: {
      backgroundColor: color || '#8b2323',
      backgroundImage: `linear-gradient(
        to bottom,
        rgba(255,255,255,0.15) 0%,
        transparent 50%,
        rgba(0,0,0,0.15) 100%
      )`,
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    },
    kraft: {
      backgroundColor: color || '#b8956e',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundBlendMode: 'multiply' as const,
      boxShadow: '0 2px 4px rgba(0,0,0,0.12)',
    },
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const velocity = Math.abs(info.velocity.x);

    if (Math.abs(info.offset.x) > threshold || velocity > 500) {
      setIsRemoved(true);
    }
  };

  const handleClick = () => {
    if (!isRemoved) {
      setIsRemoved(true);
    }
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Hidden content underneath */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isRemoved ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      >
        {hiddenContent}
      </motion.div>

      {/* Sliding band */}
      <motion.div
        className="relative cursor-grab active:cursor-grabbing"
        style={{
          height,
          x,
          opacity,
          ...variantStyles[variant],
        }}
        drag="x"
        dragConstraints={{ left: -300, right: 300 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        animate={{
          x: isRemoved ? (slideDirection === 'right' ? 400 : -400) : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      >
        {/* Edge shadows for depth */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.1), transparent)',
          }}
        />

        {/* Band content */}
        <div className="h-full flex items-center justify-center px-4">
          {children}
        </div>

        {/* Slide hint arrow */}
        {!isRemoved && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 text-black/20"
            style={{
              [slideDirection === 'right' ? 'right' : 'left']: 8,
            }}
            animate={{ x: slideDirection === 'right' ? [0, 5, 0] : [0, -5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            {slideDirection === 'right' ? '→' : '←'}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

interface WashiTapeProps {
  children?: ReactNode;
  color?: string;
  pattern?: 'solid' | 'stripes' | 'dots' | 'grid';
  rotation?: number;
  width?: number;
  className?: string;
}

/**
 * Decorative washi tape strip
 */
export function WashiTape({
  children,
  color = '#f4a4a4',
  pattern = 'solid',
  rotation = 0,
  width = 200,
  className,
}: WashiTapeProps) {
  const patternStyles = {
    solid: {},
    stripes: {
      backgroundImage: `repeating-linear-gradient(
        45deg,
        transparent,
        transparent 4px,
        rgba(255,255,255,0.3) 4px,
        rgba(255,255,255,0.3) 8px
      )`,
    },
    dots: {
      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 2px, transparent 2px)`,
      backgroundSize: '12px 12px',
    },
    grid: {
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
      `,
      backgroundSize: '8px 8px',
    },
  };

  return (
    <div
      className={cn('relative', className)}
      style={{
        width,
        height: 24,
        backgroundColor: color,
        transform: `rotate(${rotation}deg)`,
        opacity: 0.85,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        ...patternStyles[pattern],
      }}
    >
      {/* Torn edges effect */}
      <div
        className="absolute -left-1 top-0 bottom-0 w-2"
        style={{
          background: `linear-gradient(90deg, transparent, ${color})`,
          clipPath: 'polygon(100% 0, 100% 100%, 0 90%, 30% 70%, 0 50%, 30% 30%, 0 10%)',
        }}
      />
      <div
        className="absolute -right-1 top-0 bottom-0 w-2"
        style={{
          background: `linear-gradient(270deg, transparent, ${color})`,
          clipPath: 'polygon(0 0, 0 100%, 100% 90%, 70% 70%, 100% 50%, 70% 30%, 100% 10%)',
        }}
      />

      {/* Content */}
      <div className="h-full flex items-center justify-center text-xs font-medium text-black/60">
        {children}
      </div>
    </div>
  );
}
