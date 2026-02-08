import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadTimeIndicator.css';

/**
 * LoadTimeIndicator - Shows page load time in milliseconds
 * Displayed in the top-left corner of the page
 */
export default function LoadTimeIndicator() {
  const [loadTime, setLoadTime] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const hasCalculated = useRef(false);

  useEffect(() => {
    // Only calculate once
    if (hasCalculated.current) return;
    hasCalculated.current = true;

    // Use requestIdleCallback or immediate calculation
    const calculateLoadTime = () => {
      const endTime = performance.now();

      // Use our app start time if available (most accurate for React render time)
      const startTime = window.__APP_START_TIME__ || 0;
      const reactRenderTime = Math.round(endTime - startTime);

      // Also check Navigation Timing API for full page load
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        if (timing.domContentLoadedEventEnd > 0 && timing.navigationStart > 0) {
          const fullLoadTime = timing.domContentLoadedEventEnd - timing.navigationStart;
          // Use whichever is more meaningful
          setLoadTime(Math.max(reactRenderTime, Math.round(fullLoadTime)));
          return;
        }
      }

      setLoadTime(reactRenderTime);
    };

    // Calculate after React has finished rendering
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        calculateLoadTime();
      });
    });
  }, []);

  // Auto-hide after 10 seconds
  useEffect(() => {
    if (loadTime !== null) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
      return () => clearTimeout(hideTimer);
    }
  }, [loadTime]);

  // Get color based on load time
  const getLoadTimeColor = (ms) => {
    if (ms < 500) return '#4ade80'; // Green - excellent
    if (ms < 1000) return '#a3e635'; // Lime - good
    if (ms < 2000) return '#fbbf24'; // Yellow - acceptable
    return '#f87171'; // Red - slow
  };

  // Get performance label
  const getPerformanceLabel = (ms) => {
    if (ms < 500) return 'INSTANT';
    if (ms < 1000) return 'FAST';
    if (ms < 2000) return 'GOOD';
    return 'LOADING';
  };

  if (loadTime === null) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="load-time-indicator"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="load-time-indicator__content">
            <span className="load-time-indicator__label">
              {getPerformanceLabel(loadTime)}
            </span>
            <span
              className="load-time-indicator__time"
              style={{ color: getLoadTimeColor(loadTime) }}
            >
              {loadTime}ms
            </span>
          </div>
          <div className="load-time-indicator__bar">
            <motion.div
              className="load-time-indicator__fill"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                backgroundColor: getLoadTimeColor(loadTime),
                transformOrigin: 'left',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
