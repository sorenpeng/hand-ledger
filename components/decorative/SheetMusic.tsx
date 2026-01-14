'use client';

import { cn } from '@/lib/utils';

interface SheetMusicProps {
  /** Width of the sheet */
  width?: number;
  /** Height of the sheet */
  height?: number;
  /** Paper color */
  color?: string;
  /** Ink color for notes and lines */
  inkColor?: string;
  /** Amount of aging/yellowing */
  aged?: boolean;
  /** Title text */
  title?: string;
  className?: string;
}

/**
 * Vintage sheet music background decoration
 */
export function SheetMusic({
  width = 200,
  height = 280,
  color = '#f8f4e8',
  inkColor = '#3a3226',
  aged = true,
  title = 'Nocturne',
  className,
}: SheetMusicProps) {
  const staffSpacing = 8;
  const staffCount = 5;
  const measureCount = Math.floor(width / 50);

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        width,
        height,
        backgroundColor: color,
        boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
        filter: aged ? 'sepia(0.15) contrast(0.95)' : undefined,
      }}
    >
      {/* Aged paper texture */}
      {aged && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            opacity: 0.1,
          }}
        />
      )}

      {/* Title area */}
      <div
        className="text-center pt-3 pb-2"
        style={{
          fontFamily: 'serif',
          fontSize: Math.max(12, width * 0.08),
          color: inkColor,
          fontStyle: 'italic',
        }}
      >
        {title}
      </div>

      {/* Composer */}
      <div
        className="text-right pr-4 pb-2"
        style={{
          fontFamily: 'serif',
          fontSize: Math.max(8, width * 0.04),
          color: inkColor,
          opacity: 0.7,
        }}
      >
        Op. 9, No. 2
      </div>

      {/* Musical staves */}
      <svg
        aria-hidden="true"
        className="absolute"
        style={{ top: height * 0.2, left: 0 }}
        width={width}
        height={height * 0.75}
        viewBox={`0 0 ${width} ${height * 0.75}`}
      >
        {/* Draw multiple staff systems */}
        {Array.from({ length: 4 }).map((_, staffSystem) => {
          const systemY = staffSystem * (staffCount * staffSpacing + 30);
          return (
            <g key={staffSystem}>
              {/* Treble clef staff */}
              <Staff y={systemY} width={width} staffSpacing={staffSpacing} inkColor={inkColor} />
              {/* Clef symbol */}
              <text
                x={8}
                y={systemY + staffSpacing * 3}
                fontSize={staffSpacing * 4}
                fontFamily="serif"
                fill={inkColor}
              >
                𝄞
              </text>
              {/* Time signature */}
              <text
                x={28}
                y={systemY + staffSpacing * 2}
                fontSize={staffSpacing * 1.5}
                fontFamily="serif"
                fill={inkColor}
              >
                3
              </text>
              <text
                x={28}
                y={systemY + staffSpacing * 4}
                fontSize={staffSpacing * 1.5}
                fontFamily="serif"
                fill={inkColor}
              >
                4
              </text>
              {/* Bar lines */}
              {Array.from({ length: measureCount }).map((_, i) => (
                <line
                  key={i}
                  x1={45 + (i + 1) * ((width - 50) / measureCount)}
                  y1={systemY}
                  x2={45 + (i + 1) * ((width - 50) / measureCount)}
                  y2={systemY + staffSpacing * 4}
                  stroke={inkColor}
                  strokeWidth={0.5}
                />
              ))}
              {/* Random notes */}
              <Notes
                systemY={systemY}
                width={width}
                staffSpacing={staffSpacing}
                measureCount={measureCount}
                inkColor={inkColor}
                seed={staffSystem}
              />
            </g>
          );
        })}
      </svg>

      {/* Edge wear marks */}
      {aged && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-2"
            style={{
              background: `linear-gradient(to bottom, ${adjustColor(color, -15)}, transparent)`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-3"
            style={{
              background: `linear-gradient(to top, ${adjustColor(color, -20)}, transparent)`,
            }}
          />
        </>
      )}
    </div>
  );
}

interface StaffProps {
  y: number;
  width: number;
  staffSpacing: number;
  inkColor: string;
}

function Staff({ y, width, staffSpacing, inkColor }: StaffProps) {
  return (
    <g>
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={i}
          x1={5}
          y1={y + i * staffSpacing}
          x2={width - 5}
          y2={y + i * staffSpacing}
          stroke={inkColor}
          strokeWidth={0.5}
          opacity={0.8}
        />
      ))}
    </g>
  );
}

interface NotesProps {
  systemY: number;
  width: number;
  staffSpacing: number;
  measureCount: number;
  inkColor: string;
  seed: number;
}

function Notes({ systemY, width, staffSpacing, measureCount, inkColor, seed }: NotesProps) {
  // Pseudo-random note positions based on seed
  const notePatterns = [
    [0, 2, 4, 1, 3],
    [3, 1, 4, 2, 0],
    [2, 4, 0, 3, 1],
    [1, 3, 2, 4, 0],
  ];

  const pattern = notePatterns[seed % notePatterns.length];
  const measureWidth = (width - 50) / measureCount;

  return (
    <g>
      {Array.from({ length: measureCount }).map((_, measure) =>
        Array.from({ length: 3 }).map((_, beat) => {
          const noteIndex = (measure + beat + seed) % 5;
          const staffLine = pattern[noteIndex];
          const x = 50 + measure * measureWidth + (beat + 0.5) * (measureWidth / 3);
          const y = systemY + staffLine * staffSpacing;

          // Alternate between quarter notes and eighth notes
          const isEighth = (measure + beat) % 3 === 0;

          return (
            <g key={`${measure}-${beat}`}>
              {/* Note head */}
              <ellipse
                cx={x}
                cy={y}
                rx={staffSpacing * 0.45}
                ry={staffSpacing * 0.35}
                fill={inkColor}
                transform={`rotate(-15 ${x} ${y})`}
              />
              {/* Stem */}
              <line
                x1={x + staffSpacing * 0.4}
                y1={y}
                x2={x + staffSpacing * 0.4}
                y2={y - staffSpacing * 2.5}
                stroke={inkColor}
                strokeWidth={0.8}
              />
              {/* Flag for eighth notes */}
              {isEighth && (
                <path
                  d={`M ${x + staffSpacing * 0.4} ${y - staffSpacing * 2.5} Q ${x + staffSpacing * 1.2} ${y - staffSpacing * 1.5}, ${x + staffSpacing * 0.6} ${y - staffSpacing * 1}`}
                  fill="none"
                  stroke={inkColor}
                  strokeWidth={0.8}
                />
              )}
            </g>
          );
        }),
      )}
    </g>
  );
}

interface MusicScrapProps {
  /** Width of the scrap */
  width?: number;
  /** Height of the scrap */
  height?: number;
  /** Rotation angle */
  rotation?: number;
  /** Torn edges */
  torn?: boolean;
  className?: string;
}

/**
 * A torn scrap of sheet music for collage
 */
export function MusicScrap({
  width = 120,
  height = 80,
  rotation = 0,
  torn = true,
  className,
}: MusicScrapProps) {
  const staffSpacing = 6;

  return (
    <div
      className={cn('relative', className)}
      style={{
        width,
        height,
        transform: `rotate(${rotation}deg)`,
        backgroundColor: '#f8f4e8',
        filter: 'sepia(0.2) contrast(0.9)',
        clipPath: torn
          ? `polygon(
              2% 5%, 8% 0%, 15% 3%, 25% 1%, 35% 4%, 45% 0%, 55% 2%, 65% 0%, 75% 3%, 85% 1%, 92% 4%, 100% 2%,
              98% 15%, 100% 30%, 97% 45%, 100% 60%, 98% 75%, 100% 90%, 97% 100%,
              90% 98%, 80% 100%, 70% 97%, 60% 100%, 50% 98%, 40% 100%, 30% 97%, 20% 100%, 10% 98%, 0% 100%,
              3% 85%, 0% 70%, 2% 55%, 0% 40%, 3% 25%, 0% 10%
            )`
          : undefined,
        boxShadow: '1px 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {/* Staff lines */}
      <svg aria-hidden="true" width={width} height={height} className="absolute inset-0">
        {Array.from({ length: 2 }).map((_, staff) => (
          <g key={staff}>
            {Array.from({ length: 5 }).map((_, line) => (
              <line
                key={line}
                x1={0}
                y1={15 + staff * 35 + line * staffSpacing}
                x2={width}
                y2={15 + staff * 35 + line * staffSpacing}
                stroke="#3a3226"
                strokeWidth={0.5}
                opacity={0.7}
              />
            ))}
          </g>
        ))}

        {/* Some random notes */}
        {Array.from({ length: 6 }).map((_, i) => {
          const x = 15 + i * 18;
          const y = 18 + (i % 5) * staffSpacing;
          return (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx={4}
              ry={3}
              fill="#3a3226"
              transform={`rotate(-15 ${x} ${y})`}
            />
          );
        })}
      </svg>

      {/* Paper texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
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
