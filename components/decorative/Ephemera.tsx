'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { hoverLiftVariants } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface EphemeraProps {
  children?: ReactNode;
  /** Type of ephemera styling */
  variant?: 'paper' | 'card' | 'photo' | 'clipping' | 'label';
  /** Width */
  width?: number;
  /** Height */
  height?: number;
  /** Rotation angle */
  rotation?: number;
  /** Paper/material color */
  color?: string;
  /** Show aging effects */
  aged?: boolean;
  /** Show tape at corners */
  taped?: boolean;
  /** Enable hover lift effect */
  hoverable?: boolean;
  className?: string;
}

/**
 * Generic wrapper for vintage ephemera items
 * Provides consistent styling and aging effects
 */
export function Ephemera({
  children,
  variant = 'paper',
  width = 150,
  height = 100,
  rotation = 0,
  color = '#f8f4e8',
  aged = true,
  taped = false,
  hoverable = true,
  className,
}: EphemeraProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'card':
        return {
          backgroundColor: color,
          borderRadius: 4,
          border: `1px solid ${adjustColor(color, -20)}`,
          boxShadow: '2px 2px 6px rgba(0,0,0,0.15)',
        };
      case 'photo':
        return {
          backgroundColor: '#fff',
          padding: 8,
          border: '8px solid #fff',
          boxShadow: '2px 3px 8px rgba(0,0,0,0.2)',
        };
      case 'clipping':
        return {
          backgroundColor: color,
          clipPath: `polygon(
            0% 2%, 5% 0%, 12% 3%, 20% 1%, 30% 2%, 40% 0%, 50% 3%, 60% 1%, 70% 2%, 80% 0%, 90% 3%, 95% 1%, 100% 2%,
            98% 15%, 100% 30%, 97% 50%, 100% 70%, 98% 85%, 100% 98%,
            95% 100%, 85% 97%, 75% 100%, 65% 98%, 55% 100%, 45% 97%, 35% 100%, 25% 98%, 15% 100%, 5% 97%, 0% 100%,
            2% 85%, 0% 70%, 3% 50%, 0% 30%, 2% 15%
          )`,
          boxShadow: '1px 2px 4px rgba(0,0,0,0.1)',
        };
      case 'label':
        return {
          backgroundColor: color,
          borderRadius: 2,
          border: `1px solid ${adjustColor(color, -15)}`,
          boxShadow: '1px 1px 3px rgba(0,0,0,0.1)',
        };
      default:
        return {
          backgroundColor: color,
          boxShadow: '2px 2px 6px rgba(0,0,0,0.12)',
        };
    }
  };

  const content = (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        width,
        height,
        transform: `rotate(${rotation}deg)`,
        ...getVariantStyles(),
        filter: aged ? 'sepia(0.08) contrast(0.97)' : undefined,
      }}
    >
      {/* Content */}
      <div className="relative z-10 w-full h-full">{children}</div>

      {/* Aging effects */}
      {aged && <AgingOverlay variant={variant} />}

      {/* Tape pieces */}
      {taped && <TapePieces />}
    </div>
  );

  if (hoverable) {
    return (
      <motion.div variants={hoverLiftVariants} initial="rest" whileHover="hover">
        {content}
      </motion.div>
    );
  }

  return content;
}

interface AgingOverlayProps {
  variant: string;
}

function AgingOverlay({ variant }: AgingOverlayProps) {
  return (
    <>
      {/* Paper texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Edge darkening */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 20px rgba(139, 115, 85, 0.15)',
        }}
      />

      {/* Random spots for non-photo variants */}
      {variant !== 'photo' && (
        <>
          <div
            className="absolute pointer-events-none"
            style={{
              top: '15%',
              left: '20%',
              width: 20,
              height: 15,
              background: 'radial-gradient(ellipse, rgba(139, 115, 85, 0.08) 0%, transparent 70%)',
              transform: 'rotate(30deg)',
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: '25%',
              right: '10%',
              width: 25,
              height: 18,
              background: 'radial-gradient(ellipse, rgba(139, 115, 85, 0.06) 0%, transparent 70%)',
              transform: 'rotate(-20deg)',
            }}
          />
        </>
      )}

      {/* Photo-specific aging */}
      {variant === 'photo' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 20% 20%, rgba(255, 230, 150, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(139, 115, 85, 0.08) 0%, transparent 50%)
            `,
          }}
        />
      )}
    </>
  );
}

function TapePieces() {
  return (
    <>
      {/* Top left tape */}
      <div
        className="absolute -top-1 -left-1 z-20"
        style={{
          width: 30,
          height: 12,
          backgroundColor: 'rgba(255, 250, 220, 0.7)',
          transform: 'rotate(-45deg)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        }}
      />
      {/* Top right tape */}
      <div
        className="absolute -top-1 -right-1 z-20"
        style={{
          width: 30,
          height: 12,
          backgroundColor: 'rgba(255, 250, 220, 0.7)',
          transform: 'rotate(45deg)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        }}
      />
    </>
  );
}

interface PostcardProps {
  /** Message content for back */
  message?: string;
  /** Addressee */
  to?: string;
  /** Show stamps */
  stamped?: boolean;
  /** Rotation angle */
  rotation?: number;
  className?: string;
}

/**
 * Vintage postcard ephemera
 */
export function Postcard({
  message = 'Wish you were here!',
  to = 'My Dearest',
  stamped = true,
  rotation = 0,
  className,
}: PostcardProps) {
  return (
    <div
      className={cn('relative', className)}
      style={{
        width: 200,
        height: 130,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Back of postcard (visible) */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          boxShadow: '2px 3px 8px rgba(0,0,0,0.15)',
          filter: 'sepia(0.1)',
        }}
      >
        {/* Dividing line */}
        <div
          className="absolute top-2 bottom-2 left-1/2"
          style={{
            width: 1,
            backgroundColor: '#d4c9b5',
          }}
        />

        {/* Message side */}
        <div className="absolute top-2 left-2 w-[45%] h-[calc(100%-16px)]">
          <div
            className="text-xs italic p-1"
            style={{
              fontFamily: 'cursive, serif',
              color: '#3a3226',
              lineHeight: 1.4,
            }}
          >
            {message}
          </div>
        </div>

        {/* Address side */}
        <div className="absolute top-2 right-2 w-[45%] h-[calc(100%-16px)]">
          {/* Stamp area */}
          {stamped && (
            <div
              className="absolute top-0 right-0"
              style={{
                width: 30,
                height: 36,
                backgroundColor: '#8b4513',
                border: '2px solid #6b3513',
              }}
            >
              <div className="text-xs text-center text-white pt-2">5¢</div>
            </div>
          )}

          {/* Address lines */}
          <div className="mt-10 space-y-2">
            <div className="font-serif text-sm" style={{ color: '#3a3226', fontStyle: 'italic' }}>
              {to}
            </div>
            <div style={{ borderBottom: '1px solid #d4c9b5' }} />
            <div style={{ borderBottom: '1px solid #d4c9b5' }} />
            <div style={{ borderBottom: '1px solid #d4c9b5' }} />
          </div>
        </div>

        {/* Postmark */}
        {stamped && (
          <div
            className="absolute top-4 right-10 w-12 h-12 rounded-full border-2 flex items-center justify-center opacity-50"
            style={{
              borderColor: '#333',
              transform: 'rotate(-15deg)',
            }}
          >
            <div className="text-center text-xs" style={{ color: '#333' }}>
              <div>NOV</div>
              <div className="font-bold">23</div>
            </div>
          </div>
        )}

        {/* Paper texture */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  );
}

interface OldPhotoProps {
  /** Photo content or placeholder */
  children?: ReactNode;
  /** Width */
  width?: number;
  /** Height */
  height?: number;
  /** Rotation */
  rotation?: number;
  /** Photo style */
  style?: 'polaroid' | 'cabinet' | 'snapshot';
  /** Caption text */
  caption?: string;
  className?: string;
}

/**
 * Vintage photograph ephemera
 */
export function OldPhoto({
  children,
  width = 120,
  height = 100,
  rotation = 0,
  style = 'snapshot',
  caption,
  className,
}: OldPhotoProps) {
  const getBorderStyle = () => {
    switch (style) {
      case 'polaroid':
        return {
          padding: '8px 8px 30px 8px',
          backgroundColor: '#fafafa',
        };
      case 'cabinet':
        return {
          padding: 12,
          backgroundColor: '#e8e0d0',
          border: '2px solid #c4b8a8',
        };
      default:
        return {
          padding: 4,
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
        };
    }
  };

  return (
    <motion.div
      className={cn('relative', className)}
      style={{
        width: style === 'polaroid' ? width + 16 : width + 24,
        transform: `rotate(${rotation}deg)`,
        ...getBorderStyle(),
        boxShadow: '2px 3px 8px rgba(0,0,0,0.2)',
        filter: 'sepia(0.15) contrast(0.95)',
      }}
      variants={hoverLiftVariants}
      initial="rest"
      whileHover="hover"
    >
      {/* Photo area */}
      <div
        style={{
          width,
          height,
          backgroundColor: '#8a8070',
          overflow: 'hidden',
        }}
      >
        {children || (
          <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
            Photo
          </div>
        )}
      </div>

      {/* Caption for polaroid */}
      {style === 'polaroid' && caption && (
        <div
          className="text-center mt-2 text-xs"
          style={{
            fontFamily: 'cursive, serif',
            color: '#3a3226',
          }}
        >
          {caption}
        </div>
      )}

      {/* Aging overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 30% 30%, rgba(255, 230, 180, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(100, 80, 60, 0.1) 0%, transparent 50%)
          `,
        }}
      />
    </motion.div>
  );
}

function adjustColor(hex: string, amount: number): string {
  const num = Number.parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
