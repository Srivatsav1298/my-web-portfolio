import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * MagneticButton - Button that attracts toward cursor when nearby
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  radius = 150,
  ...props
}) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < radius) {
      const factor = (1 - distance / radius) * strength;
      setPosition({
        x: distanceX * factor,
        y: distanceY * factor,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`magnetic-button ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 15,
        mass: 0.5,
      }}
      {...props}
    >
      <motion.span
        className="magnetic-button__content"
        animate={{
          x: position.x * 0.3,
          y: position.y * 0.3,
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 15,
          mass: 0.3,
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
