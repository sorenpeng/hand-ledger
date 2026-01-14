'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { hoverLiftVariants } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface VintageStampProps {
  children?: ReactNode;
  /** Stamp design variant */
  variant?: 'postage' | 'airmail' | 'commemorative' | 'revenue';
  /** Primary color */
  color?: string;
  /** Size of the stamp */
  size?: 'sm' | 'md' | 'lg';
  /** Rotation angle */
  rotation?: number;
  /** Whether stamp appears cancelled/used */
  cancelled?: boolean;
  className?: string;
}

/**
 * Vintage postage stamp with perforated edges
 */
export function VintageStamp({
  children,
  variant = 'postage',
  color = '#8b4513',
  size = 'md',
  rotation = 0,
  cancelled = false,
  className,
}: VintageStampProps) {
  const sizeMap = {
    sm: { width: 50, height: 60, perf: 4, fontSize: 8 },
    md: { width: 70, height: 85, perf: 5, fontSize: 10 },
    lg: { width: 100, height: 120, perf: 6, fontSize: 14 },
  };

  const { width, height, perf, fontSize } = sizeMap[size];

  // Generate perforated edge mask
  const perfCount = Math.floor(width / (perf * 2));
  const perfCountV = Math.floor(height / (perf * 2));

  return (
    <motion.div
      className={cn('relative', className)}
      style={{
        width: width + perf * 2,
        height: height + perf * 2,
        transform: `rotate(${rotation}deg)`,
      }}
      variants={hoverLiftVariants}
      initial="rest"
      whileHover="hover"
    >
      {/* Perforated border using SVG */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${width + perf * 2} ${height + perf * 2}`}
      >
        <defs>
          <mask id={`perf-mask-${variant}-${size}`}>
            <rect width="100%" height="100%" fill="white" />
            {/* Top perforations */}
            {Array.from({ length: perfCount + 1 }).map((_, i) => (
              <circle
                key={`t-${i}`}
                cx={perf + i * (width / perfCount)}
                cy={perf}
                r={perf * 0.6}
                fill="black"
              />
            ))}
            {/* Bottom perforations */}
            {Array.from({ length: perfCount + 1 }).map((_, i) => (
              <circle
                key={`b-${i}`}
                cx={perf + i * (width / perfCount)}
                cy={height + perf}
                r={perf * 0.6}
                fill="black"
              />
            ))}
            {/* Left perforations */}
            {Array.from({ length: perfCountV + 1 }).map((_, i) => (
              <circle
                key={`l-${i}`}
                cx={perf}
                cy={perf + i * (height / perfCountV)}
                r={perf * 0.6}
                fill="black"
              />
            ))}
            {/* Right perforations */}
            {Array.from({ length: perfCountV + 1 }).map((_, i) => (
              <circle
                key={`r-${i}`}
                cx={width + perf}
                cy={perf + i * (height / perfCountV)}
                r={perf * 0.6}
                fill="black"
              />
            ))}
          </mask>
        </defs>
        <rect
          x={0}
          y={0}
          width={width + perf * 2}
          height={height + perf * 2}
          fill={color}
          mask={`url(#perf-mask-${variant}-${size})`}
        />
      </svg>

      {/* Stamp inner content */}
      <div
        className="absolute flex flex-col items-center justify-center text-center"
        style={{
          top: perf + 2,
          left: perf + 2,
          width: width - 4,
          height: height - 4,
          border: `2px solid ${adjustColor(color, -30)}`,
          backgroundColor: adjustColor(color, 40),
          fontSize,
        }}
      >
        {/* Decorative inner frame */}
        <div
          className="absolute inset-1"
          style={{
            border: `1px solid ${adjustColor(color, -20)}`,
          }}
        />

        {/* Content area */}
        <div className="relative z-10 p-1">{children || getDefaultContent(variant, fontSize)}</div>

        {/* Value denomination */}
        <div
          className="absolute bottom-1 text-center w-full font-bold"
          style={{
            fontSize: fontSize * 0.8,
            color: adjustColor(color, -40),
          }}
        >
          {variant === 'airmail' ? 'AIR MAIL' : variant === 'revenue' ? 'REVENUE' : '5¢'}
        </div>
      </div>

      {/* Cancellation mark */}
      {cancelled && <CancellationMark width={width} height={height} perf={perf} />}

      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  );
}

function CancellationMark({
  width,
  height,
  perf,
}: {
  width: number;
  height: number;
  perf: number;
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: perf,
        left: perf,
        width,
        height,
      }}
    >
      {/* Wavy cancellation lines */}
      <svg aria-hidden="true" className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }}>
        <path
          d={`M 0 ${height * 0.3} Q ${width * 0.25} ${height * 0.2}, ${width * 0.5} ${height * 0.3} T ${width} ${height * 0.3}`}
          stroke="#333"
          strokeWidth={2}
          fill="none"
        />
        <path
          d={`M 0 ${height * 0.5} Q ${width * 0.25} ${height * 0.4}, ${width * 0.5} ${height * 0.5} T ${width} ${height * 0.5}`}
          stroke="#333"
          strokeWidth={2}
          fill="none"
        />
        <path
          d={`M 0 ${height * 0.7} Q ${width * 0.25} ${height * 0.6}, ${width * 0.5} ${height * 0.7} T ${width} ${height * 0.7}`}
          stroke="#333"
          strokeWidth={2}
          fill="none"
        />
      </svg>
      {/* Circular date mark */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          top: '20%',
          right: '10%',
          width: width * 0.5,
          height: width * 0.5,
          border: '2px solid #333',
          borderRadius: '50%',
          fontSize: 6,
          color: '#333',
          transform: 'rotate(-15deg)',
          opacity: 0.7,
        }}
      >
        <span className="text-center leading-tight">
          NOV
          <br />
          1923
        </span>
      </div>
    </div>
  );
}

function getDefaultContent(variant: string, fontSize: number) {
  switch (variant) {
    case 'airmail':
      return (
        <div className="flex flex-col items-center">
          <span style={{ fontSize: fontSize * 1.5 }}>✈</span>
          <span style={{ fontSize: fontSize * 0.8 }}>PAR AVION</span>
        </div>
      );
    case 'commemorative':
      return (
        <div className="flex flex-col items-center">
          <span style={{ fontSize: fontSize * 1.2 }}>★</span>
          <span style={{ fontSize: fontSize * 0.7 }}>COMMEMORATIVE</span>
        </div>
      );
    case 'revenue':
      return (
        <div className="flex flex-col items-center">
          <span style={{ fontSize: fontSize * 1.2 }}>⚖</span>
          <span style={{ fontSize: fontSize * 0.7 }}>DOCUMENTARY</span>
        </div>
      );
    default:
      return (
        <div className="flex flex-col items-center">
          <span style={{ fontSize: fontSize * 0.8 }}>POSTAGE</span>
        </div>
      );
  }
}

interface StampCollectionProps {
  stamps?: Array<{
    variant?: 'postage' | 'airmail' | 'commemorative' | 'revenue';
    color?: string;
    rotation?: number;
    cancelled?: boolean;
  }>;
  className?: string;
}

/**
 * A collection of overlapping vintage stamps
 */
export function StampCollection({ stamps, className }: StampCollectionProps) {
  const defaultStamps = [
    { variant: 'postage' as const, color: '#8b4513', rotation: -5, cancelled: true },
    { variant: 'airmail' as const, color: '#1e4d6b', rotation: 8, cancelled: false },
    { variant: 'commemorative' as const, color: '#6b3a5b', rotation: -3, cancelled: true },
  ];

  const stampList = stamps || defaultStamps;

  return (
    <div className={cn('relative', className)} style={{ width: 180, height: 150 }}>
      {stampList.map((stamp, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: index * 15,
            left: index * 25,
            zIndex: stampList.length - index,
          }}
        >
          <VintageStamp
            variant={stamp.variant}
            color={stamp.color}
            rotation={stamp.rotation}
            cancelled={stamp.cancelled}
            size="sm"
          />
        </div>
      ))}
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
