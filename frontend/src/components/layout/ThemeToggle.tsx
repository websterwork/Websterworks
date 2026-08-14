// src/components/layout/ThemeToggle.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "flex",
        "h-9",
        "w-9",
        "items-center",
        "justify-center",
        "rounded-lg",
        "border",
        "border-border",
        "bg-background",
        "text-foreground",
        "transition",
        "hover:bg-accent",
        "hover:text-accent-foreground",
      )}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
