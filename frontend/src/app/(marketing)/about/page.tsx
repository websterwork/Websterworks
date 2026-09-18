"use client";

import {
  AboutUsHeader,
  WhoWeAreSection,
  OurMissionSection,
  OurVisionSection,
} from "@/components/sections/AboutPageSections";

export default function AboutPage() {
  return (
    <main className="relative w-full">
      <AboutUsHeader />
      <WhoWeAreSection />
      <OurMissionSection />
      <OurVisionSection />
    </main>
  );
}
