// src/components/ThemeSwitcher.js
import React from 'react';
import { useTheme } from '../theme';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <button 
        onClick={() => toggleTheme('light')}
        className={theme === 'light' ? 'active' : ''}
      >
        Light
      </button>
      <button 
        onClick={() => toggleTheme('dark')}
        className={theme === 'dark' ? 'active' : ''}
      >
        Dark
      </button>
      <button 
        onClick={() => toggleTheme('night')}
        className={theme === 'night' ? 'active' : ''}
      >
        Night
      </button>
    </div>
  );
};

export default ThemeSwitcher;