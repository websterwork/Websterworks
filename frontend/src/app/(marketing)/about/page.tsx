"use client";

/**
 * -----------------------------------------------------------------------------
 * About Page
 * -----------------------------------------------------------------------------
 *
 * Websterwork company story.
 *
 * -----------------------------------------------------------------------------
 */

import {
  AboutUsHeader,
  WhoWeAreSection,
  OurMissionSection,
  OurVisionSection,
} from "@/components/sections/AboutPageSections";

export default function AboutPage() {
  return (
    <main
      className="
        relative
        h-screen
        snap-y
        snap-mandatory
        overflow-y-auto
        overflow-x-hidden
        scroll-smooth
      "
    >
      <AboutUsHeader />

      <WhoWeAreSection />

      <OurMissionSection />

      <OurVisionSection />
    </main>
  );
}