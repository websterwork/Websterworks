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
import dynamic from "next/dynamic";
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

// // Dynamic import for LogoViewer - defers heavy Three.js / WebGL bundle from initial load
// const LogoViewer = dynamic(
//   () => import("@/components/threeD").then((mod) => mod.LogoViewer),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="h-full w-full rounded-3xl bg-card/20 border border-primary/20 animate-pulse flex items-center justify-center">
//         <span className="font-mono text-xs uppercase tracking-widest text-primary/60">Loading 3D Engine...</span>
//       </div>
//     ),
//   }
// );

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
            {/* <Reveal> */}
              <Badge className="mb-6 rounded-full px-3 py-1.5 text-xs sm:mb-8 sm:px-4 sm:py-2 sm:text-sm">
                <Sparkles className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                AI Powered Digital Agency
              </Badge>
            {/* </Reveal> */}

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
            {/* <FadeIn> */}
              {/* Lock the height to prevent collapse when typewriter clears text */}
              <div className="mt-6 min-h-[2.5rem] text-xl font-semibold text-primary sm:mt-8 sm:min-h-[3rem] sm:text-2xl">
                {/* <Typewriter
                  words={[
                    "Web Applications",
                    "Mobile Apps",
                    "AI Solutions",
                    "Cloud Platforms",
                    "SaaS Products",
                  ]}
                /> */}
              </div>
            {/* </FadeIn> */}

            {/* <FadeIn> */}
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
            {/* </FadeIn> */}

            {/* <FadeIn> */}
              <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-5">
                <Magnetic>
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/contact">
                      Start Your Project
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </Magnetic>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Link href="/portfolio">View Portfolio</Link>
                </Button>
              </div>
            {/* </FadeIn> */}
{/* 
            <FadeIn> */}
              <div className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-6 lg:gap-8">
                <span>✓ Modern Tech Stack</span>
                <span>✓ AI Integrated</span>
                <span>✓ Scalable Architecture</span>
              </div>
            {/* </FadeIn> */}
          </div>

          {/* Right Column (3D Logo Canvas - Lazily Loaded)
          <div
            className="
              relative
              mx-auto
              aspect-square
              w-full
              max-w-sm
              sm:max-w-md
              lg:max-w-xl
            "
          >
            <Floating className="h-full w-full">
              <LogoViewer
                model="individual"
                animation="explode"
                className="h-full w-full"
              />
            </Floating>
          </div> */}
        </div>
      </Container>
    </section>
  );
}