'use client';

import {
  Children,
  type CSSProperties,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';
import { type DepthLevel, depthMap } from './Layer';

interface LayerStackProps {
  children: ReactNode;
  /** Base z-index for the stack */
  baseZIndex?: number;
  /** Z-index increment between layers (when auto-ordering) */
  zIncrement?: number;
  /** Enable automatic z-index assignment based on child order */
  autoOrder?: boolean;
  /** Width of the stack container */
  width?: number | string;
  /** Height of the stack container */
  height?: number | string;
  /** Enable 3D perspective for depth effects */
  perspective?: number;
  /** Additional inline styles */
  style?: CSSProperties;
  className?: string;
}

/**
 * Container for managing multiple layers
 * Provides automatic z-index ordering and 3D perspective
 */
export function LayerStack({
  children,
  baseZIndex = 0,
  zIncrement = 1,
  autoOrder = false,
  width,
  height,
  perspective,
  style,
  className,
}: LayerStackProps) {
  const processedChildren = autoOrder
    ? Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<{ style?: CSSProperties }>, {
            style: {
              ...((child as ReactElement<{ style?: CSSProperties }>).props.style || {}),
              zIndex: baseZIndex + index * zIncrement,
            },
          });
        }
        return child;
      })
    : children;

  return (
    <div
      className={cn('layer-stack relative', className)}
      style={{
        width,
        height,
        perspective: perspective ? `${perspective}px` : undefined,
        transformStyle: perspective ? 'preserve-3d' : undefined,
        ...style,
      }}
    >
      {processedChildren}
    </div>
  );
}

interface DepthGroupProps {
  children: ReactNode;
  /** Depth level for all children in this group */
  depth: DepthLevel;
  /** Additional z-index offset within the depth level */
  offset?: number;
  className?: string;
}

/**
 * Groups layers at a specific depth level
 * Useful for organizing related elements
 */
export function DepthGroup({ children, depth, offset = 0, className }: DepthGroupProps) {
  return (
    <div
      className={cn('depth-group', className)}
      style={{
        position: 'relative',
        zIndex: depthMap[depth] + offset,
      }}
    >
      {children}
    </div>
  );
}

interface ParallaxStackProps {
  children: ReactNode;
  /** Depth multiplier for parallax effect */
  depthMultiplier?: number;
  /** Container dimensions */
  width?: number | string;
  height?: number | string;
  className?: string;
}

/**
 * Stack with parallax depth effect
 * Children further back appear smaller and more faded
 */
export function ParallaxStack({
  children,
  depthMultiplier = 0.1,
  width,
  height,
  className,
}: ParallaxStackProps) {
  const childArray = Children.toArray(children);
  const totalChildren = childArray.length;

  return (
    <div
      className={cn('parallax-stack relative', className)}
      style={{
        width,
        height,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {childArray.map((child, index) => {
        if (!isValidElement(child)) return child;

        const depth = (totalChildren - index - 1) * depthMultiplier;
        const scale = 1 - depth * 0.5;
        const opacity = 1 - depth * 0.3;

        return cloneElement(child as ReactElement<{ style?: CSSProperties }>, {
          key: index,
          style: {
            ...((child as ReactElement<{ style?: CSSProperties }>).props.style || {}),
            zIndex: index,
            transform: `translateZ(${-depth * 100}px) scale(${scale})`,
            opacity: Math.max(0.3, opacity),
          },
        });
      })}
    </div>
  );
}
