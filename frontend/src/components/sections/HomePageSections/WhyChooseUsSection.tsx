"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".gsap-slide-item");

      items.forEach((item, index) => {
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
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-20 sm:py-24 md:py-28 lg:py-36"
    >
      <GridPattern opacity={0.1} />

      <Glow
        className="left-[-15%] top-[-8%] sm:left-[-8%] sm:top-[-10%]"
        color="bg-primary"
        size={360}
        opacity={0.16}
      />

      <Glow
        className="bottom-[-12%] right-[-18%] sm:bottom-[-16%] sm:right-[-10%]"
        color="bg-accent"
        size={300}
        opacity={0.1}
        duration={9}
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary sm:text-sm sm:tracking-[0.3em]">
            Why choose us
          </p>

          <BlurText
            as="h2"
            className="mt-5 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            Built to last. <TextGradient>Chosen to grow.</TextGradient>
          </BlurText>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-8 sm:text-lg sm:leading-8">
            Websterwork is product thinking, engineering, and design in one
            room. You get a partner that ships — not a vendor that vanishes
            after kickoff.
          </p>
        </div>

        {/* Chapters */}
        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-24 md:mt-24 md:space-y-28">
          {/* Chapter 01 - Product */}
          <Chapter index="01" label="Product">
            <div className="space-y-12 sm:space-y-16">
              {product.map((item) => (
                <article
                  key={item.title}
                  className="gsap-slide-item grid gap-5 border-t border-border/50 pt-7 sm:gap-6 sm:pt-10 md:grid-cols-[5rem_1fr] md:gap-12"
                >
                  <span className="font-mono text-xs tracking-[0.2em] text-primary sm:text-sm">
                    {item.index}
                  </span>

                  <div>
                    <h3 className="text-2xl font-black tracking-tight sm:text-3xl md:text-5xl">
                      {item.title}
                    </h3>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8 md:text-lg">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Chapter>

          {/* Chapter 02 - Process */}
          <Chapter index="02" label="Process">
            <div className="relative pt-2 sm:pt-4">
              <div
                aria-hidden
                className="absolute left-0 right-0 top-[2.15rem] hidden h-px bg-border md:block"
              />

              <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
                {process.map((item) => (
                  <div key={item.step} className="gsap-slide-item relative">
                    <span className="relative z-10 block font-mono text-xs tracking-[0.24em] text-primary sm:text-sm">
                      {item.step}
                    </span>

                    <h3 className="mt-6 text-xl font-black tracking-tight sm:mt-8 sm:text-2xl md:text-3xl">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground sm:mt-3 sm:leading-7 md:text-base">
                      {item.line}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Chapter>

          {/* Chapter 03 - Partnership */}
          <Chapter index="03" label="Partnership">
            <div className="grid gap-10 sm:gap-12 md:grid-cols-2 md:gap-20">
              {partnership.map((item) => (
                <blockquote
                  key={item.quote}
                  className="gsap-slide-item border-l border-primary/70 pl-5 sm:pl-8 md:pl-10"
                >
                  <p className="text-xl font-medium leading-snug tracking-tight sm:text-2xl md:text-4xl md:leading-tight">
                    {item.quote}
                  </p>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-base">
                    {item.detail}
                  </p>
                </blockquote>
              ))}
            </div>
          </Chapter>
        </div>

        <Separator className="my-16 bg-border/60 sm:my-20" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="gsap-slide-item md:border-l md:border-border/50 md:pl-8 md:first:border-l-0 md:first:pl-0"
            >
              <p className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
                <AnimatedCounter
                  to={stat.to}
                  suffix={stat.suffix}
                  delay={index * 0.12}
                />
              </p>

              <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:mt-3 sm:text-xs sm:tracking-[0.22em]">
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
    <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] lg:gap-16">
      <div className="lg:sticky lg:top-28">
        <span className="block text-[20vw] font-black leading-none text-foreground/6 sm:text-[16vw] lg:text-[7vw]">
          {index}
        </span>

        <TextScramble
          text={label.toUpperCase()}
          className="-mt-4 text-xs font-semibold tracking-[0.25em] text-primary sm:-mt-6 sm:text-sm sm:tracking-[0.32em]"
        />
      </div>

      <div>{children}</div>
    </div>
  );
}
