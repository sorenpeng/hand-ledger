'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { type ReactNode, useState } from 'react';
import { revealVariants, slowSpring } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface EnvelopeProps {
  children?: ReactNode;
  color?: 'cream' | 'kraft' | 'airmail' | 'vintage';
  size?: 'sm' | 'md' | 'lg';
  sealed?: boolean;
  className?: string;
}

/**
 * Interactive envelope that opens to reveal letter contents
 * Features triangular flap with realistic fold animation
 */
export function Envelope({
  children,
  color = 'cream',
  size = 'md',
  sealed: initialSealed = true,
  className,
}: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(!initialSealed);

  const sizeMap = {
    sm: { width: 160, height: 100 },
    md: { width: 220, height: 140 },
    lg: { width: 300, height: 190 },
  };

  const colorMap = {
    cream: {
      body: '#f5f0e1',
      flap: '#ebe5d5',
      inner: '#e8e2d2',
      border: '#d4c9b5',
    },
    kraft: {
      body: '#c9a96e',
      flap: '#b89860',
      inner: '#a68850',
      border: '#957840',
    },
    airmail: {
      body: '#f8f6f0',
      flap: '#eceae4',
      inner: '#e0ded8',
      border: '#cc0000',
    },
    vintage: {
      body: '#e8dcc8',
      flap: '#ddd0bb',
      inner: '#d2c5ae',
      border: '#8b7355',
    },
  };

  const { width, height } = sizeMap[size];
  const colors = colorMap[color];
  const flapHeight = height * 0.55;

  return (
    <div
      role="button"
      tabIndex={0}
      data-page-interactive="true"
      className={cn('relative cursor-pointer select-none', className)}
      style={{ width, height: height + flapHeight * 0.3 }}
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
      {/* Envelope body */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height,
          backgroundColor: colors.body,
          border: `1px solid ${colors.border}`,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        }}
      >
        {/* Inner fold lines */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          {/* Bottom left fold */}
          <line
            x1="0"
            y1="100%"
            x2="50%"
            y2="60%"
            stroke={colors.border}
            strokeWidth="1"
            opacity="0.3"
          />
          {/* Bottom right fold */}
          <line
            x1="100%"
            y1="100%"
            x2="50%"
            y2="60%"
            stroke={colors.border}
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>

        {/* Airmail stripes */}
        {color === 'airmail' && (
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: 8,
              background: `repeating-linear-gradient(
                90deg,
                #cc0000,
                #cc0000 10px,
                #f8f6f0 10px,
                #f8f6f0 20px,
                #0055a4 20px,
                #0055a4 30px,
                #f8f6f0 30px,
                #f8f6f0 40px
              )`,
            }}
          />
        )}

        {/* Contents (visible when open) */}
        <AnimatePresence>
          {isOpen && children && (
            <motion.div
              className="absolute inset-2 flex items-center justify-center overflow-hidden"
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Triangular flap */}
      <motion.div
        className="absolute left-0 right-0"
        style={{
          top: 0,
          height: flapHeight,
          transformOrigin: 'bottom center',
          transformStyle: 'preserve-3d',
          zIndex: isOpen ? 0 : 10,
        }}
        animate={{
          rotateX: isOpen ? -180 : 0,
        }}
        transition={slowSpring}
      >
        {/* Front of flap */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: colors.flap,
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            backfaceVisibility: 'hidden',
            border: `1px solid ${colors.border}`,
            boxShadow: isOpen ? 'none' : '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {/* Seal mark */}
          {!isOpen && (
            <div
              className="absolute"
              style={{
                bottom: '25%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: '#8b2323',
                boxShadow:
                  'inset 1px 1px 2px rgba(255,255,255,0.2), inset -1px -1px 2px rgba(0,0,0,0.2)',
              }}
            />
          )}
        </div>

        {/* Back of flap (visible when open) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: colors.inner,
            clipPath: 'polygon(50% 100%, 100% 0%, 0% 0%)',
            transform: 'rotateX(180deg)',
            backfaceVisibility: 'hidden',
          }}
        />
      </motion.div>
    </div>
  );
}

interface LetterProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Letter content to place inside an envelope
 */
export function Letter({ children, className }: LetterProps) {
  return (
    <div
      className={cn(
        'w-full h-full bg-white p-3 text-xs leading-relaxed',
        'font-handwriting text-ink-dark',
        className,
      )}
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        background: `
          linear-gradient(transparent, transparent 23px, #e0e0e0 23px, #e0e0e0 24px),
          #fff
        `,
        backgroundSize: '100% 24px',
      }}
    >
      {children}
    </div>
  );
}
