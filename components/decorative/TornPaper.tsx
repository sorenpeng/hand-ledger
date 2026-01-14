'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TornPaperProps {
  children?: ReactNode;
  edge?: 'top' | 'bottom' | 'left' | 'right' | 'all';
  color?: string;
  className?: string;
}

// SVG clip paths for torn edges - randomized jagged patterns
const tornEdgePaths = {
  top: `polygon(
    0% 8%, 3% 5%, 6% 9%, 10% 4%, 14% 7%, 18% 3%, 22% 8%, 26% 5%,
    30% 9%, 34% 4%, 38% 7%, 42% 3%, 46% 8%, 50% 5%, 54% 9%, 58% 4%,
    62% 7%, 66% 3%, 70% 8%, 74% 5%, 78% 9%, 82% 4%, 86% 7%, 90% 3%,
    94% 8%, 97% 5%, 100% 6%,
    100% 100%, 0% 100%
  )`,
  bottom: `polygon(
    0% 0%, 100% 0%,
    100% 92%, 97% 95%, 94% 91%, 90% 96%, 86% 93%, 82% 97%, 78% 92%,
    74% 95%, 70% 91%, 66% 96%, 62% 93%, 58% 97%, 54% 92%, 50% 95%,
    46% 91%, 42% 96%, 38% 93%, 34% 97%, 30% 92%, 26% 95%, 22% 91%,
    18% 96%, 14% 93%, 10% 97%, 6% 92%, 3% 95%, 0% 94%
  )`,
  left: `polygon(
    8% 0%, 100% 0%, 100% 100%, 8% 100%,
    5% 97%, 9% 94%, 4% 90%, 7% 86%, 3% 82%, 8% 78%, 5% 74%,
    9% 70%, 4% 66%, 7% 62%, 3% 58%, 8% 54%, 5% 50%, 9% 46%,
    4% 42%, 7% 38%, 3% 34%, 8% 30%, 5% 26%, 9% 22%, 4% 18%,
    7% 14%, 3% 10%, 8% 6%, 5% 3%
  )`,
  right: `polygon(
    0% 0%, 92% 0%,
    95% 3%, 91% 6%, 96% 10%, 93% 14%, 97% 18%, 92% 22%, 95% 26%,
    91% 30%, 96% 34%, 93% 38%, 97% 42%, 92% 46%, 95% 50%, 91% 54%,
    96% 58%, 93% 62%, 97% 66%, 92% 70%, 95% 74%, 91% 78%, 96% 82%,
    93% 86%, 97% 90%, 92% 94%, 95% 97%, 94% 100%,
    0% 100%
  )`,
  all: `polygon(
    5% 8%, 8% 5%, 12% 9%, 16% 4%, 20% 7%, 24% 3%, 28% 8%, 32% 5%,
    36% 9%, 40% 4%, 44% 7%, 48% 3%, 52% 8%, 56% 5%, 60% 9%, 64% 4%,
    68% 7%, 72% 3%, 76% 8%, 80% 5%, 84% 9%, 88% 4%, 92% 7%, 95% 5%,
    97% 12%, 94% 16%, 98% 20%, 93% 24%, 97% 28%, 94% 32%, 98% 36%,
    93% 40%, 97% 44%, 94% 48%, 98% 52%, 93% 56%, 97% 60%, 94% 64%,
    98% 68%, 93% 72%, 97% 76%, 94% 80%, 98% 84%, 93% 88%, 95% 92%,
    92% 95%, 88% 91%, 84% 96%, 80% 93%, 76% 97%, 72% 92%, 68% 95%,
    64% 91%, 60% 96%, 56% 93%, 52% 97%, 48% 92%, 44% 95%, 40% 91%,
    36% 96%, 32% 93%, 28% 97%, 24% 92%, 20% 95%, 16% 91%, 12% 96%,
    8% 93%, 5% 95%,
    3% 88%, 7% 84%, 2% 80%, 6% 76%, 2% 72%, 7% 68%, 3% 64%,
    6% 60%, 2% 56%, 7% 52%, 3% 48%, 6% 44%, 2% 40%, 7% 36%,
    3% 32%, 6% 28%, 2% 24%, 7% 20%, 3% 16%, 6% 12%
  )`,
};

/**
 * Torn paper wrapper with jagged edge effect
 */
export function TornPaper({
  children,
  edge = 'bottom',
  color = '#f5f0e1',
  className,
}: TornPaperProps) {
  return (
    <div
      className={cn('relative torn-edge', className)}
      style={{
        backgroundColor: color,
        clipPath: tornEdgePaths[edge],
      }}
    >
      {children}
    </div>
  );
}

interface TornEdgeDecoratorProps {
  position: 'top' | 'bottom';
  color?: string;
  className?: string;
}

/**
 * Standalone torn edge decorator
 * Used to add torn effect to existing elements
 */
export function TornEdgeDecorator({
  position,
  color = '#f5f0e1',
  className,
}: TornEdgeDecoratorProps) {
  const height = 12;

  return (
    <div
      className={cn(
        'absolute left-0 right-0 pointer-events-none',
        position === 'top' ? '-top-2' : '-bottom-2',
        className,
      )}
      style={{
        height,
        backgroundColor: color,
        clipPath: position === 'top' ? tornEdgePaths.top : tornEdgePaths.bottom,
        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
      }}
    />
  );
}

interface PaperScrapProps {
  children?: ReactNode;
  rotation?: number;
  color?: string;
  className?: string;
}

/**
 * Small paper scrap with torn edges all around
 */
export function PaperScrap({
  children,
  rotation = 0,
  color = '#f5f0e1',
  className,
}: PaperScrapProps) {
  return (
    <div
      className={cn('relative p-4 torn-edge paper-texture', className)}
      style={{
        backgroundColor: color,
        clipPath: tornEdgePaths.all,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {children}
    </div>
  );
}
