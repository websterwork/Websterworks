// src/app/(marketing)/contact/page.tsx
import type { Metadata } from "next";
import { generateSEO } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { Sparkles } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactPageSections/ContactForm";

export const metadata: Metadata = generateSEO({
  title: `Contact Us | ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name} for digital transformation, AI solutions, web development, and software engineering.`,
  path: "/contact",
  keywords: [
    "Contact Websterwork",
    "Software Agency Contact",
    "Hire Web Developers",
    "AI Consulting Contact",
  ],
});

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground pt-32 pb-24 overflow-hidden">
      {/* Background Decorative Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#181820_1px,transparent_1px),linear-gradient(to_bottom,#181820_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <Container className="relative z-10 space-y-16">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur-md shadow-lg">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                Start a Conversation
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
              Let's Build Something <span className="text-primary">Extraordinary</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Have a project in mind or want to explore how our engineering and creative teams can accelerate your business? Reach out today.
            </p>
          </FadeIn>
        </div>

        {/* Client Contact Form & Socials */}
        <ContactForm />
      </Container>
    </div>
  );
}