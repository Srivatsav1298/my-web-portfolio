import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for tracking scroll progress within a container
 * @param {React.RefObject} containerRef - Reference to the scroll container
 * @returns {Object} - { progress: 0-1, scrollY: pixels }
 */
export const useScrollProgress = (containerRef) => {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    if (!containerRef?.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const containerHeight = container.offsetHeight - window.innerHeight;

    const scrolled = window.scrollY - containerTop;
    const newProgress = Math.max(0, Math.min(1, scrolled / containerHeight));

    setProgress(newProgress);
    setScrollY(window.scrollY);
  }, [containerRef]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { progress, scrollY };
};

export default useScrollProgress;
