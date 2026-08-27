import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  ambientIntensity: 1.2,
});

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false); // Light mode default

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  // Sync 3D ambient light intensity with theme
  const ambientIntensity = isDark ? 0.4 : 1.2;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, ambientIntensity }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
