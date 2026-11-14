"use client";

/**
 * -----------------------------------------------------------------------------
 * Homepage Hero Section
 * -----------------------------------------------------------------------------
 *
 * Premium landing hero for WebsterWork.
 * Optimized for peak performance and minimal JS bundle size.
 *
 * -----------------------------------------------------------------------------
 */

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge, Button } from "@/components/ui";
import { Aurora, Spotlight, GradientBlur } from "@/components/effects";
import { Container } from "@/components/common";

export function HeroSection() {
  return (
    <section
      className="
        relative
        flex
        min-h-screen
        items-center
        overflow-hidden
        px-4
        py-24
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

      {/* Content */}
      <Container className="relative z-10 w-full">
        <div
          className="
            grid
            items-center
            gap-14
            md:gap-16
            lg:grid-cols-2
            lg:gap-20
          "
        >
          {/* Left Column */}
          <div className="min-w-0">
            <Badge className="mb-6 rounded-full px-3 py-1.5 text-xs sm:mb-8 sm:px-4 sm:py-2 sm:text-sm">
              <Sparkles className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              AI Powered Digital Agency
            </Badge>

            <h1
              className="
                max-w-4xl
                text-4xl
                font-black
                tracking-tight
                sm:text-5xl
                md:text-6xl
                xl:text-7xl
              "
            >
              We Build Digital Products That Scale Businesses
            </h1>

            <div className="mt-6 min-h-[2.5rem] text-xl font-semibold text-primary sm:mt-8 sm:min-h-[3rem] sm:text-2xl">
              {/* Typewriter removed for raw static performance */}
            </div>

            <p
              className="
                mt-6
                max-w-2xl
                text-base
                leading-7
                text-muted-foreground
                sm:mt-8
                sm:text-lg
                sm:leading-8
              "
            >
              WebsterWork helps startups, enterprises, and growing businesses
              transform ideas into beautiful, scalable, and high-performance
              digital products using modern technologies and AI-powered
              workflows.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-5">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-6 lg:gap-8">
              <span>✓ Modern Tech Stack</span>
              <span>✓ AI Integrated</span>
              <span>✓ Scalable Architecture</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}