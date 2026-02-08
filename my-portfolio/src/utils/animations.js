/**
 * Shared Animation Variants
 * Centralized Framer Motion animations used across components
 */

// Standard ease curve used everywhere
export const smoothEase = [0.16, 1, 0.3, 1];

// ============================================
// Container Variants
// ============================================

/**
 * Container with stagger effect for child animations
 * Used in: Projects, Skills, Contact sections
 */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/**
 * Container with wider stagger (for projects grid)
 */
export const containerVariantsWide = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// ============================================
// Item Variants
// ============================================

/**
 * Standard fade-up animation for items
 * Used in: Contact, most section content
 */
export const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

/**
 * Title variant (same as item but explicitly named)
 */
export const titleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

// ============================================
// Card Variants
// ============================================

/**
 * Card animation with scale
 * Used in: Skills section
 */
export const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

/**
 * Project card animation (larger y offset)
 */
export const projectCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

// ============================================
// Line Variants
// ============================================

/**
 * Horizontal line scale animation
 * Used in: Section dividers (Projects, Skills, Contact, About)
 */
export const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

// ============================================
// Detail / Slide Variants
// ============================================

/**
 * Slide in from left animation
 * Used in: Contact details
 */
export const detailVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

// ============================================
// Common Animation Props
// ============================================

/**
 * Standard viewport settings for section animations
 */
export const sectionViewport = {
  once: true,
  margin: '-80px',
};

/**
 * Section line inline styles
 */
export const sectionLineStyle = {
  height: '2px',
  width: '60px',
  background: 'linear-gradient(90deg, transparent, #808080, transparent)',
  margin: '20px auto 0',
  transformOrigin: 'center',
};

/**
 * Contact section line style (slightly wider)
 */
export const contactLineStyle = {
  height: '2px',
  width: '80px',
  background: 'linear-gradient(90deg, transparent, #808080, transparent)',
  margin: '0 auto 32px',
  transformOrigin: 'center',
};
