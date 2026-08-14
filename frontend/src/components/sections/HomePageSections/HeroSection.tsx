"use client";

/**
 * -----------------------------------------------------------------------------
 * Homepage Hero Section
 * -----------------------------------------------------------------------------
 *
 * Premium landing hero for WebsterWork.
 *
 * -----------------------------------------------------------------------------
 */

import Link from "next/link";

import { ArrowRight, Sparkles } from "lucide-react";

import { Badge, Button } from "@/components/ui";

import { Aurora, Spotlight, GradientBlur } from "@/components/effects";

import {
  FadeIn,
  Reveal,
  SplitText,
  Typewriter,
  Floating,
  Magnetic,
} from "@/components/animations";

import { Container } from "@/components/common";

import { LogoViewer } from "@/components/threeD";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Background Effects */}

      <Aurora />

      <Spotlight />

      <GradientBlur />

      {/* Content */}

      <Container className="relative z-10">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left */}

          <div>
            <Reveal>
              <Badge className="mb-8 rounded-full px-4 py-2">
                <Sparkles className="mr-2 h-4 w-4" />
                AI Powered Digital Agency
              </Badge>
            </Reveal>

            <SplitText className="max-w-4xl text-5xl font-black tracking-tight md:text-6xl xl:text-7xl">
              We Build Digital Products That Scale Businesses
            </SplitText>

            <FadeIn delay={0.4}>
              <div className="mt-8 text-2xl font-semibold text-primary">
                <Typewriter
                  words={[
                    "Web Applications",
                    "Mobile Apps",
                    "AI Solutions",
                    "Cloud Platforms",
                    "SaaS Products",
                  ]}
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
                WebsterWork helps startups, enterprises, and growing businesses
                transform ideas into beautiful, scalable, and high-performance
                digital products using modern technologies and AI-powered
                workflows.
              </p>
            </FadeIn>

            <FadeIn delay={0.8}>
              <div className="mt-10 flex flex-wrap gap-5">
                <Magnetic>
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Start Your Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Magnetic>

                <Button asChild size="lg" variant="outline">
                  <Link href="/portfolio">View Portfolio</Link>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={1}>
              <div className="mt-12 flex flex-wrap gap-8 text-sm text-muted-foreground">
                <span>✓ Modern Tech Stack</span>

                <span>✓ AI Integrated</span>

                <span>✓ Scalable Architecture</span>
              </div>
            </FadeIn>
          </div>

          {/* Right */}

          <Floating>
            <div className="relative mx-auto aspect-square w-full max-w-xl">
              <LogoViewer
                model="individual"
                animation="explode"
                className="h-full w-full"
              />
            </div>
          </Floating>
        </div>
      </Container>
    </section>
  );
}
