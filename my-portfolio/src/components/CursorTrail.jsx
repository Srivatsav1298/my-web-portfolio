import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CursorTrail.css';

/**
 * CursorTrail - Neural particles following the mouse
 */
export default function CursorTrail() {
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const particleIdRef = useRef(0);

  useEffect(() => {
    let lastTime = Date.now();

    const handleMouseMove = (e) => {
      const now = Date.now();
      const dt = now - lastTime;

      // Calculate velocity
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      setMousePos({ x: e.clientX, y: e.clientY });

      // Only create particles if moving fast enough
      if (velocity > 5 && dt > 30) {
        const newParticle = {
          id: particleIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          size: Math.random() * 6 + 2,
          opacity: Math.min(velocity / 50, 1),
          vx: dx * 0.1 + (Math.random() - 0.5) * 2,
          vy: dy * 0.1 + (Math.random() - 0.5) * 2,
        };

        setParticles(prev => [...prev.slice(-20), newParticle]);
        lastTime = now;
      }

      lastPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Clean up old particles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.id < 1000));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  // Hide on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="cursor-trail">
      {/* Main cursor glow */}
      <motion.div
        className="cursor-trail__main"
        animate={{
          x: mousePos.x - 12,
          y: mousePos.y - 12,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="cursor-trail__ring"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 20,
          mass: 0.8,
        }}
      />

      {/* Trailing particles */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="cursor-trail__particle"
            initial={{
              x: particle.x - particle.size / 2,
              y: particle.y - particle.size / 2,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity * 0.8,
            }}
            animate={{
              x: particle.x + particle.vx * 20 - particle.size / 2,
              y: particle.y + particle.vy * 20 - particle.size / 2,
              opacity: 0,
              scale: 0.3,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Connection lines to nearby interactive elements */}
      <svg className="cursor-trail__connections">
        {/* Add connection lines here if needed */}
      </svg>
    </div>
  );
}
