import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const isDarkCurrent = document.documentElement.classList.contains('dark');
    setIsDark(isDarkCurrent);
  }, []);

  const toggleTheme = (): void => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Conmutar tema de pantalla"
      className="pixel-btn px-3 py-1 bg-[#1c1c1e] text-[#F2C94C] flex items-center gap-2 text-xs font-mono"
    >
      <Icon 
        icon={isDark ? 'pixelarticons:sun' : 'pixelarticons:moon'} 
        width="18" 
        height="18" 
      />
      <span>{isDark ? 'MODO CLARO' : 'MODO OSCURO'}</span>
    </button>
  );
};

export default ThemeToggle;
