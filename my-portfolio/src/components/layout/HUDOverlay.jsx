import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../../styles/hud.css';

export default function HUDOverlay({ sections = [] }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress and current section
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.round((scrollY / docHeight) * 100) || 0;

    setScrollProgress(progress);

    // Determine current section (optional, kept for any side-effects, but unneeded for progress)
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="hud-overlay">

      {/* Side Progress Bar */}
      <div className="hud-progress-bar">
        <div
          className="hud-progress-bar__fill"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
}
