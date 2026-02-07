import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import MagneticButton from '../ui/MagneticButton';
import profileImage from '../../assets/profile.jpg';
import '../../styles/glass.css';
import './IntroAnimation.css';

/**
 * IntroAnimation - Hero section with smooth scroll-based reveals
 * Photo starts centered with dynamic greeting, moves right as content appears
 */
export default function IntroAnimation({ onIntroComplete }) {
  const { greeting } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(1);
  const [isInView, setIsInView] = useState(true);

  // Smoothed opacity for intro text (prevents jumping on fast scroll)
  const [smoothedIntroOpacity, setSmoothedIntroOpacity] = useState(0);
  const targetOpacityRef = useRef(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);

      // Check if intro section is still in view (within 250vh)
      setIsInView(newScrollY < windowHeight * 2.6);
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

  // Smooth animation loop for intro text opacity
  const lerp = useCallback((current, target, factor) => {
    return current + (target - current) * factor;
  }, []);

  useEffect(() => {
    const animate = () => {
      setSmoothedIntroOpacity(prev => {
        const newValue = lerp(prev, targetOpacityRef.current, 0.08);
        // Stop updating if very close to target
        if (Math.abs(newValue - targetOpacityRef.current) < 0.001) {
          return targetOpacityRef.current;
        }
        return newValue;
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [lerp]);

  // Smooth easing functions
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  // Calculate progress based on scroll (2.5x viewport height for animation)
  const rawProgress = Math.min(scrollY / (windowHeight * 2.5), 1);

  // Animation values with smoother curves
  const animations = useMemo(() => {
    // Overlay: fades out from 0% to 25% scroll (slower reveal)
    const overlayOpacity = Math.max(0, 0.85 - easeOutCubic(Math.min(rawProgress / 0.25, 1)) * 0.85);

    // "I am Vatsav" text: visible from 5% to 40%, fades out as photo moves
    // Extended range and slower fade for better visibility during fast scroll
    let introTextOpacity = 0;
    if (rawProgress > 0.05 && rawProgress < 0.45) {
      if (rawProgress < 0.15) {
        // Fade in from 5% to 15%
        introTextOpacity = easeOutCubic((rawProgress - 0.05) / 0.1);
      } else if (rawProgress < 0.25) {
        // Stay fully visible from 15% to 25%
        introTextOpacity = 1;
      } else {
        // Fade out from 25% to 45%
        introTextOpacity = 1 - easeOutCubic((rawProgress - 0.25) / 0.2);
      }
    }

    // Fade out everything at the end - starts at 90%
    const exitOpacity = rawProgress > 0.9
      ? 1 - easeOutCubic((rawProgress - 0.9) / 0.1)
      : 1;

    // Update target for smooth interpolation
    targetOpacityRef.current = introTextOpacity * exitOpacity;

    // Photo: starts centered, moves right from 15% to 50% scroll
    // Starts at 30% opacity, full at 25% scroll
    const photoOpacity = 0.3 + easeOutCubic(Math.min(rawProgress / 0.25, 1)) * 0.7;
    const photoX = rawProgress > 0.15
      ? easeOutQuart(Math.min((rawProgress - 0.15) / 0.35, 1)) * 220
      : 0;

    // Content: fades in from 30% to 50% scroll (appears as photo moves)
    const contentOpacity = rawProgress > 0.3
      ? easeOutCubic(Math.min((rawProgress - 0.3) / 0.2, 1))
      : 0;
    const contentX = rawProgress > 0.3
      ? -50 + easeOutQuart(Math.min((rawProgress - 0.3) / 0.2, 1)) * 50
      : -50;

    // Scroll hint: fades out as user starts scrolling
    const scrollHintOpacity = Math.max(0, 0.8 - rawProgress * 4);

    return {
      overlayOpacity,
      photoOpacity: photoOpacity * exitOpacity,
      photoX,
      contentOpacity: contentOpacity * exitOpacity,
      contentX,
      scrollHintOpacity,
      exitOpacity,
    };
  }, [rawProgress]);

  // Update navbar name visibility - show VATSAV when content is visible
  useEffect(() => {
    if (rawProgress > 0.45) {
      onIntroComplete?.(true);
    } else {
      onIntroComplete?.(false);
    }
  }, [rawProgress, onIntroComplete]);

  return (
    <section id="intro" className="intro-section">
      <AnimatePresence>
        {isInView && (
          <>
            {/* Dark overlay */}
            <motion.div
              className="intro-section__overlay"
              initial={{ opacity: 0.85 }}
              animate={{ opacity: animations.overlayOpacity }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {/* Photo - Starts centered with "I am Vatsav" above */}
            <motion.div
              className="intro-section__photo-centered"
              initial={{ opacity: 0.3, x: 0 }}
              animate={{
                opacity: animations.photoOpacity,
                x: animations.photoX,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Dynamic greeting text above photo */}
              <motion.p
                className="intro-section__intro-text"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: smoothedIntroOpacity,
                }}
                transition={{ duration: 0.1, ease: "linear" }}
              >
                {greeting}, I'm Srivatsav
              </motion.p>
              <div className="intro-section__photo-frame">
                <img src={profileImage} alt="Vatsav" />
              </div>
            </motion.div>

            {/* Hero content - appears on left as photo moves right */}
            <motion.div
              className="intro-section__content-wrapper"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: animations.contentOpacity,
                x: animations.contentX,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="intro-section__title">Software Engineer</h2>
              <p className="intro-section__subtitle">
                Building Enterprise Solutions & AI-Powered Applications
              </p>
              <p className="intro-section__description">
                Software Engineer at Caterpillar Inc | B.Tech CSE from SRM Institute
              </p>
              <MagneticButton
                className="glass-button glass-button--primary"
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Projects
              </MagneticButton>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              className="intro-section__scroll-hint"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: animations.scrollHintOpacity }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span>Scroll to explore</span>
              <div className="intro-section__scroll-line" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
