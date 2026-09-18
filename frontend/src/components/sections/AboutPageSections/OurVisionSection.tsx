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
import { SplitText, Typewriter } from "@/components/animations";

export function OurVisionSection() {
  return (
    <section
      id="our-vision"
      className="
        relative
        flex
        min-h-[100dvh]
        items-center
        overflow-hidden
        px-4
        py-16
        sm:px-6
        md:px-12
        lg:px-20
      "
    >
      <Aurora />
      <GradientBlur />
      <Glow />
      <ParticleField />

      <Container className="relative z-10 w-full">
        <div className="mx-auto max-w-5xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-primary
              sm:text-sm
              sm:tracking-[0.35em]
            "
          >
            Our Vision
          </motion.span>

          <div className="mt-4 sm:mt-8">
            <SplitText
              text="Engineering Tomorrow's Digital World."
              className="
                justify-center
                text-center
                text-3xl
                font-black
                leading-tight
                xs:text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            />
          </div>

          <Typewriter
            loop={false}
            text="We envision Websterwork becoming a global technology company where innovation, artificial intelligence, design, and engineering work together to create products that inspire millions of people."
            className="
              mx-auto
              mt-6
              max-w-3xl
              justify-center
              text-center
              text-base
              leading-relaxed
              text-muted-foreground
              sm:mt-10
              sm:text-lg
              md:text-xl
              md:leading-9
            "
          />

          {/* Timeline Bar Container */}
          <div className="mt-16 flex justify-center sm:mt-20 md:mt-24">
            <div className="relative w-full max-w-4xl px-2">
              <div className="h-px w-full bg-border" />

              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "linear",
                }}
                className="
                  absolute
                  -top-[3px]
                  h-2
                  w-2
                  -translate-x-1/2
                  rounded-full
                  bg-primary
                  shadow-[0_0_20px_4px_rgb(59,130,246)]
                "
              />
            </div>
          </div>

          {/* Timeline Years */}
          <div
            className="
              mt-6
              flex
              flex-wrap
              items-center
              justify-center
              gap-6
              text-xs
              uppercase
              tracking-[0.2em]
              text-muted-foreground
              sm:mt-10
              sm:gap-12
              sm:text-sm
              sm:tracking-[0.25em]
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
