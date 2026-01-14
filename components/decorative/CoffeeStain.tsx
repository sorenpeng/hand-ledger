'use client';

import { cn } from '@/lib/utils';

interface CoffeeStainProps {
  variant?: 'ring' | 'splash' | 'drip';
  size?: 'sm' | 'md' | 'lg';
  intensity?: 'light' | 'medium' | 'dark';
  rotation?: number;
  className?: string;
}

/**
 * Coffee stain decorative element
 * Creates realistic coffee ring, splash, or drip effects
 */
export function CoffeeStain({
  variant = 'ring',
  size = 'md',
  intensity = 'medium',
  rotation = 0,
  className,
}: CoffeeStainProps) {
  const sizeMap = {
    sm: { width: 60, height: 60 },
    md: { width: 100, height: 100 },
    lg: { width: 150, height: 150 },
  };

  const intensityMap = {
    light: 0.08,
    medium: 0.15,
    dark: 0.25,
  };

  const { width, height } = sizeMap[size];
  const opacity = intensityMap[intensity];

  const getBackground = () => {
    switch (variant) {
      case 'ring':
        return `radial-gradient(
          ellipse at center,
          transparent 35%,
          rgba(166, 123, 91, ${opacity * 1.2}) 45%,
          rgba(166, 123, 91, ${opacity}) 55%,
          rgba(166, 123, 91, ${opacity * 0.5}) 70%,
          transparent 80%
        )`;
      case 'splash':
        return `
          radial-gradient(
            ellipse 80% 60% at 50% 50%,
            rgba(166, 123, 91, ${opacity}) 0%,
            rgba(166, 123, 91, ${opacity * 0.6}) 40%,
            transparent 70%
          ),
          radial-gradient(
            ellipse 40% 80% at 30% 60%,
            rgba(166, 123, 91, ${opacity * 0.8}) 0%,
            transparent 60%
          ),
          radial-gradient(
            ellipse 50% 40% at 70% 40%,
            rgba(166, 123, 91, ${opacity * 0.6}) 0%,
            transparent 50%
          )
        `;
      case 'drip':
        return `
          linear-gradient(
            to bottom,
            rgba(166, 123, 91, ${opacity}) 0%,
            rgba(166, 123, 91, ${opacity * 0.8}) 30%,
            rgba(166, 123, 91, ${opacity * 0.4}) 70%,
            transparent 100%
          )
        `;
      default:
        return '';
    }
  };

  return (
    <div
      className={cn('absolute pointer-events-none', className)}
      style={{
        width: variant === 'drip' ? width * 0.3 : width,
        height: variant === 'drip' ? height * 1.5 : height,
        background: getBackground(),
        transform: `rotate(${rotation}deg)`,
        borderRadius: variant === 'drip' ? '50% 50% 40% 40%' : '50%',
      }}
    />
  );
}

interface WaterStainProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Water stain effect - more subtle than coffee
 */
export function WaterStain({ size = 'md', className }: WaterStainProps) {
  const sizeMap = {
    sm: 50,
    md: 80,
    lg: 120,
  };

  const dimensions = sizeMap[size];

  return (
    <div
      className={cn('absolute pointer-events-none', className)}
      style={{
        width: dimensions,
        height: dimensions,
        background: `radial-gradient(
          ellipse at center,
          transparent 40%,
          rgba(200, 200, 200, 0.08) 50%,
          rgba(200, 200, 200, 0.04) 70%,
          transparent 80%
        )`,
        borderRadius: '50%',
      }}
    />
  );
}

interface InkBlotProps {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Ink blot/splatter effect
 */
export function InkBlot({ color = '#3d2914', size = 'md', className }: InkBlotProps) {
  const sizeMap = {
    sm: 30,
    md: 50,
    lg: 80,
  };

  const dimensions = sizeMap[size];

  return (
    <div
      className={cn('absolute pointer-events-none', className)}
      style={{
        width: dimensions,
        height: dimensions,
        background: `radial-gradient(
          ellipse 70% 90% at 50% 50%,
          ${color} 0%,
          ${color}cc 30%,
          ${color}66 60%,
          transparent 80%
        )`,
        borderRadius: '40% 60% 50% 50%',
        filter: 'blur(0.5px)',
      }}
    />
  );
}
