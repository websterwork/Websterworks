// src/providers/ThemeProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "dark" | "light";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    // Use saved theme, system preference, or default to dark
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: ThemeMode) => {
    // Remove both classes
    document.documentElement.classList.remove("light", "dark");
    // Add the new theme class
    document.documentElement.classList.add(newTheme);
  };

  const handleSetTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    handleSetTheme(newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme: handleSetTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
