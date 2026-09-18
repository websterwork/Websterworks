"use client";

/**
 * -----------------------------------------------------------------------------
 * About Us Header
 * -----------------------------------------------------------------------------
 * Opening hero for the About page.
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
        min-h-[100dvh]
        items-center
        justify-center
        overflow-hidden
        px-4
        py-16
        sm:px-6
        md:px-12
        lg:px-20
      "
    >
      {/* Background Effects */}
      <Aurora />
      <GradientBlur />
      <Glow />
      <GridPattern />

      {/* Main Content Container */}
      <Container className="relative z-10 w-full">
        <div className="mx-auto max-w-5xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="
              inline-block
              rounded-full
              border
              border-primary/30
              bg-primary/10
              px-4
              py-1.5
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-primary
              sm:px-6
              sm:py-2
              sm:text-xs
              sm:tracking-[0.35em]
            "
          >
            About Websterwork
          </motion.span>

          <div className="mt-6 sm:mt-10">
           
              <SplitText
                className="
                  justify-center
                  text-center
                  text-3xl
                  font-black
                  leading-tight
                  tracking-tight
                  xs:text-4xl
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                "
              >
                Building Digital Experiences That Matter.
              </SplitText>
            
          </div>

          <BlurText
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-base
              leading-relaxed
              text-muted-foreground
              sm:mt-10
              sm:text-lg
              md:text-xl
              md:leading-9
            "
          >
            We believe technology should solve problems, empower businesses, and
            create experiences that people genuinely enjoy using.
          </BlurText>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            viewport={{ once: true }}
            className="
              mt-12
              flex
              justify-center
              sm:mt-16
              lg:mt-20
            "
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground sm:gap-3">
              <span className="text-[10px] uppercase tracking-[0.25em] sm:text-xs sm:tracking-[0.3em]">
                Scroll to Explore
              </span>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                }}
                className="
                  h-8
                  w-[2px]
                  rounded-full
                  bg-primary
                  sm:h-12
                "
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
