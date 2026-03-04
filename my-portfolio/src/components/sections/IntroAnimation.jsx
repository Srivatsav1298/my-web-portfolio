import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import profileImage from '../../assets/profile.jpg';
import ArmoredPortrait from '../ui/ArmoredPortrait';
import BrandLogo from '../layout/BrandLogo';
import './IntroAnimation.css';

/**
 * IntroAnimation - Split Layout Hero
 * Content on left, profile picture on right, exits on scroll
 */
export default function IntroAnimation({ onIntroComplete, onLogoDockChange }) {
  const { timeOfDay } = useTheme();
  const { language, t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(1);
  const [isInView, setIsInView] = useState(true);
  const shouldReduceMotion = useReducedMotion();

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

  // Calculate scroll progress (gentle fade - 1x viewport)
  const rawProgress = Math.min(scrollY / windowHeight, 1);
  const isLogoDocked = rawProgress >= 0.32;

  // Animation values - softer, more gradual
  const animations = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        contentOpacity: 1,
        contentY: 0,
        scrollHintOpacity: 1,
        profileY: 0,
        profileScale: 1,
      };
    }

    // Content fades out gradually as user scrolls past 50%
    const contentOpacity = rawProgress < 0.5
      ? 1
      : 1 - ((rawProgress - 0.5) * 1.5);

    const contentY = rawProgress > 0.3
      ? -((rawProgress - 0.3) * 50)
      : 0;

    // Scroll indicator fades out quickly
    const scrollHintOpacity = Math.max(0, 1 - rawProgress * 2);
    const profileY = rawProgress * -22;
    const profileScale = 1 - (rawProgress * 0.04);

    return {
      contentOpacity: Math.max(0, contentOpacity),
      contentY,
      scrollHintOpacity,
      profileY,
      profileScale,
    };
  }, [rawProgress, shouldReduceMotion]);

  // Update navbar name visibility
  useEffect(() => {
    if (rawProgress > 0.5) {
      onIntroComplete?.(true);
    } else {
      onIntroComplete?.(false);
    }
  }, [rawProgress, onIntroComplete]);

  useEffect(() => {
    onLogoDockChange?.(isLogoDocked);
  }, [isLogoDocked, onLogoDockChange]);

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
                <AnimatePresence initial={false}>
                  {!isLogoDocked && (
                    <motion.div
                      key="intro-logo"
                      className="intro-section__logo-slot"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <BrandLogo
                        layoutId="shared-brand-logo"
                        className="navbar__logo-mark intro-section__logo-mark"
                        imageClassName="navbar__logo-image intro-section__logo-image"
                        fallbackClassName="navbar__logo-fallback intro-section__logo-fallback"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Greeting */}
                <motion.p
                  className="intro-section__greeting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {language === 'en' ? `${t(`intro.greeting.${timeOfDay}`)}, I'm` : `${t(`intro.greeting.${timeOfDay}`)}, jeg er`}
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
                  {t('intro.role')}
                </motion.p>

                {/* Tagline */}
                <motion.p
                  className="intro-section__tagline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  {t('intro.tagline')}
                </motion.p>

                {/* Fun Fact - Chocolate */}
                <motion.p
                  className="intro-section__chocolate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {t('intro.chocolate')}
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
                    <span className="intro-section__stat-label">{t('intro.yearsExp')}</span>
                  </div>
                  <div className="intro-section__stat">
                    <span className="intro-section__stat-value">AI</span>
                    <span className="intro-section__stat-label">{t('intro.aiData')}</span>
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
                    {t('intro.viewWork')}
                  </button>
                  <button
                    className="intro-section__cta-secondary"
                    onClick={scrollToContact}
                  >
                    {t('intro.getInTouch')}
                  </button>
                </motion.div>
              </div>

              {/* Right side - Profile Picture */}
              <div
                className="intro-section__profile-parallax"
                style={{
                  transform: `translate3d(0, ${animations.profileY}px, 0) scale(${animations.profileScale})`,
                }}
              >
                <motion.div
                  className="intro-section__profile"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  style={{ perspective: '1200px' }}
                >
                  <ArmoredPortrait imageSrc={profileImage} />
                </motion.div>
              </div>
            </motion.div>

            {/* Scroll indicator - Neural vertical cue (scroll to top) */}
            <motion.button
              type="button"
              className="intro-section__scroll-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: animations.scrollHintOpacity }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 1.4 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label={t('intro.scrollTop')}
            >
              <motion.div
                className="intro-section__scroll-arrow"
                animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronUp size={24} strokeWidth={1.7} />
              </motion.div>
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
