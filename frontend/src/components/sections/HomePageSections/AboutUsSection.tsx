"use client";

/**
 * -----------------------------------------------------------------------------
 * About Us Section
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { Container } from "@/components/common";
import { Aurora, GradientBlur, Glow } from "@/components/effects";
import { Shine, SplitText, BlurText, HoverCard } from "@/components/animations";

export function AboutUsSection() {
  return (
    <section className="relative overflow-hidden py-32">
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
          className="mx-auto mb-28 max-w-5xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            About Websterwork
          </span>

          <div className="mt-6 flex justify-center">
         
              <SplitText
                text="Driven by Innovation. Built for the Future."
                className="justify-center text-center text-4xl font-black md:text-6xl"
              />
          </div>

          <BlurText
            className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted-foreground"
          >
            We create scalable digital experiences that combine strategy creativity and technology to help businesses grow in an increasingly connected world.
          </BlurText>
        </motion.div>

        {/* About Grid */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Who We Are */}
          <HoverCard>
            <div className="rounded-3xl border border-border/50 bg-background/40 p-10 backdrop-blur-md">
              <span className="text-sm uppercase tracking-[0.3em] text-primary">
                Who We Are
              </span>

              <h3 className="mt-5 text-3xl font-bold">
                A Digital Partner Focused On Growth
              </h3>

              <p className="mt-6 leading-8 text-muted-foreground">
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
            <div className="rounded-3xl border border-border/50 bg-background/40 p-10 backdrop-blur-md">
              <span className="text-sm uppercase tracking-[0.3em] text-primary">
                Our Mission
              </span>

              <h3 className="mt-5 text-3xl font-bold">
                Empower Businesses Through Technology
              </h3>

              <p className="mt-6 leading-8 text-muted-foreground">
                Our mission is to deliver high-quality digital solutions that
                improve efficiency, strengthen brands and create measurable
                business value. Every project is built with long-term
                scalability, security and performance in mind.
              </p>
            </div>
          </HoverCard>

          {/* Vision */}
          <HoverCard>
            <div className="rounded-3xl border border-border/50 bg-background/40 p-10 backdrop-blur-md">
              <span className="text-sm uppercase tracking-[0.3em] text-primary">
                Our Vision
              </span>

              <h3 className="mt-5 text-3xl font-bold">
                Shaping The Future Of Digital Innovation
              </h3>

              <p className="mt-6 leading-8 text-muted-foreground">
                We envision Websterwork becoming a global technology company
                recognized for creating intelligent digital ecosystems where AI,
                software engineering and design work together to solve
                real-world challenges.
              </p>
            </div>
          </HoverCard>

          {/* Founded */}
          <HoverCard>
            <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-primary/30 bg-primary/5 p-10 text-center backdrop-blur-md">
              <span className="text-sm uppercase tracking-[0.3em] text-primary">
                Established
              </span>

              <h2 className="mt-6 text-7xl font-black text-primary">2022</h2>

              <p className="mt-6 max-w-sm leading-8 text-muted-foreground">
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
