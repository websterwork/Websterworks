// src/app/page.tsx
import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { generateSEO } from "@/config/seo";
import { StructuredData } from "@/lib/seo/structured-data";
import { webpageSchema } from "@/lib/seo/jsonld";

import { HeroSection } from "@/components/sections/HomePageSections/HeroSection";
import { TechnologiesSection } from "@/components/sections/HomePageSections/TechnologiesSection";
import { ServiceSection } from "@/components/sections/HomePageSections/ServiceSection";
import { CompaniesSection } from "@/components/sections/HomePageSections/CompaniesSection";
import { WhyChooseUsSection } from "@/components/sections/HomePageSections/WhyChooseUsSection";
import { AboutUsSection } from "@/components/sections/HomePageSections/AboutUsSection";
import { IndustriesSection } from "@/components/sections/HomePageSections/IndustriesSection";
import { PortfolioSection } from "@/components/sections/HomePageSections/PortfolioSection";
import { TestimonialSection } from "@/components/sections/HomePageSections/TestemonialSection";
import { CTASection } from "@/components/sections/HomePageSections/CTASection";

/* -------------------------------------------------------------------------- */
/* Page Metadata                                                              */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = generateSEO({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  keywords: [
    "Web Development Agency",
    "AI Powered Digital Agency",
    "Next.js Development",
    "Custom Web Applications",
    "Software Development Lahore",
  ],
});

/* -------------------------------------------------------------------------- */
/* Page Component                                                             */
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      {/* Homepage-specific WebPage Schema */}
      <StructuredData
        data={webpageSchema({
          title: siteConfig.title,
          description: siteConfig.description,
          url: "/",
        })}
      />

      {/* Page Sections */}
      <HeroSection />
      <TechnologiesSection />
      <ServiceSection />
      <CompaniesSection />
      <WhyChooseUsSection />
      <AboutUsSection />
      <IndustriesSection />
      <PortfolioSection />
      <TestimonialSection />
      <CTASection />
    </>
  );
}
