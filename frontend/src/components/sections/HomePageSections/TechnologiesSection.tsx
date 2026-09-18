"use client";

import { motion } from "motion/react";
import { Container } from "@/components/common";
import { TechnologyCloud } from "@/components/common/TechnologyCloud";
import { Aurora, GradientBlur } from "@/components/effects";

export function TechnologiesSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
      {/* Background */}
      <Aurora />
      <GradientBlur />

      <Container className="relative z-10">
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-16 md:mb-20"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary sm:text-sm">
            Technologies
          </span>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl md:text-5xl">
            Technologies We Master
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            We leverage modern technologies across web, mobile, AI, design,
            cloud, and cybersecurity to build high-performance digital products.
          </p>
        </motion.div>

        {/* Floating Technology Cloud */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97,
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
          <TechnologyCloud />
        </motion.div>
      </Container>
    </section>
  );
}
