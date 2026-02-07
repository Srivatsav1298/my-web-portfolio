import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-text hero-title">Engineer</div>
      <div className="hero-subtitle">Building scalable applications using AI and Data</div>
      <button className="hero-button">Explore my work</button>

      {/* Background and Light Effects */}
      <div className="hero-background"></div>
      <div className="hero-light"></div>
    </section>
  );
};

export default Hero;
