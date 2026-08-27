"use client";

/**
 * -----------------------------------------------------------------------------
 * Industry Section
 * -----------------------------------------------------------------------------
 *
 * Full-viewport industries stage. Displays featured industries on scroll,
 * displaying the initial letter of the industry name in the background.
 *
 * -----------------------------------------------------------------------------
 */

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

import {
  FadeIn,
  Floating,
  Magnetic,
  Reveal,
  SplitText,
  Typewriter,
} from "@/components/animations";
import { Aurora, GradientBlur, Spotlight } from "@/components/effects";
import { Button } from "@/components/ui";

import { industries } from "@/data/industries";

import { cubicBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HOME_INDUSTRY_LIMIT = 3;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredIndustries = industries.slice(0, HOME_INDUSTRY_LIMIT);
  const hasMoreIndustries = industries.length > HOME_INDUSTRY_LIMIT;
  const industry = featuredIndustries[activeIndex] ?? featuredIndustries[0];
  const total = featuredIndustries.length;

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || total === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * total}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const next = Math.min(
            total - 1,
            Math.floor(self.progress * total + Number.EPSILON),
          );

          setActiveIndex((current) => (current === next ? current : next));

          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, [total]);

  if (!industry) {
    return null;
  }

  const indexLabel = String(activeIndex + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  // Extract the first character of the industry title (e.g., "Education" -> "E")
  const initialLetter = industry.hero.title.trim().charAt(0).toUpperCase();

  return (
    <section
      ref={sectionRef}
      className="relative z-20 h-dvh w-full overflow-hidden bg-background"
      aria-label="Industries"
    >
      <div className="absolute inset-0">
        <Aurora opacity={0.28} />
        <Spotlight opacity={0.08} />
        <GradientBlur opacity={0.22} />
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-colors duration-700"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 12% 88%, ${industry.hero.accentColor}28, transparent 58%)`,
        }}
      />

      <span
        ref={progressRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-20 h-0.5 w-full origin-left scale-x-0 bg-primary"
      />

      <div className="relative flex h-full w-full flex-col px-[5%] py-[6vh] md:py-[8vh]">
        <FadeIn className="flex items-end justify-between gap-6">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Industries We Serve
            </span>
            <p className="mt-2 text-sm text-muted-foreground">
              {indexLabel} / {totalLabel}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <nav
              aria-label="Industry progress"
              className="flex items-center gap-2"
            >
              {featuredIndustries.map((item, index) => (
                <span
                  key={item.id}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    index === activeIndex
                      ? "w-7 bg-primary"
                      : "w-1.5 bg-muted-foreground/35",
                  )}
                />
              ))}
            </nav>

            {hasMoreIndustries && (
              <Magnetic strength={12}>
                <Link
                  href="/industries"
                  data-cursor="hover"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-primary"
                >
                  View All Industries
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </Magnetic>
            )}
          </div>
        </FadeIn>

        <div className="relative mt-8 min-h-0 flex-1">
          {/* Background Industry Initial Letter */}
          <Floating
            className="pointer-events-none absolute right-[-2vw] top-[-6vh] hidden lg:block"
            distance={18}
            duration={7}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: cubicBezier.premium }}
                className="inline-block select-none text-[32vw] font-black leading-none text-foreground/4.5"
              >
                {initialLetter}
              </motion.span>
            </AnimatePresence>
          </Floating>

          <AnimatePresence mode="wait">
            <motion.div
              key={industry.id}
              className="absolute inset-0 grid min-h-0 grid-rows-[auto_1fr_auto] gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:grid-rows-1 lg:gap-16"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{
                duration: 0.55,
                ease: cubicBezier.premium,
              }}
            >
              <div className="flex min-h-0 flex-col justify-center">
                <Reveal>
                  <p
                    className="mb-5 text-sm font-semibold uppercase tracking-[0.28em]"
                    style={{ color: industry.hero.accentColor }}
                  >
                    {industry.hero.subtitle}
                  </p>
                </Reveal>

                <SplitText
                  as="h2"
                  className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl xl:text-7xl"
                >
                  {industry.hero.title}
                </SplitText>

                <div className="mt-6 text-xl font-medium text-primary md:text-2xl">
                  <Typewriter
                    key={`${industry.id}-line`}
                    text={industry.hero.shortDescription}
                    loop={false}
                    typingSpeed={28}
                  />
                </div>

                <FadeIn delay={0.2}>
                  <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground line-clamp-4 md:mt-8 md:text-lg md:leading-8 md:line-clamp-none">
                    {industry.hero.longDescription}
                  </p>
                </FadeIn>

                <FadeIn delay={0.35} className="mt-10">
                  <Magnetic strength={18}>
                    <Button
                      asChild
                      size="lg"
                      className="h-12 rounded-full px-6 text-base"
                      data-cursor="hover"
                    >
                      <Link href={industry.cta.href}>
                        {industry.cta.button}
                        <ArrowUpRight />
                      </Link>
                    </Button>
                  </Magnetic>
                </FadeIn>
              </div>

              <div className="hidden min-h-0 flex-col justify-between gap-10 overflow-hidden md:flex">
                <ul className="space-y-5">
                  {industry.solutions
                    .slice(0, 4)
                    .map(
                      (
                        solution: { title: string; description: string },
                        index: number,
                      ) => (
                    <li
                      key={solution.title}
                      className="grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-border/40 pb-4 last:border-b-0"
                    >
                      <span
                        className="font-mono text-sm"
                        style={{ color: industry.hero.accentColor }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-lg font-semibold">
                          {solution.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {solution.description}
                        </p>
                      </div>
                    </li>
                      ),
                    )}
                </ul>

                <ol className="flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {industry.process.map((step: { step: number; title: string }) => (
                    <li key={step.step} className="flex items-center gap-2">
                      <span style={{ color: industry.hero.accentColor }}>
                        {String(step.step).padStart(2, "0")}
                      </span>
                      {step.title}
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
