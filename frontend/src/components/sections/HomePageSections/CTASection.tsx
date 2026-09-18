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

import Link from "next/link";

import { ArrowRight, Sparkles, MessageSquare } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Aurora, Spotlight, GradientBlur } from "@/components/effects";

import { FadeIn, Reveal, Magnetic } from "@/components/animations";

import { Container } from "@/components/common";

export function CTASection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        px-4
        py-24
        text-foreground
        sm:px-6
        sm:py-28
        lg:px-10
        lg:py-32
      "
    >
      {/* Background Effects */}

      <Aurora />
      <Spotlight />
      <GradientBlur />

      <Container className="relative z-10">
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-primary/30
            bg-card/40
            p-6
            backdrop-blur-2xl
            sm:p-10
            md:p-16
            lg:p-20
          "
        >
          {/* Internal Glow Overlay */}

          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 size-72 opacity-40 sm:-right-20 sm:-top-20 sm:size-96"
            style={{
              background:
                "radial-gradient(circle, rgba(152,16,250,0.4) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <Reveal>
              <Badge className="mb-5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary backdrop-blur-md sm:mb-6 sm:px-4 sm:py-2 sm:text-xs">
                <Sparkles className="mr-2 size-3" />
                Start Your Evolution
              </Badge>
            </Reveal>

            <h2
              className="
                text-3xl
                font-black
                leading-tight
                tracking-tight
                sm:text-4xl
                md:text-6xl
                lg:text-7xl
              "
            >
              Ready to Build Something Extraordinary?
            </h2>

            <p
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-sm
                leading-7
                text-muted-foreground
                sm:mt-6
                sm:text-base
                sm:leading-8
                md:text-lg
              "
            >
              Partner with WebsterWork to build scalable web applications, 3D
              WebGL engines, and AI-powered digital systems tailored for
              high-growth enterprises.
            </p>

            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                <Magnetic>
                  <Button
                    asChild
                    size="lg"
                    className="
                      h-13
                      w-full
                      rounded-2xl
                      bg-[#9810fa]
                      px-7
                      text-sm
                      font-bold
                      text-white
                      transition-all
                      duration-300
                      hover:bg-[#b042ff]
                      hover:shadow-[0_0_30px_rgba(152,16,250,0.6)]
                      sm:h-14
                      sm:w-auto
                      sm:px-8
                      sm:text-base
                    "
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
                  className="
                    h-13
                    w-full
                    rounded-2xl
                    border
                    border-primary/30
                    bg-background/50
                    px-7
                    text-sm
                    font-bold
                    text-foreground
                    backdrop-blur-md
                    hover:border-primary
                    hover:bg-primary/10
                    sm:h-14
                    sm:w-auto
                    sm:px-8
                    sm:text-base
                  "
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
              <div
                className="
                  mt-10
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-4
                  font-mono
                  text-[10px]
                  text-muted-foreground
                  sm:mt-12
                  sm:flex-row
                  sm:flex-wrap
                  sm:gap-6
                  sm:text-xs
                  md:gap-8
                "
              >
                <span className="flex items-center gap-2">
                  <span className="text-[#9810fa]">✓</span>
                  Rapid AI Integration
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-[#9810fa]">✓</span>
                  Scalable Cloud Systems
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-[#9810fa]">✓</span>
                  High-Performance WebGL
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
