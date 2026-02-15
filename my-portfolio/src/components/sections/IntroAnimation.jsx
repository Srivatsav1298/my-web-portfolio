import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import profileImage from '../../assets/profile.jpg';
import './IntroAnimation.css';

/**
 * IntroAnimation - Split Layout Hero
 * Content on left, profile picture on right, exits on scroll
 */
export default function IntroAnimation({ onIntroComplete }) {
  const { greeting } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(1);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      // Hide section after scrolling past 1 viewport height
      setIsInView(newScrollY < windowHeight * 0.9);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [windowHeight]);

  // Smooth easing
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  // Calculate scroll progress (gentle fade - 1x viewport)
  const rawProgress = Math.min(scrollY / windowHeight, 1);

  // Animation values - softer, more gradual
  const animations = useMemo(() => {
    // Content fades out gradually as user scrolls past 50%
    const contentOpacity = rawProgress < 0.5
      ? 1
      : 1 - ((rawProgress - 0.5) * 1.5);

    const contentY = rawProgress > 0.3
      ? -((rawProgress - 0.3) * 50)
      : 0;

    // Scroll indicator fades out quickly
    const scrollHintOpacity = Math.max(0, 1 - rawProgress * 2);

    return {
      contentOpacity: Math.max(0, contentOpacity),
      contentY,
      scrollHintOpacity,
    };
  }, [rawProgress]);

  // Update navbar name visibility
  useEffect(() => {
    if (rawProgress > 0.5) {
      onIntroComplete?.(true);
    } else {
      onIntroComplete?.(false);
    }
  }, [rawProgress, onIntroComplete]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="intro" className="intro-section">
      <AnimatePresence>
        {isInView && (
          <>
            {/* Ambient glow */}
            <div className="intro-section__ambient-glow" />

            {/* Main container - split layout */}
            <motion.div
              className="intro-section__container"
              initial={{ opacity: 0 }}
              animate={{
                opacity: animations.contentOpacity,
                y: animations.contentY
              }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Left side - Content */}
              <div className="intro-section__content">
                {/* Greeting */}
                <motion.p
                  className="intro-section__greeting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {greeting}, I'm
                </motion.p>

                {/* Name */}
                <motion.h1
                  className="intro-section__name"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  Vatsav
                </motion.h1>

                {/* Role */}
                <motion.p
                  className="intro-section__role"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Software Engineer
                </motion.p>

                {/* Tagline */}
                <motion.p
                  className="intro-section__tagline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Building systems at the intersection of AI and Data
                </motion.p>

                {/* Stats row */}
                <motion.div
                  className="intro-section__stats"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <div className="intro-section__stat">
                    <span className="intro-section__stat-value">3+</span>
                    <span className="intro-section__stat-label">Years Exp</span>
                  </div>
                  <div className="intro-section__stat">
                    <span className="intro-section__stat-value">20+</span>
                    <span className="intro-section__stat-label">Projects</span>
                  </div>
                  <div className="intro-section__stat">
                    <span className="intro-section__stat-value">AI</span>
                    <span className="intro-section__stat-label">& Data</span>
                  </div>
                </motion.div>

                {/* CTA buttons */}
                <motion.div
                  className="intro-section__cta-row"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  <button
                    className="intro-section__cta-primary"
                    onClick={scrollToProjects}
                  >
                    View Work
                  </button>
                  <button
                    className="intro-section__cta-secondary"
                    onClick={scrollToContact}
                  >
                    Get in Touch
                  </button>
                </motion.div>
              </div>

              {/* Right side - Profile Picture */}
              <motion.div
                className="intro-section__profile"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <img src={profileImage} alt="Srivatsav" />
              </motion.div>
            </motion.div>

            {/* Scroll indicator - Minimal Arrow */}
            <motion.div
              className="intro-section__scroll-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: animations.scrollHintOpacity }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 1.4 }}
              onClick={() => window.scrollTo({ top: windowHeight, behavior: 'smooth' })}
              style={{ cursor: 'pointer' }}
            >
              <motion.div
                className="intro-section__scroll-arrow"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={28} strokeWidth={1.5} />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
