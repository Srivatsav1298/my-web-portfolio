import React, { forwardRef } from 'react';

const HeroContent = forwardRef(({ className = '' }, ref) => {
  return (
    <div ref={ref} className={`hero-content ${className}`}>
      <h1 className="hero-content__title">Engineer</h1>
      <p className="hero-content__subtitle">
        Building scalable applications using{' '}
        <span className="metallic-text">AI</span> and{' '}
        <span className="metallic-text">Data</span>
      </p>
      <button className="hero-content__cta">Explore my work</button>
    </div>
  );
});

HeroContent.displayName = 'HeroContent';

export default HeroContent;
