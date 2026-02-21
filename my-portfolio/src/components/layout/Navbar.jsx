import React, { forwardRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, FileText, Sun, Moon, Languages } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/glass.css';
import './navbar.css';

const Navbar = forwardRef(({ showName = false }, ref) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme, isAutoTheme, resetToAutoTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

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
          VATSAV
        </motion.span>
      </div>

      <nav className="navbar__links">
        <a href="#about">{t('nav.about')}</a>
        <a href="#projects">{t('nav.work')}</a>
        <a href="#skills">{t('nav.skills')}</a>
        <a href="#contact">{t('nav.contact')}</a>
      </nav>

      <div className="navbar__icons">
        {/* Resume Download */}
        <a
          href="/my-web-portfolio/resume.pdf"
          download="Vatsav_Saravanan_Resume.pdf"
          title="Download Resume"
          className="navbar__icon navbar__resume"
        >
          <FileText size={18} />
        </a>

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
        {/* Language toggle */}
        <button
          onClick={toggleLanguage}
          title={language === 'en' ? 'Slipp til Norsk' : 'Switch to English'}
          className="navbar__icon navbar__language-toggle"
        >
          <div className="navbar__language-content">
            <Languages size={18} />
            <span className="navbar__language-code">{language.toUpperCase()}</span>
          </div>
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
