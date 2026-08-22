"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import {
  AnimatedCounter,
  BlurText,
  TextGradient,
  TextScramble,
} from "@/components/animations";
import { Glow, GridPattern } from "@/components/effects";
import { Container } from "@/components/common";
import { Separator } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const product = [
  {
    index: "01",
    title: "AI-native delivery",
    description:
      "Intelligence sits in the product, not in a slide. Assistants, automation, and decision systems are designed to ship — and to keep learning after launch.",
  },
  {
    index: "02",
    title: "Design that converts",
    description:
      "Every screen has a job. We build for clarity, rhythm, and conversion so the interface feels inevitable, not decorated.",
  },
];

const process = [
  { step: "01", title: "Discover", line: "Scope the real problem." },
  { step: "02", title: "Architect", line: "Choose what will still scale." },
  { step: "03", title: "Build", line: "Ship in visible slices." },
  { step: "04", title: "Own", line: "Stay through growth." },
];

const partnership = [
  {
    quote: "You work with the people building the product.",
    detail: "No account-layer fog. Decisions stay close to the work.",
  },
  {
    quote: "We stay after go-live.",
    detail:
      "Iteration, support, and compounding improvements — not a handoff and a goodbye.",
  },
];

const stats = [
  { to: 40, suffix: "+", label: "Products shipped" },
  { to: 12, suffix: "+", label: "Industries" },
  { to: 98, suffix: "%", label: "Retention" },
  { to: 24, suffix: "h", label: "Response" },
];

export function WhyChooseUsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Synchronize GSAP ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    // 2. GSAP Direction-Alternating Animations
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".gsap-slide-item");

      items.forEach((item, index) => {
        // Alternating directions: Even indices (0, 2...) from Left (-100px), Odd indices (1, 3...) from Right (+100px)
        const direction = index % 2 === 0 ? -120 : 120;

        gsap.fromTo(
          item,
          {
            x: direction,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%", // Triggers line-by-line as item scrolls into viewport
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-28 md:py-36"
    >
      <GridPattern opacity={0.1} />
      <Glow
        className="top-[-10%] left-[-8%]"
        color="bg-primary"
        size={480}
        opacity={0.18}
      />
      <Glow
        className="right-[-10%] bottom-[-16%]"
        color="bg-accent"
        size={380}
        opacity={0.12}
        duration={9}
      />

      <Container className="relative z-10">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Why choose us
          </p>

          <BlurText
            as="h2"
            className="mt-6 text-4xl font-black tracking-tight md:text-6xl xl:text-7xl"
          >
            Built to last. <TextGradient>Chosen to grow.</TextGradient>
          </BlurText>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            Websterwork is product thinking, engineering, and design in one
            room. You get a partner that ships — not a vendor that vanishes
            after kickoff.
          </p>
        </div>

        <div className="mt-24 space-y-28">
          {/* Chapter 01 - Product */}
          <Chapter index="01" label="Product">
            <div className="space-y-16">
              {product.map((item) => (
                <article
                  key={item.title}
                  className="gsap-slide-item grid gap-6 border-t border-border/50 pt-10 md:grid-cols-[5rem_1fr] md:gap-12"
                >
                  <span className="font-mono text-sm tracking-[0.2em] text-primary">
                    {item.index}
                  </span>
                  <div>
                    <h3 className="text-3xl font-black tracking-tight md:text-5xl">
                      {item.title}
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Chapter>

          {/* Chapter 02 - Process */}
          <Chapter index="02" label="Process">
            <div className="relative pt-4">
              <div
                aria-hidden
                className="absolute top-[2.15rem] right-0 left-0 hidden h-px bg-border md:block"
              />

              <div className="grid gap-12 md:grid-cols-4">
                {process.map((item) => (
                  <div key={item.step} className="gsap-slide-item relative">
                    <span className="relative z-10 block font-mono text-sm tracking-[0.24em] text-primary">
                      {item.step}
                    </span>
                    <h3 className="mt-8 text-2xl font-black tracking-tight md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                      {item.line}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Chapter>

          {/* Chapter 03 - Partnership */}
          <Chapter index="03" label="Partnership">
            <div className="grid gap-16 md:grid-cols-2 md:gap-20">
              {partnership.map((item) => (
                <blockquote
                  key={item.quote}
                  className="gsap-slide-item border-l border-primary/70 pl-8 md:pl-10"
                >
                  <p className="text-2xl font-medium leading-snug tracking-tight md:text-4xl md:leading-tight">
                    {item.quote}
                  </p>
                  <p className="mt-6 text-base leading-7 text-muted-foreground">
                    {item.detail}
                  </p>
                </blockquote>
              ))}
            </div>
          </Chapter>
        </div>

        <Separator className="my-20 bg-border/60" />

        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="gsap-slide-item md:border-l md:border-border/50 md:pl-8 md:first:border-l-0 md:first:pl-0"
            >
              <p className="text-4xl font-black tracking-tight md:text-5xl">
                <AnimatedCounter
                  to={stat.to}
                  suffix={stat.suffix}
                  delay={index * 0.12}
                />
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Chapter({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] lg:gap-16">
      <div className="lg:sticky lg:top-28">
        <span className="block text-[18vw] font-black leading-none text-foreground/6 lg:text-[7vw]">
          {index}
        </span>
        <TextScramble
          text={label.toUpperCase()}
          className="-mt-6 text-sm font-semibold tracking-[0.32em] text-primary"
        />
      </div>
      <div>{children}</div>
    </div>
  );
}
