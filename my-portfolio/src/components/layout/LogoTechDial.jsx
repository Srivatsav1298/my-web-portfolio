import React from 'react';

/**
 * Concept 03 - S Tech Dial
 * Minimal premium circular mark with restrained green pulse.
 */
export default function LogoTechDial() {
  return (
    <span className="logo-tech-dial" aria-hidden="true">
      <span className="logo-tech-dial__ring logo-tech-dial__ring--outer" />
      <span className="logo-tech-dial__ring logo-tech-dial__ring--inner" />
      <span className="logo-tech-dial__tick logo-tech-dial__tick--g" />
      <span className="logo-tech-dial__tick" />
      <span className="logo-tech-dial__tick logo-tech-dial__tick--g" />
      <span className="logo-tech-dial__tick" />
      <span className="logo-tech-dial__pulse" />
      <span className="logo-tech-dial__core">
        <span className="logo-tech-dial__glyph logo-tech-dial__glyph--s">S</span>
        <span className="logo-tech-dial__glyph logo-tech-dial__glyph--v">V</span>
      </span>
    </span>
  );
}
