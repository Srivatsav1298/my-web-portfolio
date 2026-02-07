import React, { forwardRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, FileText, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/glass.css';
import './navbar.css';

const Navbar = forwardRef(({ showName = false }, ref) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme, isAutoTheme, resetToAutoTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`navbar glass-navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
      style={{
        opacity: isScrolled ? 1 : 0.7,
      }}
    >
      <div className="navbar__logo" ref={ref}>
        <motion.span
          className="navbar__logo-text"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: showName ? 1 : 0,
            scale: showName ? 1 : 0.8,
          }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          SRIVATSAV
        </motion.span>
      </div>

      <nav className="navbar__links">
        <a href="#about">About</a>
        <a href="#projects">Work</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="navbar__icons">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          onDoubleClick={resetToAutoTheme}
          title={isAutoTheme ? `Auto theme (${isDark ? 'dark' : 'light'})` : `${isDark ? 'Dark' : 'Light'} mode - double-click for auto`}
          className="navbar__icon navbar__theme-toggle"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isDark ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
          </motion.div>
          {isAutoTheme && <span className="navbar__auto-indicator" />}
        </button>
        <a href="https://linkedin.com/in/srivatsav-saravanan" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="navbar__icon">
          <Linkedin size={18} />
        </a>
        <a href="https://github.com/Srivatsav1298" target="_blank" rel="noopener noreferrer" title="GitHub" className="navbar__icon">
          <Github size={18} />
        </a>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
