import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/glass.css';

/**
 * GlassCard - Glassmorphism card with hover effects
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional classes
 * @param {boolean} props.scale - Enable scale on hover
 * @param {boolean} props.static - Disable hover movement
 * @param {Object} props.style - Additional inline styles
 * @param {Function} props.onClick - Click handler
 */
export default function GlassCard({
  children,
  className = '',
  scale = false,
  static: isStatic = false,
  style = {},
  onClick,
  ...props
}) {
  const variants = {
    rest: {
      y: 0,
      scale: 1,
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
    },
    hover: isStatic
      ? {}
      : {
          y: -4,
          scale: scale ? 1.01 : 1,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        },
  };

  return (
    <motion.div
      className={`glass-card ${scale ? 'glass-card--scale' : ''} ${isStatic ? 'glass-card--static' : ''} ${className}`}
      style={style}
      initial="rest"
      whileHover="hover"
      variants={variants}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
