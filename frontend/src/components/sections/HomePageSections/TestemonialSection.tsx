"use client";

/**
 * -----------------------------------------------------------------------------
 * Homepage Testimonials Section
 * -----------------------------------------------------------------------------
 *
 * High-performance feedback grid with glowing void aesthetic, interactive cards,
 * and unified background effects.
 *
 * -----------------------------------------------------------------------------
 */

import Image from "next/image";
import { Sparkles, Star, Quote } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Aurora, Spotlight, GradientBlur } from "@/components/effects";
import { FadeIn, Reveal, Magnetic } from "@/components/animations";
import { Container } from "@/components/common";

const testimonials = [
  {
    quote:
      "WebsterWork transformed our e-commerce operations completely. Their team integrated Next.js 15 and custom Zod validation flows that boosted our conversion rates by 140% within weeks.",
    author: "Alex Morgan",
    role: "VP of Product",
    company: "Apex Global",
    avatar: "/images/testimonials/alex.jpg",
    rating: 5,
  },
  {
    quote:
      "The 3D interactive web experiences they built using React Three Fiber set us miles ahead of our competitors. Real 60 FPS performance combined with sleek UI branding.",
    author: "Sarah Chen",
    role: "Founder & CEO",
    company: "Nexus Interactive",
    avatar: "/images/testimonials/sarah.jpg",
    rating: 5,
  },
  {
    quote:
      "Scalable middleware routing and flawless UI implementation. Working with their team felt like having a senior engineering squad in-house from day one.",
    author: "David Miller",
    role: "CTO",
    company: "M² Enterprise",
    avatar: "/images/testimonials/david.jpg",
    rating: 5,
  },
];

export function TestimonialSection() {
  return (
    <section className="relative overflow-hidden py-20 text-foreground sm:py-24 md:py-28 lg:py-32">
      {/* Shared Void Background Stack */}
      <Aurora />
      <Spotlight />
      <GradientBlur />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Badge className="mb-5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur-md sm:mb-6 sm:px-4 sm:py-2 sm:text-xs sm:tracking-widest">
              <Sparkles className="mr-1.5 size-3 sm:mr-2 sm:size-3.5" />
              Client Validation
            </Badge>
          </Reveal>

          <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Trusted by Builders & Industry Leaders
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7 md:text-lg">
            See how our high-performance digital products and AI-powered
            workflows help engineering teams and businesses scale faster.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:gap-6 md:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((item, index) => (
            <FadeIn key={item.author} delay={index * 0.2}>
              <Magnetic>
                <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-primary/20 bg-card/60 p-5 backdrop-blur-2xl transition-all duration-500 hover:border-primary hover:shadow-[0_0_35px_rgba(152,16,250,0.25)] sm:rounded-3xl sm:p-6 md:p-7 lg:p-8">
                  {/* Quote Icon Overlay */}
                  <div className="absolute right-5 top-5 text-primary/15 transition-colors duration-500 group-hover:text-primary/30 sm:right-6 sm:top-6">
                    <Quote className="size-8 sm:size-10" />
                  </div>

                  <div>
                    {/* Star Rating */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-3.5 fill-primary text-primary sm:size-4"
                        />
                      ))}
                    </div>

                    {/* Quote Content */}
                    <p className="mt-5 text-sm leading-6 text-muted-foreground transition-colors duration-300 group-hover:text-foreground/90 sm:mt-6 sm:leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="mt-7 flex items-center gap-3 border-t border-border/40 pt-5 sm:mt-8 sm:gap-4 sm:pt-6">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-primary/30 bg-muted sm:size-12">
                      <Image
                        src={item.avatar}
                        alt={item.author}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-bold text-foreground">
                        {item.author}
                      </h4>

                      <p className="truncate font-mono text-[10px] text-muted-foreground sm:text-xs">
                        {item.role} •{" "}
                        <span className="text-primary">{item.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Magnetic>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
