"use client";

/**
 * -----------------------------------------------------------------------------
 * Who We Are Section
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { Container } from "@/components/common";
import { BorderBeam, Glow } from "@/components/effects";
import { SplitText, Typewriter, HoverCard } from "@/components/animations";

export function WhoWeAreSection() {
  return (
    <section
      id="who-we-are"
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
      <Glow />

      <Container className="relative z-10 w-full">
        <div
          className="
            grid
            w-full
            items-center
            gap-12
            lg:grid-cols-2
            lg:gap-16
            xl:gap-20
          "
        >
          {/* Left Text Block */}
          <div className="relative z-10 text-center lg:text-left">
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
              Who We Are
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
              Technology Crafted Around People.
            </SplitText>

            <Typewriter
              text="Websterwork is a software engineering company focused on building intelligent web platforms, AI-powered applications, scalable cloud solutions, and immersive digital experiences. Every solution is engineered with performance, maintainability, and long-term growth in mind."
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
              loop={false}
            />
          </div>

          {/* Right Cards Stack */}
          <HoverCard className="w-full">
            <BorderBeam
              radius={24}
              className="
                w-full
                rounded-2xl
                border
                border-border/40
                bg-background/40
                p-6
                backdrop-blur-xl
                sm:rounded-3xl
                sm:p-8
                lg:p-10
              "
            >
              <div className="space-y-6 sm:space-y-8 text-left">
                <div>
                  <h4 className="text-lg font-bold sm:text-xl">
                    Our Foundation
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-7">
                    Innovation begins with curiosity and grows through
                    continuous learning.
                  </p>
                </div>

                <div className="border-t border-border/20 pt-6 sm:pt-8">
                  <h4 className="text-lg font-bold sm:text-xl">
                    Our Philosophy
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-7">
                    Great software is not just functional—it should be
                    intuitive, scalable, and enjoyable to use.
                  </p>
                </div>

                <div className="border-t border-border/20 pt-6 sm:pt-8">
                  <h4 className="text-lg font-bold sm:text-xl">
                    Our Commitment
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-7">
                    Every project is approached with transparency, quality
                    engineering, and a long-term mindset.
                  </p>
                </div>
              </div>
            </BorderBeam>
          </HoverCard>
        </div>
      </Container>
    </section>
  );
}
