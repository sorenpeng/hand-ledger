'use client';

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Depth levels for layering system
 * Higher values appear above lower values
 */
export const depthMap = {
  base: 0,
  background: 5,
  content: 10,
  decoration: 15,
  overlay: 20,
  interactive: 30,
  floating: 40,
  tooltip: 50,
} as const;

export type DepthLevel = keyof typeof depthMap;

interface LayerProps {
  children: ReactNode;
  /** Predefined depth level */
  depth?: DepthLevel;
  /** Custom z-index (overrides depth) */
  zIndex?: number;
  /** Position relative to parent */
  position?: {
    top?: number | string;
    left?: number | string;
    right?: number | string;
    bottom?: number | string;
  };
  /** Rotation in degrees */
  rotation?: number;
  /** Scale factor */
  scale?: number;
  /** Opacity */
  opacity?: number;
  /** Pointer events behavior */
  pointerEvents?: 'auto' | 'none';
  /** Additional inline styles */
  style?: CSSProperties;
  className?: string;
}

/**
 * Layer component for z-index management in collage compositions
 * Wraps content and positions it within a layer stack
 */
export function Layer({
  children,
  depth = 'content',
  zIndex,
  position,
  rotation = 0,
  scale = 1,
  opacity = 1,
  pointerEvents = 'auto',
  style,
  className,
}: LayerProps) {
  const computedZIndex = zIndex ?? depthMap[depth];

  const positionStyles: CSSProperties = position
    ? {
        position: 'absolute',
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }
    : {};

  const transformParts: string[] = [];
  if (rotation !== 0) transformParts.push(`rotate(${rotation}deg)`);
  if (scale !== 1) transformParts.push(`scale(${scale})`);

  return (
    <div
      className={cn('layer', className)}
      style={{
        zIndex: computedZIndex,
        opacity,
        pointerEvents,
        transform: transformParts.length > 0 ? transformParts.join(' ') : undefined,
        ...positionStyles,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface AbsoluteLayerProps extends LayerProps {
  /** X position (alias for left) */
  x?: number | string;
  /** Y position (alias for top) */
  y?: number | string;
}

/**
 * Convenience wrapper for absolutely positioned layers
 */
export function AbsoluteLayer({ x, y, position, ...props }: AbsoluteLayerProps) {
  const computedPosition = position ?? {
    top: y,
    left: x,
  };

  return <Layer {...props} position={computedPosition} />;
}

interface CenteredLayerProps extends Omit<LayerProps, 'position'> {
  /** Center horizontally */
  horizontal?: boolean;
  /** Center vertically */
  vertical?: boolean;
}

/**
 * Layer that centers its content
 */
export function CenteredLayer({
  horizontal = true,
  vertical = true,
  style,
  className,
  ...props
}: CenteredLayerProps) {
  return (
    <Layer
      {...props}
      className={cn(className)}
      style={{
        position: 'absolute',
        top: vertical ? '50%' : undefined,
        left: horizontal ? '50%' : undefined,
        transform: `translate(${horizontal ? '-50%' : '0'}, ${vertical ? '-50%' : '0'})`,
        ...style,
      }}
    />
  );
}
