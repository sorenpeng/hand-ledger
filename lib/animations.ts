import type { Transition, Variants } from 'framer-motion';

/**
 * Easing curves for natural, paper-like motion
 */
export const easings = {
  // Smooth page turn
  pageTurn: [0.645, 0.045, 0.355, 1] as const,
  // Spring-like bounce
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  // Gentle ease out
  gentle: [0.25, 0.1, 0.25, 1] as const,
  // Quick snap
  snap: [0.4, 0, 0.2, 1] as const,
};

/**
 * Page flip animation variants
 */
export const pageFlipVariants: Variants = {
  closed: {
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: easings.pageTurn,
    },
  },
  flipping: {
    rotateY: -90,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
  open: {
    rotateY: -180,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Pocket opening animation variants
 */
export const pocketVariants: Variants = {
  closed: {
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
  open: {
    rotateX: -160,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

/**
 * Reveal animation for items inside pockets
 */
export const revealVariants: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
};

/**
 * Staggered children animation
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Fade in animation
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easings.gentle,
    },
  },
};

/**
 * Scale in animation
 */
export const scaleInVariants: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};

/**
 * Flip out (fold) animation variants
 */
export const flipOutVariants: Variants = {
  folded: {
    rotateY: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
  unfolded: {
    rotateY: -180,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

/**
 * Hover lift effect
 */
export const hoverLiftVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  hover: {
    y: -5,
    scale: 1.02,
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

/**
 * Tag swing animation
 */
export const tagSwingVariants: Variants = {
  rest: {
    rotate: 0,
  },
  swing: {
    rotate: [0, 5, -5, 3, -3, 0],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

/**
 * Spring transition preset for interactive elements
 */
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 20,
};

/**
 * Slow spring for heavy elements
 */
export const slowSpring: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

/**
 * Quick spring for responsive feedback
 */
export const quickSpring: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
};
