'use client';

import { motion, type Variants } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { type DepthLevel, depthMap } from './Layer';

interface CollageItemConfig {
  /** X position (percentage or pixels) */
  x: number | string;
  /** Y position (percentage or pixels) */
  y: number | string;
  /** Rotation in degrees */
  rotation?: number;
  /** Scale factor */
  scale?: number;
  /** Depth level */
  depth?: DepthLevel;
  /** Custom z-index (overrides depth) */
  zIndex?: number;
}

interface CollageProps {
  children: ReactNode;
  /** Width of the collage container */
  width?: number | string;
  /** Height of the collage container */
  height?: number | string;
  /** Enable staggered entrance animation */
  animated?: boolean;
  /** Stagger delay between items (seconds) */
  staggerDelay?: number;
  className?: string;
  style?: CSSProperties;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

/**
 * Container for creating collage-style compositions
 * Manages positioning and optional entrance animations
 */
export function Collage({
  children,
  width = '100%',
  height = '100%',
  animated = false,
  staggerDelay = 0.1,
  className,
  style,
}: CollageProps) {
  const customContainerVariants: Variants = {
    ...containerVariants,
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  if (animated) {
    return (
      <motion.div
        className={cn('collage relative overflow-hidden', className)}
        style={{ width, height, ...style }}
        variants={customContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={cn('collage relative overflow-hidden', className)}
      style={{ width, height, ...style }}
    >
      {children}
    </div>
  );
}

interface CollageItemProps {
  children: ReactNode;
  /** Item configuration */
  config: CollageItemConfig;
  /** Enable hover lift effect */
  hoverable?: boolean;
  /** Enable entrance animation (requires animated parent) */
  animated?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Individual item within a collage
 * Positioned absolutely with optional animations
 */
export function CollageItem({
  children,
  config,
  hoverable = true,
  animated = false,
  className,
  style,
}: CollageItemProps) {
  const { x, y, rotation = 0, scale = 1, depth = 'content', zIndex } = config;

  const computedZIndex = zIndex ?? depthMap[depth];

  const baseStyles: CSSProperties = {
    position: 'absolute',
    left: typeof x === 'number' ? `${x}%` : x,
    top: typeof y === 'number' ? `${y}%` : y,
    zIndex: computedZIndex,
    ...style,
  };

  if (animated) {
    return (
      <motion.div
        className={cn('collage-item', className)}
        style={baseStyles}
        variants={itemVariants}
        whileHover={
          hoverable
            ? {
                scale: scale * 1.05,
                rotate: rotation + 2,
                zIndex: computedZIndex + 10,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }
            : undefined
        }
        initial={{ rotate: rotation, scale }}
        animate={{ rotate: rotation, scale }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn('collage-item', className)}
      style={{
        ...baseStyles,
        transform: `rotate(${rotation}deg) scale(${scale})`,
      }}
      whileHover={
        hoverable
          ? {
              scale: scale * 1.05,
              rotate: rotation + 2,
              zIndex: computedZIndex + 10,
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}

interface ScatteredCollageProps {
  children: ReactNode[];
  /** Bounding box for scattered items */
  bounds?: {
    minX?: number;
    maxX?: number;
    minY?: number;
    maxY?: number;
  };
  /** Range of rotation angles */
  rotationRange?: [number, number];
  /** Range of scale factors */
  scaleRange?: [number, number];
  /** Seed for consistent random positioning */
  seed?: number;
  /** Container dimensions */
  width?: number | string;
  height?: number | string;
  className?: string;
}

/**
 * Seeded random number generator for consistent layouts
 */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

/**
 * Collage with automatically scattered items
 * Items are randomly positioned within bounds
 */
export function ScatteredCollage({
  children,
  bounds = { minX: 5, maxX: 75, minY: 5, maxY: 75 },
  rotationRange = [-15, 15],
  scaleRange = [0.9, 1.1],
  seed = 42,
  width = '100%',
  height = '100%',
  className,
}: ScatteredCollageProps) {
  const random = seededRandom(seed);
  const { minX = 5, maxX = 75, minY = 5, maxY = 75 } = bounds;

  return (
    <Collage width={width} height={height} className={className} animated>
      {children.map((child, index) => {
        const x = minX + random() * (maxX - minX);
        const y = minY + random() * (maxY - minY);
        const rotation = rotationRange[0] + random() * (rotationRange[1] - rotationRange[0]);
        const scale = scaleRange[0] + random() * (scaleRange[1] - scaleRange[0]);

        return (
          <CollageItem
            key={index}
            config={{
              x,
              y,
              rotation,
              scale,
              zIndex: index,
            }}
            animated
          >
            {child}
          </CollageItem>
        );
      })}
    </Collage>
  );
}

interface GridCollageProps {
  children: ReactNode[];
  /** Number of columns */
  columns?: number;
  /** Gap between items (percentage) */
  gap?: number;
  /** Add slight random offset to each item */
  jitter?: number;
  /** Container dimensions */
  width?: number | string;
  height?: number | string;
  className?: string;
}

/**
 * Grid-based collage with optional jitter
 * Items are arranged in a grid with optional random offset
 */
export function GridCollage({
  children,
  columns = 3,
  gap = 5,
  jitter = 0,
  width = '100%',
  height = '100%',
  className,
}: GridCollageProps) {
  const random = seededRandom(123);
  const rows = Math.ceil(children.length / columns);
  const cellWidth = (100 - gap * (columns + 1)) / columns;
  const cellHeight = (100 - gap * (rows + 1)) / rows;

  return (
    <Collage width={width} height={height} className={className} animated>
      {children.map((child, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);

        const baseX = gap + col * (cellWidth + gap);
        const baseY = gap + row * (cellHeight + gap);

        const x = baseX + (jitter ? (random() - 0.5) * jitter * 2 : 0);
        const y = baseY + (jitter ? (random() - 0.5) * jitter * 2 : 0);
        const rotation = jitter ? (random() - 0.5) * jitter : 0;

        return (
          <CollageItem
            key={index}
            config={{
              x,
              y,
              rotation,
              zIndex: index,
            }}
            animated
          >
            {child}
          </CollageItem>
        );
      })}
    </Collage>
  );
}
