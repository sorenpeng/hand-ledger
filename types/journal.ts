import type { ReactNode } from 'react';

/**
 * Page content configuration
 */
export interface PageContent {
  id: string;
  frontContent: ReactNode;
  backContent?: ReactNode;
  texture?: 'cream' | 'aged' | 'dark' | 'stained';
  hasInteractiveElements?: boolean;
}

/**
 * Journal configuration
 */
export interface JournalConfig {
  pages: PageContent[];
  coverTitle?: string;
  coverSubtitle?: string;
}

/**
 * Page flip direction
 */
export type FlipDirection = 'forward' | 'backward';

/**
 * Page state during animation
 */
export type PageState = 'closed' | 'flipping' | 'open';

/**
 * Interactive element types
 */
export type InteractiveElementType =
  | 'pocket'
  | 'envelope'
  | 'flipout'
  | 'bellyband'
  | 'pulltab'
  | 'tag';

/**
 * Layer depth levels
 */
export type LayerDepth = 'base' | 'content' | 'overlay' | 'interactive' | 'floating';

/**
 * Position for decorative elements
 */
export interface Position {
  x: number;
  y: number;
  rotation?: number;
  scale?: number;
}

/**
 * Decorative element configuration
 */
export interface DecorativeElement {
  type: 'stamp' | 'waxseal' | 'coffeestain' | 'lace' | 'sheetmusic' | 'receipt' | 'ephemera';
  position: Position;
  variant?: string | number;
  opacity?: number;
}

/**
 * Interactive element configuration
 */
export interface InteractiveElement {
  type: InteractiveElementType;
  position: Position;
  content?: ReactNode;
  hiddenContent?: ReactNode;
}

/**
 * Torn edge configuration
 */
export interface TornEdgeConfig {
  edge: 'top' | 'right' | 'bottom' | 'left';
  variant?: number;
  intensity?: 'subtle' | 'medium' | 'rough';
}
