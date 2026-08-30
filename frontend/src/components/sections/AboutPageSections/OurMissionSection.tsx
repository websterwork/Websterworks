"use client";

/**
 * -----------------------------------------------------------------------------
 * Our Mission Section
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { Container } from "@/components/common";

import { Aurora, BorderBeam, Glow } from "@/components/effects";

import { SplitText, Typewriter, Floating } from "@/components/animations";

export function OurMissionSection() {
  return (
    <section id="our-mission" className="relative overflow-hidden py-40">
      <Aurora />

      <Glow />

      <Container>
        <div className="grid items-center gap-24 lg:grid-cols-2">
          {/* ============================================================ */}
          {/* Left Visual */}
          {/* ============================================================ */}

          <Floating>
            <div
              className="
          relative
          flex
          h-screen
          snap-start
          items-center
          overflow-hidden
          "
            >
              <BorderBeam />

              <div className="absolute inset-10 rounded-full border border-primary/20" />

              <div className="absolute inset-24 rounded-full border border-primary/20" />

              <div className="absolute inset-40 rounded-full border border-primary/20" />

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  inset-12
                  rounded-full
                  border-2
                  border-dashed
                  border-primary/40
                "
              />

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  inset-28
                  rounded-full
                  border
                  border-primary/30
                "
              />

              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-24
                  w-24
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-primary
                  blur-3xl
                "
              />
            </div>
          </Floating>

          {/* ============================================================ */}
          {/* Right */}
          {/* ============================================================ */}

          <div>
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
                font-semibold
                uppercase
                tracking-[0.3em]
                text-primary
              "
            >
              Our Mission
            </motion.span>

            <SplitText
              text="Creating Technology That Solves Real Problems."
              className="
                mt-6
                text-5xl
                font-black
                leading-tight
              "
            />

            <Typewriter
              loop={false}
              text="
Our mission is to help businesses grow through modern technology.
From AI solutions and cloud platforms to enterprise software,
we design every product with scalability, usability and long-term value in mind.
              "
              className="
                mt-8
                max-w-xl
                text-lg
                leading-9
                text-muted-foreground
              "
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
