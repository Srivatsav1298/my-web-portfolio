import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../../styles/glass.css';

/**
 * GlassButton - Button with Google Material-style ripple effect
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional classes
 * @param {string} props.variant - 'default' | 'primary' | 'ghost'
 * @param {Function} props.onClick - Click handler
 * @param {string} props.href - If provided, renders as anchor
 */
export default function GlassButton({
  children,
  className = '',
  variant = 'default',
  onClick,
  href,
  ...props
}) {
  const buttonRef = useRef(null);
  const rippleContainerRef = useRef(null);

  // Create ripple effect on click
  const createRipple = useCallback((event) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    // Create ripple element
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    // Remove after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }, []);

  const handleClick = useCallback((event) => {
    createRipple(event);
    if (onClick) onClick(event);
  }, [createRipple, onClick]);

  const variantClass = variant !== 'default' ? `glass-button--${variant}` : '';
  const combinedClassName = `glass-button ${variantClass} ${className}`.trim();

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={buttonRef}
      className={combinedClassName}
      onClick={handleClick}
      href={href}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {children}
    </Component>
  );
}
