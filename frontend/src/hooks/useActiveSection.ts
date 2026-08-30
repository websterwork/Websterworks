"use client";

/**
 * -----------------------------------------------------------------------------
 * useActiveSection
 * -----------------------------------------------------------------------------
 *
 * Generic hook for tracking the currently visible section.
 *
 * Features
 * • Intersection Observer
 * • Active section detection
 * • Smooth scroll helper
 * • Reusable across the application
 *
 * -----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";

export interface SectionItem {
  id: string;
}

interface UseActiveSectionProps {
  sections: SectionItem[];

  rootMargin?: string;

  threshold?: number;
}

export function useActiveSection({
  sections,

  rootMargin = "-40% 0px -40% 0px",

  threshold = 0.2,
}: UseActiveSectionProps) {
  const [activeSection, setActiveSection] = useState(
    sections[0]?.id ?? "",
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(
          (entry) => entry.isIntersecting,
        );

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        root: null,

        rootMargin,

        threshold,
      },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections, rootMargin, threshold]);

  /**
   * ---------------------------------------------------------------------------
   * Scroll To Section
   * ---------------------------------------------------------------------------
   */

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return {
    activeSection,

    scrollToSection,
  };
}