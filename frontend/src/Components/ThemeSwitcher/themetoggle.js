// components/ThemeToggle.js
"use client";

import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    
    try {
      localStorage.setItem('darkMode', newMode);
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  };

  // Initialize theme on client-side only
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialMode = savedMode !== null 
      ? savedMode === 'true' 
      : systemPrefersDark;
    
    setDarkMode(initialMode);
    document.documentElement.classList.toggle('dark', initialMode);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <FaSun className="text-yellow-400 w-5 h-5" />
      ) : (
        <FaMoon className="text-gray-600 w-5 h-5" />
      )}
    </button>
  );
}