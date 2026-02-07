import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for tracking mouse position
 * Used for star brightness interaction
 * @returns {Object} - { x, y, normalizedX, normalizedY }
 */
export const useMousePosition = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const handleMouseMove = useCallback((event) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    setPosition({
      x: clientX,
      y: clientY,
      normalizedX: (clientX / innerWidth) * 2 - 1,
      normalizedY: -(clientY / innerHeight) * 2 + 1,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return position;
};

export default useMousePosition;
