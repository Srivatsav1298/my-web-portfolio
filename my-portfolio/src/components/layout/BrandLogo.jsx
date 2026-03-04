import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BrandLogo = ({
  layoutId = 'shared-brand-logo',
  className = 'navbar__logo-mark',
  imageClassName = 'navbar__logo-image',
  fallbackClassName = 'navbar__logo-fallback',
  ariaLabel = 'Go to intro',
  href = '#intro',
}) => {
  const [loadFailed, setLoadFailed] = useState(false);
  const logoSrc = `${import.meta.env.BASE_URL}logo.png`;

  return (
    <motion.a
      layoutId={layoutId}
      href={href}
      className={className}
      aria-label={ariaLabel}
      transition={{ type: 'spring', stiffness: 340, damping: 34, mass: 0.75 }}
    >
      {loadFailed ? (
        <span className={fallbackClassName}>VS</span>
      ) : (
        <img
          className={imageClassName}
          src={logoSrc}
          alt="VS logo"
          onError={() => setLoadFailed(true)}
        />
      )}
    </motion.a>
  );
};

export default BrandLogo;
