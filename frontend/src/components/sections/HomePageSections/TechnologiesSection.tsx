"use client";

/**
 * -----------------------------------------------------------------------------
 * Technologies Section
 * -----------------------------------------------------------------------------
 *
 * Homepage technologies showcase.
 *
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { Container } from "@/components/common";

import { TechnologyCloud } from "@/components/common/TechnologyCloud";

import { Aurora, GradientBlur } from "@/components/effects";

export function TechnologiesSection() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Background */}

      <Aurora />

      <GradientBlur />

      <Container className="relative z-10">
        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Technologies
          </span>

          <h2 className="mt-5 text-4xl font-black md:text-5xl">
            Technologies We Master
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We leverage modern technologies across web, mobile, AI, design,
            cloud, and cybersecurity to build high-performance digital products.
          </p>
        </motion.div>

        {/* Floating Technology Cloud */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
          }}
        >
          <TechnologyCloud className="h-[750px]" />
        </motion.div>
      </Container>
    </section>
  );
}
