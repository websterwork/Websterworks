"use client";

/**
 * -----------------------------------------------------------------------------
 * Homepage CTA Section
 * -----------------------------------------------------------------------------
 *
 * Final high-converting Call To Action section matching the void design system.
 *
 * -----------------------------------------------------------------------------
 */

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, MessageSquare } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Aurora, Spotlight, GradientBlur } from "@/components/effects";
import { FadeIn, Reveal, Magnetic } from "@/components/animations";
import { Container } from "@/components/common";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-32 text-foreground">
      {/* Background Effects */}
      <Aurora />
      <Spotlight />
      <GradientBlur />

      <Container className="relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card/40 p-10 backdrop-blur-2xl md:p-16 lg:p-20">
          {/* Internal Glow Overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 size-96 opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(152,16,250,0.4) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <Reveal>
              <Badge className="mb-6 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-md">
                <Sparkles className="mr-2 size-3.5" /> Start Your Evolution
              </Badge>
            </Reveal>

            <h2 className="text-4xl font-black tracking-tight sm:text-6xl md:text-7xl">
              Ready to Build Something Extraordinary?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Partner with WebsterWork to build scalable web applications, 3D
              WebGL engines, and AI-powered digital systems tailored for
              high-growth enterprises.
            </p>

            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
                <Magnetic>
                  <Button
                    asChild
                    size="lg"
                    className="h-14 rounded-2xl bg-[#9810fa] px-8 text-base font-bold text-white transition-all duration-300 hover:bg-[#b042ff] hover:shadow-[0_0_30px_rgba(152,16,250,0.6)]"
                  >
                    <Link href="/contact">
                      Schedule Consultation
                      <ArrowRight className="ml-2.5 size-5" />
                    </Link>
                  </Button>
                </Magnetic>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-2xl border border-primary/30 bg-background/50 px-8 text-base font-bold text-foreground backdrop-blur-md hover:border-primary hover:bg-primary/10"
                >
                  <Link href="/portfolio">
                    <MessageSquare className="mr-2.5 size-5 text-primary" />
                    Explore Our Work
                  </Link>
                </Button>
              </div>
            </FadeIn>

            {/* Feature Checkmarks */}
            <FadeIn delay={0.5}>
              <div className="mt-12 flex flex-wrap justify-center gap-8 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="text-[#9810fa]">✓</span> Rapid AI Integration
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[#9810fa]">✓</span> Scalable Cloud
                  Systems
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[#9810fa]">✓</span> High-Performance
                  WebGL
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
