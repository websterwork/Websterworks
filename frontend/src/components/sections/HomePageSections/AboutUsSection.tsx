"use client";

/**
 * -----------------------------------------------------------------------------
 * About Us Section
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { Container } from "@/components/common";
import { Aurora, GradientBlur, Glow } from "@/components/effects";
import { SplitText, BlurText, HoverCard } from "@/components/animations";

export function AboutUsSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        px-4
        py-24
        sm:px-6
        sm:py-28
        lg:px-10
        lg:py-32
      "
    >
      {/* Background */}

      <Aurora />
      <GradientBlur />
      <Glow />

      <Container className="relative z-10">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="
            mx-auto
            mb-16
            max-w-5xl
            text-center
            sm:mb-20
            lg:mb-28
          "
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary sm:text-sm sm:tracking-[0.3em]">
            About Websterwork
          </span>

          <div className="mt-5 flex justify-center sm:mt-6">
            <SplitText
              className="
                justify-center
                text-center
                text-3xl
                font-black
                leading-tight
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
              "
            >
              Driven by Innovation. Built for the Future.
            </SplitText>
          </div>

          <BlurText className="mx-auto mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:mt-8 sm:text-lg sm:leading-8">
            We create scalable digital experiences that combine strategy
            creativity and technology to help businesses grow in an increasingly
            connected world.
          </BlurText>
        </motion.div>

        {/* About Grid */}

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Who We Are */}

          <HoverCard>
            <div className="h-full rounded-3xl border border-border/50 bg-background/40 p-6 backdrop-blur-md sm:p-8 lg:p-10">
              <span className="text-xs uppercase tracking-[0.25em] text-primary sm:text-sm sm:tracking-[0.3em]">
                Who We Are
              </span>

              <h3 className="mt-4 text-2xl font-bold leading-tight sm:mt-5 sm:text-3xl">
                A Digital Partner Focused On Growth
              </h3>

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-base sm:leading-8">
                Websterwork is a technology company dedicated to building modern
                web applications, AI-powered solutions, creative digital
                experiences and scalable business platforms. We combine
                engineering, design and innovation to transform ambitious ideas
                into successful products.
              </p>
            </div>
          </HoverCard>

          {/* Mission */}

          <HoverCard>
            <div className="h-full rounded-3xl border border-border/50 bg-background/40 p-6 backdrop-blur-md sm:p-8 lg:p-10">
              <span className="text-xs uppercase tracking-[0.25em] text-primary sm:text-sm sm:tracking-[0.3em]">
                Our Mission
              </span>

              <h3 className="mt-4 text-2xl font-bold leading-tight sm:mt-5 sm:text-3xl">
                Empower Businesses Through Technology
              </h3>

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-base sm:leading-8">
                Our mission is to deliver high-quality digital solutions that
                improve efficiency, strengthen brands and create measurable
                business value. Every project is built with long-term
                scalability, security and performance in mind.
              </p>
            </div>
          </HoverCard>

          {/* Vision */}

          <HoverCard>
            <div className="h-full rounded-3xl border border-border/50 bg-background/40 p-6 backdrop-blur-md sm:p-8 lg:p-10">
              <span className="text-xs uppercase tracking-[0.25em] text-primary sm:text-sm sm:tracking-[0.3em]">
                Our Vision
              </span>

              <h3 className="mt-4 text-2xl font-bold leading-tight sm:mt-5 sm:text-3xl">
                Shaping The Future Of Digital Innovation
              </h3>

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-base sm:leading-8">
                We envision Websterwork becoming a global technology company
                recognized for creating intelligent digital ecosystems where AI,
                software engineering and design work together to solve
                real-world challenges.
              </p>
            </div>
          </HoverCard>

          {/* Founded */}

          <HoverCard>
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-3xl border border-primary/30 bg-primary/5 p-6 text-center backdrop-blur-md sm:min-h-[320px] sm:p-10">
              <span className="text-xs uppercase tracking-[0.25em] text-primary sm:text-sm sm:tracking-[0.3em]">
                Established
              </span>

              <h2 className="mt-4 text-5xl font-black text-primary sm:mt-6 sm:text-6xl lg:text-7xl">
                2022
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-base sm:leading-8">
                Since our foundation in 2022, we've been committed to helping
                businesses embrace modern technology through innovation,
                creativity and engineering excellence.
              </p>
            </div>
          </HoverCard>
        </div>
      </Container>
    </section>
  );
}
