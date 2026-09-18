"use client";

/**
 * -----------------------------------------------------------------------------
 * Service Section
 * -----------------------------------------------------------------------------
 *
 * Full-viewport services stage. After Technologies, the screen becomes a
 * blank canvas and each service occupies the entire view while scrolling.
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

import { services } from "@/data/services";

import { cubicBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HOME_SERVICE_LIMIT = 3;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ServiceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredServices = services.slice(0, HOME_SERVICE_LIMIT);
  const hasMoreServices = services.length > HOME_SERVICE_LIMIT;
  const service = featuredServices[activeIndex] ?? featuredServices[0];
  const total = featuredServices.length;

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

  if (!service) {
    return null;
  }

  const indexLabel = String(activeIndex + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      className="relative z-20 h-dvh w-full overflow-hidden bg-background"
      aria-label="Services"
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
          background: `radial-gradient(ellipse 70% 55% at 12% 88%, ${service.hero.accentColor}28, transparent 58%)`,
        }}
      />

      <span
        ref={progressRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 h-0.5 w-full origin-left scale-x-0 bg-primary"
      />

      <div className="relative flex h-full w-full flex-col px-5 py-6 sm:px-7 sm:py-8 md:px-10 md:py-[6vh] lg:px-[5%] lg:py-[8vh]">
        {/* Header */}
        <FadeIn className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary sm:text-sm sm:tracking-[0.3em]">
              Services
            </span>

            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
              {indexLabel} / {totalLabel}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <nav
              aria-label="Service progress"
              className="flex items-center gap-2"
            >
              {featuredServices.map((item, index) => (
                <span
                  key={item.id}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    index === activeIndex
                      ? "w-6 bg-primary sm:w-7"
                      : "w-1.5 bg-muted-foreground/35",
                  )}
                />
              ))}
            </nav>

            {hasMoreServices && (
              <Magnetic strength={12}>
                <Link
                  href="/services"
                  data-cursor="hover"
                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-primary sm:text-xs sm:tracking-[0.22em]"
                >
                  View All Services
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </Magnetic>
            )}
          </div>
        </FadeIn>

        {/* Service Content */}
        <div className="relative mt-5 min-h-0 flex-1 sm:mt-8">
          <Floating
            className="pointer-events-none absolute right-[-4vw] top-[-6vh] hidden lg:block"
            distance={18}
            duration={7}
          >
            <span className="select-none text-[28vw] font-black leading-none text-foreground/4.5">
              {indexLabel}
            </span>
          </Floating>

          <AnimatePresence mode="wait">
            <motion.div
              key={service.id}
              className="
                absolute inset-0
                grid min-h-0
                grid-rows-[auto_1fr_auto]
                gap-6
                sm:gap-8
                lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]
                lg:grid-rows-1
                lg:gap-16
              "
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
                    className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] sm:mb-5 sm:text-sm sm:tracking-[0.28em]"
                    style={{ color: service.hero.accentColor }}
                  >
                    {service.hero.subtitle}
                  </p>
                </Reveal>

                <SplitText
                  as="h2"
                  className="max-w-4xl text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                >
                  {service.hero.title}
                </SplitText>

                <div className="mt-4 text-base font-medium leading-7 text-primary sm:mt-6 sm:text-xl sm:leading-8 md:text-2xl">
                  <Typewriter
                    key={`${service.id}-line`}
                    text={service.hero.shortDescription}
                    loop={false}
                    typingSpeed={28}
                  />
                </div>

                <FadeIn delay={0.2}>
                  <p className="mt-4 max-w-2xl text-xs leading-6 text-muted-foreground sm:mt-6 sm:text-sm sm:leading-7 md:mt-8 md:text-lg md:leading-8 md:line-clamp-none">
                    {service.hero.longDescription}
                  </p>
                </FadeIn>

                <FadeIn delay={0.35} className="mt-7 sm:mt-10">
                  <Magnetic strength={18}>
                    <Button
                      asChild
                      size="lg"
                      className="h-11 rounded-full px-5 text-sm sm:h-12 sm:px-6 sm:text-base"
                      data-cursor="hover"
                    >
                      <Link href={service.cta.href}>
                        {service.cta.button}
                        <ArrowUpRight />
                      </Link>
                    </Button>
                  </Magnetic>
                </FadeIn>
              </div>

              {/* Desktop / Tablet Features */}
              <div className="hidden min-h-0 flex-col justify-between gap-10 overflow-hidden md:flex">
                <ul className="space-y-4 lg:space-y-5">
                  {service.features.slice(0, 4).map((feature, index) => (
                    <li
                      key={feature.title}
                      className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-b border-border/40 pb-4 last:border-b-0 lg:gap-5"
                    >
                      <span
                        className="font-mono text-xs sm:text-sm"
                        style={{ color: service.hero.accentColor }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <p className="text-base font-semibold sm:text-lg">
                          {feature.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                          {feature.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <ol className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:gap-x-8 sm:text-xs sm:tracking-[0.18em]">
                  {service.process.map((step) => (
                    <li key={step.step} className="flex items-center gap-2">
                      <span style={{ color: service.hero.accentColor }}>
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
