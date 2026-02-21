import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Context
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';

// Light components (load immediately)
import CursorTrail from '../components/CursorTrail';
import Navbar from '../components/layout/Navbar';
import HUDOverlay from '../components/layout/HUDOverlay';
import LoadTimeIndicator from '../components/LoadTimeIndicator';

// Sections (load immediately - they're text-based)
import IntroAnimation from '../components/sections/IntroAnimation';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Contact from '../components/sections/Contact';

// Heavy components (lazy load)
const ConstellationCanvas = lazy(() => import('../canvas/ConstellationCanvas'));
const AIChatAssistant = lazy(() => import('../components/AIChatAssistant'));

// Styles
import '../styles/globals.css';
import '../styles/theme.css';
import '../styles/layout.css';
import '../styles/glass.css';
import '../styles/hud.css';
import '../styles/utilities.css';
import '../styles/sections.css';

// Section definitions for HUD
const sections = [
  { id: 'intro', name: 'intro' },
  { id: 'about', name: 'about' },
  { id: 'projects', name: 'work' },
  { id: 'skills', name: 'skills' },
  { id: 'contact', name: 'contact' },
];

// Simple fallback for canvas while loading
const CanvasFallback = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      background: 'radial-gradient(ellipse 80% 50% at 50% 0%, #1a1a1a 0%, #0d0d0d 40%, #050505 70%, #000000 100%)',
    }}
  />
);

const App = () => {
  const [showNavName, setShowNavName] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="app">
            {/* Load Time Indicator - top left */}
            <LoadTimeIndicator />

            {/* Cursor Trail Effect */}
            <CursorTrail />

            {/* Layer 0: Constellation Background (lazy loaded) */}
            <Suspense fallback={<CanvasFallback />}>
              <ConstellationCanvas />
            </Suspense>

            {/* Layer 1: HUD Overlay (fixed, z-index: 100) */}
            <HUDOverlay sections={sections} />

            {/* Layer 2: Navbar (fixed, z-index: 200) */}
            <Navbar showName={showNavName} />

            {/* Layer 3: Scrollable Content (z-index: 10) */}
            <main className="main-content">
              <IntroAnimation onIntroComplete={setShowNavName} />
              <About />
              <Projects />
              <Skills />
              <Contact />
            </main>

            {/* AI Chat Assistant (lazy loaded) */}
            <Suspense fallback={null}>
              <AIChatAssistant />
            </Suspense>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
