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
h-screen
snap-start
items-center
overflow-hidden
"
    >
      <Glow />

      <Container>
        <div
          className="
            grid
            items-center
            gap-20
            lg:grid-cols-2
          "
        >
          {/* ------------------------------------------------------------ */}
          {/* Left */}
          {/* ------------------------------------------------------------ */}

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
              Who We Are
            </motion.span>

            <SplitText
              text="Technology Crafted Around People."
              className="
                mt-6
                text-5xl
                font-black
                leading-tight
              "
            />

            <Typewriter
              text="Websterwork is a software engineering company focused on building intelligent web platforms, AI-powered applications, scalable cloud solutions and immersive digital experiences. Every solution is engineered with performance, maintainability and long-term growth in mind."
              className="
                mt-8
                max-w-xl
                text-lg
                leading-9
                text-muted-foreground
              "
              loop={false}
            />
          </div>

          {/* ------------------------------------------------------------ */}
          {/* Right */}
          {/* ------------------------------------------------------------ */}

          <HoverCard>
            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-border/40
                bg-background/40
                p-10
                backdrop-blur-xl
              "
            >
              <BorderBeam />

              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold">Our Foundation</h4>

                  <p className="mt-3 text-muted-foreground leading-8">
                    Innovation begins with curiosity and grows through
                    continuous learning.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold">Our Philosophy</h4>

                  <p className="mt-3 text-muted-foreground leading-8">
                    Great software is not just functional—it should be
                    intuitive, scalable and enjoyable to use.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold">Our Commitment</h4>

                  <p className="mt-3 text-muted-foreground leading-8">
                    Every project is approached with transparency, quality
                    engineering and a long-term mindset.
                  </p>
                </div>
              </div>
            </div>
          </HoverCard>
        </div>
      </Container>
    </section>
  );
}
