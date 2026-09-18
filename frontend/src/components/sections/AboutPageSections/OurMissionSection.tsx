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
    <section
      id="our-mission"
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
      <Glow />

      <Container className="relative z-10 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Visual Container */}
          <div className="order-2 lg:order-1">
            <Floating>
              <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[520px]">
                <BorderBeam
                  radius={999}
                  className="
                    h-full
                    w-full
                    rounded-full
                    border
                    border-primary/20
                    bg-primary/5
                    backdrop-blur-2xl
                  "
                >
                  {/* Scaled Concentric Inner Rings */}
                  <div className="absolute inset-6 rounded-full border border-primary/20 sm:inset-10" />
                  <div className="absolute inset-14 rounded-full border border-primary/20 sm:inset-24" />
                  <div className="absolute inset-24 rounded-full border border-primary/20 sm:inset-40" />

                  {/* Rotating Dashed Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="
                      absolute
                      inset-8
                      rounded-full
                      border-2
                      border-dashed
                      border-primary/40
                      sm:inset-12
                    "
                  />

                  {/* Rotating Inner Ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="
                      absolute
                      inset-16
                      rounded-full
                      border
                      border-primary/30
                      sm:inset-28
                    "
                  />

                  {/* Dynamic Energy Core */}
                  <motion.div
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      h-16
                      w-16
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-primary
                      blur-2xl
                      sm:h-24
                      sm:w-24
                      sm:blur-3xl
                    "
                  />

                  <motion.div
                    animate={{
                      scale: [1, 1.08, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      h-6
                      w-6
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-primary
                      shadow-[0_0_40px_rgba(0,240,255,0.8)]
                      sm:h-8
                      sm:w-8
                    "
                  />
                </BorderBeam>
              </div>
            </Floating>
          </div>

          {/* Text Content */}
          <div className="order-1 text-center lg:order-2 lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                text-primary
                sm:text-sm
                sm:tracking-[0.3em]
              "
            >
              Our Mission
            </motion.span>

            <SplitText
              by="word"
              animation="up"
              className="
                mt-4
                text-3xl
                font-black
                leading-tight
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
              "
            >
              Creating Technology That Solves Real Problems.
            </SplitText>

            <Typewriter
              loop={false}
              text="Our mission is to help businesses grow through modern technology. From AI solutions and cloud platforms to enterprise software, we design every product with scalability, usability, and long-term value in mind."
              className="
                mx-auto
                mt-6
                max-w-xl
                text-base
                leading-relaxed
                text-muted-foreground
                sm:text-lg
                lg:mx-0
                lg:leading-8
              "
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
