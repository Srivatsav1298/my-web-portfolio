import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/hud.css';

/**
 * Tesla-style HUD Overlay
 * Shows scroll progress and current section in corners
 */
export default function HUDOverlay({ sections = [] }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('intro');

  // Track scroll progress and current section
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.round((scrollY / docHeight) * 100) || 0;

    setScrollProgress(progress);

    // Determine current section
    const viewportMiddle = scrollY + window.innerHeight / 2;

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementBottom = elementTop + element.offsetHeight;

        if (viewportMiddle >= elementTop && viewportMiddle < elementBottom) {
          setCurrentSection(section.name);
          break;
        }
      }
    }
  }, [sections]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="hud-overlay">
      {/* Top Right - Section & Scroll Progress */}
      <div className="hud-corner hud-corner--tr">
        <div className="hud-section">
          <span className="hud-text hud-section__name">
            {currentSection}
          </span>
          <span className="hud-text hud-section__progress">
            scroll {scrollProgress}%
          </span>
        </div>
      </div>

      {/* Bottom Left - Status */}
      <div className="hud-corner hud-corner--bl">
        <div className="hud-status hud-text">
          <span className="hud-status__dot" />
          <span>status: online</span>
        </div>
      </div>
    </div>
  );
}
