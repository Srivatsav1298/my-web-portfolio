import React, { useState, useEffect, useRef } from 'react';
import '../../styles/hud.css';

export default function HUDOverlay({ sections = [] }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id || '');
  const frameRef = useRef(null);
  const lastProgressRef = useRef(-1);
  const lastSectionRef = useRef('');

  useEffect(() => {
    if (typeof window === 'undefined' || sections.length === 0) return undefined;

    const resolveActiveSection = (sectionElements, viewportProbe) => {
      let currentSection = sectionElements[0]?.id || '';

      for (let i = 0; i < sectionElements.length; i += 1) {
        const { id, element } = sectionElements[i];
        if (!element) continue;
        const start = element.offsetTop;
        const end = start + element.offsetHeight;

        if (viewportProbe >= start && viewportProbe < end) {
          currentSection = id;
          break;
        }
      }

      return currentSection;
    };

    const sectionElements = sections.map((section) => ({
      id: section.id,
      element: document.getElementById(section.id),
    }));

    const updateHUD = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll <= 0
        ? 0
        : Math.max(0, Math.min(100, Math.round((scrollY / maxScroll) * 100)));
      const viewportProbe = scrollY + (window.innerHeight * 0.38);
      const currentSection = resolveActiveSection(sectionElements, viewportProbe);

      if (progress !== lastProgressRef.current) {
        setScrollProgress(progress);
        lastProgressRef.current = progress;
      }

      if (currentSection && currentSection !== lastSectionRef.current) {
        setActiveSectionId(currentSection);
        lastSectionRef.current = currentSection;
      }

      frameRef.current = null;
    };

    const requestUpdate = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(updateHUD);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [sections]);

  const activeSection = sections.find((section) => section.id === activeSectionId);
  const activeIndex = sections.findIndex((section) => section.id === activeSectionId);

  return (
    <div className="hud-overlay">
      <div className="hud-progress-meta">
        <span className="hud-label">Section</span>
        <span className="hud-section__name">{activeSection?.name || sections[0]?.name}</span>
        <span className="hud-section__progress">{String(scrollProgress).padStart(2, '0')}%</span>
      </div>

      <div className="hud-progress-bar">
        <div className="hud-progress-bar__markers" aria-hidden="true">
          {sections.map((section, index) => (
            <span
              key={section.id}
              className={`hud-progress-marker ${index <= activeIndex ? 'hud-progress-marker--active' : ''}`}
            />
          ))}
        </div>
        <div
          className="hud-progress-bar__fill"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
}
