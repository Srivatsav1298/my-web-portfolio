import React from 'react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__identity">
          <span className="site-footer__name">Vatsav Saravanan</span>
          <span className="site-footer__role">AI Engineer</span>
        </div>

        <nav className="site-footer__links" aria-label="Social links">
          <a href="https://github.com/Srivatsav1298" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/srivatsav-s" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:srivatsavsaravanan@gmail.com">Email</a>
        </nav>

        <p className="site-footer__copy">© {year} Vatsav Saravanan</p>
      </div>
    </footer>
  );
}
