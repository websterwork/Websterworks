"use client";

/**
 * -----------------------------------------------------------------------------
 * About Us Header
 * -----------------------------------------------------------------------------
 *
 * Opening hero for the About page.
 *
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { Container } from "@/components/common";

import { Aurora, GradientBlur, Glow, GridPattern } from "@/components/effects";

import { SplitText, BlurText, Shine } from "@/components/animations";

export function AboutUsHeader() {
  return (
    <section
      id="about-header"
  className="
relative
flex
h-screen
snap-start
items-center
overflow-hidden
"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Background */}
      {/* ------------------------------------------------------------------ */}

      <Aurora />

      <GradientBlur />

      <Glow />

      <GridPattern />

      {/* ------------------------------------------------------------------ */}
      {/* Content */}
      {/* ------------------------------------------------------------------ */}

      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <motion.span
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              inline-block
              rounded-full
              border
              border-primary/30
              bg-primary/10
              px-6
              py-2
              text-xs
              uppercase
              tracking-[0.35em]
              text-primary
            "
          >
            About Websterwork
          </motion.span>

          <div className="mt-10">
              <SplitText
                text="Building Digital Experiences That Matter."
                className="
                  justify-center
                  text-center
                  text-5xl
                  font-black
                  leading-tight
                  md:text-7xl
                "
              />

          </div>

          <BlurText
            text="
            We believe technology should solve problems,
            empower businesses and create experiences
            that people genuinely enjoy using.
            "
            className="
              mx-auto
              mt-10
              max-w-3xl
              text-lg
              leading-9
              text-muted-foreground
            "
          />

          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              delay: 1.5,
            }}
            className="
              mt-20
              flex
              justify-center
            "
          >
            <div
              className="
                flex
                flex-col
                items-center
                gap-3
                text-muted-foreground
              "
            >
              <span className="text-xs uppercase tracking-[0.3em]">
                Scroll to Explore
              </span>

              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                }}
                className="
                  h-12
                  w-[2px]
                  rounded-full
                  bg-primary
                "
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
