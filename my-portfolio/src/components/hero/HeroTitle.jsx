import React, { forwardRef } from 'react';

const HeroTitle = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="hero-title">
      VATSAV
    </div>
  );
});

HeroTitle.displayName = 'HeroTitle';

export default HeroTitle;
