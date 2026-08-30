"use client";

/**
 * -----------------------------------------------------------------------------
 * Our Vision Section
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { Container } from "@/components/common";

import {
  Aurora,
  Glow,
  GradientBlur,
  ParticleField,
} from "@/components/effects";

import { SplitText, Typewriter, Shine } from "@/components/animations";

export function OurVisionSection() {
  return (
    <section
      id="our-vision"
      className="
      relative
      flex
      h-screen
      snap-start
      items-center
      overflow-hidden
      "
    >
      {/* ---------------------------------------------------------------- */}
      {/* Background */}
      {/* ---------------------------------------------------------------- */}

      <Aurora />

      <GradientBlur />

      <Glow />

      <ParticleField />

      {/* ---------------------------------------------------------------- */}
      {/* Content */}
      {/* ---------------------------------------------------------------- */}

      <Container className="relative z-10">
        <div className="mx-auto max-w-6xl text-center">
          <motion.span
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
              text-sm
              uppercase
              tracking-[0.35em]
              text-primary
            "
          >
            Our Vision
          </motion.span>

          <div className="mt-8">
            <Shine>
              <SplitText
                text="Engineering Tomorrow's Digital World."
                className="
                  justify-center
                  text-center
                  text-5xl
                  font-black
                  leading-tight
                  md:text-7xl
                "
              />
            </Shine>
          </div>

          <Typewriter
            loop={false}
            text="
We envision Websterwork becoming a global technology company
where innovation, artificial intelligence, design and engineering
work together to create products that inspire millions of people.
            "
            className="
              mx-auto
              mt-12
              max-w-4xl
              justify-center
              text-center
              text-xl
              leading-10
              text-muted-foreground
            "
          />

          {/* ------------------------------------------------------------ */}
          {/* Future Line */}
          {/* ------------------------------------------------------------ */}

          <div className="mt-28 flex justify-center">
            <div className="relative w-full max-w-5xl">
              <div className="h-px w-full bg-border" />

              <motion.div
                animate={{
                  x: ["0%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "linear",
                }}
                className="
                  absolute
                  -top-[4px]
                  h-2
                  w-2
                  rounded-full
                  bg-primary
                  shadow-[0_0_20px_4px_rgb(59,130,246)]
                "
              />
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* Future Years */}
          {/* ------------------------------------------------------------ */}

          <div
            className="
              mt-12
              flex
              justify-center
              gap-12
              text-sm
              uppercase
              tracking-[0.25em]
              text-muted-foreground
            "
          >
            <span>2022</span>

            <span>Today</span>

            <span>Tomorrow</span>

            <span>Future</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
