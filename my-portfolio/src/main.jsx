import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './app/App.jsx'
import './styles/globals.css'

// Mark start time as early as possible for accurate load measurement
window.__APP_START_TIME__ = performance.now();

// Register GSAP plugins before rendering
gsap.registerPlugin(ScrollTrigger)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
