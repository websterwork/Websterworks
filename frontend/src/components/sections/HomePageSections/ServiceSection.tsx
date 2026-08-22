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
        className="pointer-events-none absolute top-0 left-0 z-20 h-0.5 w-full origin-left scale-x-0 bg-primary"
      />

      <div className="relative flex h-full w-full flex-col px-[5%] py-[6vh] md:py-[8vh]">
        <FadeIn className="flex items-end justify-between gap-6">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Services
            </span>
            <p className="mt-2 text-sm text-muted-foreground">
              {indexLabel} / {totalLabel}
            </p>
          </div>

          <div className="flex items-center gap-6">
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
                      ? "w-7 bg-primary"
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
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-primary"
                >
                  View All Services
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </Magnetic>
            )}
          </div>
        </FadeIn>

        <div className="relative mt-8 min-h-0 flex-1">
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
                    style={{ color: service.hero.accentColor }}
                  >
                    {service.hero.subtitle}
                  </p>
                </Reveal>

                <SplitText
                  as="h2"
                  className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl xl:text-7xl"
                >
                  {service.hero.title}
                </SplitText>

                <div className="mt-6 text-xl font-medium text-primary md:text-2xl">
                  <Typewriter
                    key={`${service.id}-line`}
                    text={service.hero.shortDescription}
                    loop={false}
                    typingSpeed={28}
                  />
                </div>

                <FadeIn delay={0.2}>
                  <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground line-clamp-4 md:mt-8 md:text-lg md:leading-8 md:line-clamp-none">
                    {service.hero.longDescription}
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
                      <Link href={service.cta.href}>
                        {service.cta.button}
                        <ArrowUpRight />
                      </Link>
                    </Button>
                  </Magnetic>
                </FadeIn>
              </div>

              <div className="hidden min-h-0 flex-col justify-between gap-10 overflow-hidden md:flex">
                <ul className="space-y-5">
                  {service.features.slice(0, 4).map((feature, index) => (
                    <li
                      key={feature.title}
                      className="grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-border/40 pb-4 last:border-b-0"
                    >
                      <span
                        className="font-mono text-sm"
                        style={{ color: service.hero.accentColor }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-lg font-semibold">{feature.title}</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <ol className="flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
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
