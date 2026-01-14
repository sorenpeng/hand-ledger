'use client';

import { cn } from '@/lib/utils';

interface LaceProps {
  /** Lace pattern variant */
  variant?: 'border' | 'corner' | 'strip' | 'doily';
  /** Lace color */
  color?: string;
  /** Width for strip/border variants */
  width?: number;
  /** Height for strip variant */
  height?: number;
  /** Size for corner/doily variants */
  size?: number;
  /** Opacity of the lace */
  opacity?: number;
  className?: string;
}

/**
 * Decorative lace overlay patterns
 */
export function Lace({
  variant = 'border',
  color = '#f5f0e8',
  width = 200,
  height = 30,
  size = 80,
  opacity = 0.9,
  className,
}: LaceProps) {
  switch (variant) {
    case 'border':
      return (
        <LaceBorder
          color={color}
          width={width}
          height={height}
          opacity={opacity}
          className={className}
        />
      );
    case 'corner':
      return <LaceCorner color={color} size={size} opacity={opacity} className={className} />;
    case 'strip':
      return (
        <LaceStrip
          color={color}
          width={width}
          height={height}
          opacity={opacity}
          className={className}
        />
      );
    case 'doily':
      return <LaceDoily color={color} size={size} opacity={opacity} className={className} />;
    default:
      return null;
  }
}

interface LaceBorderProps {
  color: string;
  width: number;
  height: number;
  opacity: number;
  className?: string;
}

function LaceBorder({ color, width, height, opacity, className }: LaceBorderProps) {
  const scallops = Math.floor(width / (height * 0.8));

  return (
    <div className={cn('relative', className)} style={{ width, height, opacity }}>
      <svg aria-hidden="true" viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <defs>
          <pattern id="lace-holes" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1.5" fill="transparent" />
          </pattern>
        </defs>

        {/* Scalloped edge */}
        <path
          d={generateScallopPath(width, height, scallops)}
          fill={color}
          stroke={adjustColor(color, -20)}
          strokeWidth={0.5}
        />

        {/* Decorative holes pattern */}
        {Array.from({ length: Math.floor(width / 12) }).map((_, i) => (
          <g key={i}>
            <circle
              cx={6 + i * 12}
              cy={height * 0.4}
              r={2}
              fill="transparent"
              stroke={adjustColor(color, -30)}
              strokeWidth={0.5}
            />
            <circle
              cx={12 + i * 12}
              cy={height * 0.6}
              r={1.5}
              fill="transparent"
              stroke={adjustColor(color, -30)}
              strokeWidth={0.5}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

function generateScallopPath(width: number, height: number, scallops: number): string {
  const scallopWidth = width / scallops;
  let path = `M 0 ${height} L 0 ${height * 0.3}`;

  for (let i = 0; i < scallops; i++) {
    const x2 = (i + 0.5) * scallopWidth;
    const x3 = (i + 1) * scallopWidth;
    path += ` Q ${x2} 0, ${x3} ${height * 0.3}`;
  }

  path += ` L ${width} ${height} Z`;
  return path;
}

interface LaceCornerProps {
  color: string;
  size: number;
  opacity: number;
  className?: string;
}

function LaceCorner({ color, size, opacity, className }: LaceCornerProps) {
  return (
    <div className={cn('relative', className)} style={{ width: size, height: size, opacity }}>
      <svg aria-hidden="true" viewBox="0 0 100 100" className="w-full h-full">
        {/* Main corner shape */}
        <path
          d="M 0 0 L 100 0 Q 90 10, 80 20 Q 60 40, 40 60 Q 20 80, 0 100 Z"
          fill={color}
          stroke={adjustColor(color, -20)}
          strokeWidth={0.5}
        />

        {/* Decorative scalloped inner edge */}
        <path
          d="M 10 0 Q 20 15, 15 25 Q 25 35, 20 45 Q 30 55, 25 65 Q 35 75, 30 85 Q 20 95, 0 90"
          fill="none"
          stroke={adjustColor(color, -30)}
          strokeWidth={1}
        />

        {/* Hole pattern */}
        {Array.from({ length: 5 }).map((_, i) => (
          <g key={i}>
            <circle
              cx={15 + i * 12}
              cy={10 + i * 15}
              r={3}
              fill="transparent"
              stroke={adjustColor(color, -25)}
              strokeWidth={0.5}
            />
            <circle
              cx={8 + i * 10}
              cy={20 + i * 15}
              r={2}
              fill="transparent"
              stroke={adjustColor(color, -25)}
              strokeWidth={0.5}
            />
          </g>
        ))}

        {/* Fine detail lines */}
        <path
          d="M 5 5 Q 25 15, 20 30 M 8 12 Q 30 22, 25 40 M 12 20 Q 35 30, 30 50"
          fill="none"
          stroke={adjustColor(color, -15)}
          strokeWidth={0.3}
        />
      </svg>
    </div>
  );
}

interface LaceStripProps {
  color: string;
  width: number;
  height: number;
  opacity: number;
  className?: string;
}

function LaceStrip({ color, width, height, opacity, className }: LaceStripProps) {
  const repeats = Math.floor(width / height);

  return (
    <div className={cn('relative', className)} style={{ width, height, opacity }}>
      <svg aria-hidden="true" viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <defs>
          <pattern
            id="lace-diamond"
            x="0"
            y="0"
            width={height}
            height={height}
            patternUnits="userSpaceOnUse"
          >
            {/* Diamond shape */}
            <path
              d={`M ${height / 2} 2 L ${height - 2} ${height / 2} L ${height / 2} ${height - 2} L 2 ${height / 2} Z`}
              fill="none"
              stroke={adjustColor(color, -30)}
              strokeWidth={0.5}
            />
            {/* Center hole */}
            <circle
              cx={height / 2}
              cy={height / 2}
              r={height * 0.15}
              fill="transparent"
              stroke={adjustColor(color, -25)}
              strokeWidth={0.5}
            />
            {/* Corner dots */}
            <circle cx={height * 0.25} cy={height * 0.25} r={1} fill={adjustColor(color, -20)} />
            <circle cx={height * 0.75} cy={height * 0.25} r={1} fill={adjustColor(color, -20)} />
            <circle cx={height * 0.25} cy={height * 0.75} r={1} fill={adjustColor(color, -20)} />
            <circle cx={height * 0.75} cy={height * 0.75} r={1} fill={adjustColor(color, -20)} />
          </pattern>
        </defs>

        {/* Background strip */}
        <rect x={0} y={0} width={width} height={height} fill={color} />

        {/* Pattern overlay */}
        <rect x={0} y={0} width={width} height={height} fill="url(#lace-diamond)" />

        {/* Scalloped edges */}
        {Array.from({ length: repeats + 1 }).map((_, i) => (
          <g key={i}>
            {/* Top scallop */}
            <path
              d={`M ${i * height} 0 Q ${i * height + height / 2} ${height * 0.15}, ${(i + 1) * height} 0`}
              fill="none"
              stroke={adjustColor(color, -30)}
              strokeWidth={1}
            />
            {/* Bottom scallop */}
            <path
              d={`M ${i * height} ${height} Q ${i * height + height / 2} ${height * 0.85}, ${(i + 1) * height} ${height}`}
              fill="none"
              stroke={adjustColor(color, -30)}
              strokeWidth={1}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

interface LaceDoilyProps {
  color: string;
  size: number;
  opacity: number;
  className?: string;
}

function LaceDoily({ color, size, opacity, className }: LaceDoilyProps) {
  const center = size / 2;
  const petals = 12;

  return (
    <div className={cn('relative', className)} style={{ width: size, height: size, opacity }}>
      <svg aria-hidden="true" viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        {/* Outer scalloped edge */}
        <path
          d={generateDoilyPath(center, size * 0.48, petals)}
          fill={color}
          stroke={adjustColor(color, -20)}
          strokeWidth={0.5}
        />

        {/* Middle ring */}
        <path
          d={generateDoilyPath(center, size * 0.35, petals)}
          fill="transparent"
          stroke={adjustColor(color, -25)}
          strokeWidth={1}
        />

        {/* Inner ring with holes */}
        <circle
          cx={center}
          cy={center}
          r={size * 0.25}
          fill="transparent"
          stroke={adjustColor(color, -20)}
          strokeWidth={0.5}
        />

        {/* Radiating lines */}
        {Array.from({ length: petals }).map((_, i) => {
          const angle = (i * 360) / petals;
          const rad = (angle * Math.PI) / 180;
          const x1 = center + Math.cos(rad) * size * 0.15;
          const y1 = center + Math.sin(rad) * size * 0.15;
          const x2 = center + Math.cos(rad) * size * 0.4;
          const y2 = center + Math.sin(rad) * size * 0.4;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={adjustColor(color, -15)}
              strokeWidth={0.5}
            />
          );
        })}

        {/* Decorative holes around edge */}
        {Array.from({ length: petals * 2 }).map((_, i) => {
          const angle = (i * 360) / (petals * 2);
          const rad = (angle * Math.PI) / 180;
          const x = center + Math.cos(rad) * size * 0.3;
          const y = center + Math.sin(rad) * size * 0.3;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={size * 0.02}
              fill="transparent"
              stroke={adjustColor(color, -30)}
              strokeWidth={0.5}
            />
          );
        })}

        {/* Center decoration */}
        <circle
          cx={center}
          cy={center}
          r={size * 0.08}
          fill="transparent"
          stroke={adjustColor(color, -25)}
          strokeWidth={1}
        />
        <circle cx={center} cy={center} r={size * 0.03} fill={adjustColor(color, -10)} />
      </svg>
    </div>
  );
}

function generateDoilyPath(center: number, radius: number, petals: number): string {
  let path = '';
  const angleStep = 360 / petals;

  for (let i = 0; i < petals; i++) {
    const angle1 = i * angleStep;
    const angle2 = (i + 0.5) * angleStep;
    const angle3 = (i + 1) * angleStep;

    const rad1 = (angle1 * Math.PI) / 180;
    const rad2 = (angle2 * Math.PI) / 180;
    const rad3 = (angle3 * Math.PI) / 180;

    const x1 = center + Math.cos(rad1) * radius * 0.85;
    const y1 = center + Math.sin(rad1) * radius * 0.85;
    const x2 = center + Math.cos(rad2) * radius;
    const y2 = center + Math.sin(rad2) * radius;
    const x3 = center + Math.cos(rad3) * radius * 0.85;
    const y3 = center + Math.sin(rad3) * radius * 0.85;

    if (i === 0) {
      path = `M ${x1} ${y1}`;
    }
    path += ` Q ${x2} ${y2}, ${x3} ${y3}`;
  }

  path += ' Z';
  return path;
}

function adjustColor(hex: string, amount: number): string {
  const num = Number.parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
