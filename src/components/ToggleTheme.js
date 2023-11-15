import React from 'react';
import { useTheme } from './ThemeContext';
const ToggleTheme = () => {
   const { toggleTheme } = useTheme();

   return (
      <button onClick={toggleTheme} className="theme-toggle-button">
         Toggle Theme
      </button>
   );
};

export default ToggleTheme;
