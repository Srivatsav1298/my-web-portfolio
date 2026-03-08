import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// The Genius Path: A single, continuous unbroken mathematical curve.
// It explicitly hits three sharp points to form a perfect "V", 
// then loops backwards into fluid bezier curves to construct the "S".
// It is the intersection of Machine Logic (Absolute Vector V) and Human Flow (Sine Curve S).
const abstractSVPath = `
  M 25 30 
  L 50 85 
  L 75 30 
  C 65 10, 35 10, 25 30 
  C 25 55, 75 45, 75 70 
  C 75 90, 35 90, 25 70
`;

// Calculate Season Context natively
const getSeasonConfig = () => {
  const month = new Date().getMonth();
  // Spring (Mar 2 - May 4)
  if (month >= 2 && month <= 4) {
    return {
      id: 'spring',
      name: 'Spring / Generative Sync',
      primary: '#ff7eb3',
      secondary: '#ffef78',
      shadowColor: 'rgba(255, 126, 179, 0.6)',
      particleSpeed: 3
    };
  }
  // Summer (Jun 5 - Aug 7)
  else if (month >= 5 && month <= 7) {
    return {
      id: 'summer',
      name: 'Summer / High Compute',
      primary: '#00ff87',
      secondary: '#00b8ff',
      shadowColor: 'rgba(0, 255, 135, 0.6)',
      particleSpeed: 1.5
    };
  }
  // Autumn (Sep 8 - Nov 10)
  else if (month >= 8 && month <= 10) {
    return {
      id: 'autumn',
      name: 'Autumn / Data Harvesting',
      primary: '#ff4e50',
      secondary: '#f9d423',
      shadowColor: 'rgba(255, 78, 80, 0.6)',
      particleSpeed: 4
    };
  }
  // Winter (Dec 11 - Feb 1)
  else {
    return {
      id: 'winter',
      name: 'Winter / Deep Learning Frost',
      primary: '#00d2ff',
      secondary: '#3a7bd5',
      shadowColor: 'rgba(0, 210, 255, 0.6)',
      particleSpeed: 6
    };
  }
};

const BrandLogo = ({
  layoutId = 'shared-brand-logo',
  className = 'navbar__logo-mark',
  imageClassName = 'navbar__logo-image',
  fallbackClassName = 'navbar__logo-fallback',
  ariaLabel = 'Go to intro',
  href = '#intro',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const season = useMemo(() => getSeasonConfig(), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Neural nodes placed at critical intersections of the SVG path
  const nodes = [
    { cx: 25, cy: 30, delay: 0 },
    { cx: 50, cy: 85, delay: 0.5 },
    { cx: 75, cy: 30, delay: 1 },
    { cx: 50, cy: 16, delay: 1.5 },
    { cx: 50, cy: 50, delay: 2 },
    { cx: 50, cy: 83, delay: 2.5 },
    { cx: 25, cy: 70, delay: 3 },
  ];

  if (!mounted) return null; // Avoid hydration mismatch on initial render

  return (
    <motion.a
      layoutId={layoutId}
      href={href}
      className={className}
      aria-label={`${ariaLabel} - ${season.name}`}
      title={`AI Engine Status: ${season.name}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        outline: 'none',
        position: 'relative'
      }}
    >
      <svg
        className={imageClassName}
        viewBox="0 0 100 100"
        style={{ overflow: 'visible', zIndex: 2 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ai-seasonal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={season.primary} />
            <stop offset="100%" stopColor={season.secondary} />
          </linearGradient>

          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient background glow of the path to give it that "AI Core" look */}
        <motion.path
          d={abstractSVPath}
          fill="none"
          stroke={season.primary}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#neon-glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.3 : 0.05 }}
          transition={{ duration: 0.5 }}
        />

        {/* The true path drawing itself on mount */}
        <motion.path
          d={abstractSVPath}
          fill="none"
          stroke="url(#ai-seasonal-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />

        {/* Microscopic Neural Nodes mapped onto the intersection geometries */}
        <AnimatePresence>
          {isHovered && nodes.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.cx}
              cy={n.cy}
              r={2.5}
              fill="#ffffff"
              filter="url(#neon-glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.4] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            />
          ))}
        </AnimatePresence>

        {/* Data pulse that zips around the path infinitely like a supercomputer solving equations. 
            Speed scales dynamically based on the season */}
        <g style={{ display: isHovered ? 'block' : 'none' }}>
          <circle r="4" fill="#ffffff" filter="url(#neon-glow)" />
          <circle r="1.5" fill="#ffffff" />
          <animateMotion
            dur={`${season.particleSpeed}s`}
            begin="0s"
            repeatCount="indefinite"
            path={abstractSVPath}
            calcMode="linear"
          />
        </g>
      </svg>

      {/* Easter Egg Floating Text on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 5, filter: 'blur(2px)' }}
            style={{
              position: 'absolute',
              bottom: '-30px',
              fontFamily: 'monospace',
              fontSize: '9px',
              color: season.primary,
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
              pointerEvents: 'none',
              textShadow: `0 0 5px ${season.shadowColor}`,
              zIndex: 1
            }}
          >
            {season.name}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

export default BrandLogo;
