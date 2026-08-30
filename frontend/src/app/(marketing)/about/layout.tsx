"use client";

/**
 * -----------------------------------------------------------------------------
 * About Layout
 * -----------------------------------------------------------------------------
 *
 * Shared layout for the About page.
 *
 * Responsibilities
 * • Progress Navigation
 * • Active Section Tracking
 * • Page Wrapper
 *
 * -----------------------------------------------------------------------------
 */

import type { ReactNode } from "react";

import { ProgressNavigation } from "@/components/common/ProgressNavigation";

import { useActiveSection } from "@/hooks/useActiveSection";

const sections = [
  {
    id: "about-header",
    title: "About",
  },
  {
    id: "who-we-are",
    title: "Who We Are",
  },
  {
    id: "our-mission",
    title: "Mission",
  },
  {
    id: "our-vision",
    title: "Vision",
  },
];

interface AboutLayoutProps {
  children: ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  const { activeSection, scrollToSection } = useActiveSection({
    sections,
  });

  return (
    <>
      <ProgressNavigation
        sections={sections}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {children}
    </>
  );
}
