import React from 'react';
import { motion } from 'framer-motion';
import GlassButton from '../ui/GlassButton';
import profileImage from '../../assets/profile.jpg';
import './HeroSection.css';

/**
 * HeroSection - Main landing section with profile photo
 */
export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const scrollToWork = () => {
    const workSection = document.getElementById('projects');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <motion.div
        className="hero-section__wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left side - Content */}
        <div className="hero-section__content">
          <motion.h1
            className="hero-section__title"
            variants={itemVariants}
          >
            Software Engineer
          </motion.h1>

          <motion.p
            className="hero-section__subtitle"
            variants={itemVariants}
          >
            Building systems at the intersection of AI and Data
          </motion.p>

          <motion.p
            className="hero-section__description"
            variants={itemVariants}
          >
            3+ years of experience building scalable applications that solve real-world problems
          </motion.p>

          <motion.div
            className="hero-section__cta"
            variants={itemVariants}
          >
            <GlassButton onClick={scrollToWork} variant="primary">
              View Projects
            </GlassButton>
          </motion.div>
        </div>

        {/* Right side - Profile Photo */}
        <motion.div
          className="hero-section__image-container"
          variants={imageVariants}
        >
          <div className="hero-section__image-wrapper">
            <img
              src={profileImage}
              alt="Profile"
              className="hero-section__image"
            />
            <div className="hero-section__image-glow" />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-section__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span>Scroll</span>
        <div className="hero-section__scroll-line" />
      </motion.div>
    </section>
  );
}
