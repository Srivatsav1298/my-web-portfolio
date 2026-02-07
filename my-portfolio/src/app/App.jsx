import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Context
import { ThemeProvider } from '../context/ThemeContext';

// Components
import LoadingScreen from '../components/LoadingScreen';
import AIChatAssistant from '../components/AIChatAssistant';
import CursorTrail from '../components/CursorTrail';

// Canvas
import ConstellationCanvas from '../canvas/ConstellationCanvas';

// Layout
import Navbar from '../components/layout/Navbar';
import HUDOverlay from '../components/layout/HUDOverlay';

// Sections
import IntroAnimation from '../components/sections/IntroAnimation';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Contact from '../components/sections/Contact';

// Styles
import '../styles/globals.css';
import '../styles/theme.css';
import '../styles/layout.css';
import '../styles/glass.css';
import '../styles/hud.css';
import '../styles/sections.css';

// Section definitions for HUD
const sections = [
  { id: 'intro', name: 'intro' },
  { id: 'about', name: 'about' },
  { id: 'projects', name: 'work' },
  { id: 'skills', name: 'skills' },
  { id: 'contact', name: 'contact' },
];

const App = () => {
  const [showNavName, setShowNavName] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          {/* Loading Screen */}
          {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}

          {/* Cursor Trail Effect */}
          <CursorTrail />

          {/* Layer 0: Constellation Background (fixed, z-index: 0) */}
          <ConstellationCanvas />

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

          {/* AI Chat Assistant */}
          <AIChatAssistant />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
