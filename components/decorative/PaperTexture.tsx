'use client';

import { cn } from '@/lib/utils';

interface PaperTextureProps {
  variant?: 'light' | 'medium' | 'heavy';
  className?: string;
}

/**
 * Paper texture overlay component
 * Applies a noise-based paper grain effect
 */
export function PaperTexture({ variant = 'medium', className }: PaperTextureProps) {
  const opacityMap = {
    light: 'opacity-10',
    medium: 'opacity-15',
    heavy: 'opacity-25',
  };

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', opacityMap[variant], className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        mixBlendMode: 'overlay',
      }}
    />
  );
}

interface AgedPaperOverlayProps {
  className?: string;
}

/**
 * Aged paper overlay with subtle stains and discoloration
 */
export function AgedPaperOverlay({ className }: AgedPaperOverlayProps) {
  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      {/* Subtle yellowing gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            135deg,
            transparent 0%,
            rgba(196, 168, 130, 0.08) 30%,
            transparent 50%,
            rgba(196, 168, 130, 0.05) 70%,
            transparent 100%
          )`,
        }}
      />

      {/* Edge darkening */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, rgba(139, 115, 85, 0.08), transparent 15%, transparent 85%, rgba(139, 115, 85, 0.08)),
            linear-gradient(to bottom, rgba(139, 115, 85, 0.06), transparent 10%, transparent 90%, rgba(139, 115, 85, 0.06))
          `,
        }}
      />
    </div>
  );
}

interface VignetteProps {
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

/**
 * Vignette overlay for aged photo/paper effect
 */
export function Vignette({ intensity = 'medium', className }: VignetteProps) {
  const intensityMap = {
    subtle: { spread: '60%', opacity: 0.05 },
    medium: { spread: '50%', opacity: 0.08 },
    strong: { spread: '40%', opacity: 0.15 },
  };

  const { spread, opacity } = intensityMap[intensity];

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        background: `radial-gradient(
          ellipse at center,
          transparent ${spread},
          rgba(0, 0, 0, ${opacity}) 100%
        )`,
      }}
    />
  );
}
