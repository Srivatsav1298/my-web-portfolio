import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

/**
 * Get time-based theme and greeting
 */
function getTimeBasedInfo() {
  const hour = new Date().getHours();

  let greeting, timeOfDay, isDark;

  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning';
    timeOfDay = 'morning';
    isDark = false; // Light mode
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good afternoon';
    timeOfDay = 'afternoon';
    isDark = false; // Light mode
  } else if (hour >= 17 && hour < 21) {
    greeting = 'Good evening';
    timeOfDay = 'evening';
    isDark = true; // Dark mode
  } else {
    greeting = 'Good night';
    timeOfDay = 'night';
    isDark = true; // Dark mode
  }

  return { greeting, timeOfDay, isDark, hour };
}

export function ThemeProvider({ children }) {
  const [timeInfo, setTimeInfo] = useState(getTimeBasedInfo);
  const [theme, setTheme] = useState(timeInfo.isDark ? 'dark' : 'light');
  const [isAutoTheme, setIsAutoTheme] = useState(true);

  // Update time info periodically
  useEffect(() => {
    const updateTimeInfo = () => {
      const newInfo = getTimeBasedInfo();
      setTimeInfo(newInfo);

      // Auto-update theme if auto mode is enabled
      if (isAutoTheme) {
        setTheme(newInfo.isDark ? 'dark' : 'light');
      }
    };

    // Update every minute
    const interval = setInterval(updateTimeInfo, 60000);
    updateTimeInfo();

    return () => clearInterval(interval);
  }, [isAutoTheme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'light') {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
    } else {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    }
  }, [theme]);

  // Manual theme toggle
  const toggleTheme = useCallback(() => {
    setIsAutoTheme(false);
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  // Reset to auto theme
  const resetToAutoTheme = useCallback(() => {
    setIsAutoTheme(true);
    const info = getTimeBasedInfo();
    setTheme(info.isDark ? 'dark' : 'light');
  }, []);

  const [isDatasheet, setIsDatasheet] = useState(() => {
    return localStorage.getItem('isDatasheet') === 'true';
  });

  const toggleDatasheet = useCallback(() => {
    setIsDatasheet(prev => {
      const newVal = !prev;
      localStorage.setItem('isDatasheet', newVal);
      return newVal;
    });
  }, []);

  useEffect(() => {
    if (isDatasheet) {
      document.body.classList.add('datasheet-mode');
    } else {
      document.body.classList.remove('datasheet-mode');
    }
  }, [isDatasheet]);

  const value = {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isAutoTheme,
    isDatasheet,
    greeting: timeInfo.greeting,
    timeOfDay: timeInfo.timeOfDay,
    hour: timeInfo.hour,
    toggleTheme,
    resetToAutoTheme,
    setTheme,
    toggleDatasheet,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
