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

import React from "react";
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
    <section className="relative overflow-hidden py-32 text-foreground">
      {/* Shared Void Background Stack */}
      <Aurora />
      <Spotlight />
      <GradientBlur />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Badge className="mb-6 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-md">
              <Sparkles className="mr-2 size-3.5" /> Client Validation
            </Badge>
          </Reveal>

          <h2 className="text-3xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Trusted by Builders & Industry Leaders
          </h2>

          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            See how our high-performance digital products and AI-powered
            workflows help engineering teams and businesses scale faster.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <FadeIn key={item.author} delay={index * 0.2}>
              <Magnetic>
                <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-primary/20 bg-card/60 p-8 backdrop-blur-2xl transition-all duration-500 hover:border-primary hover:shadow-[0_0_35px_rgba(152,16,250,0.25)]">
                  {/* Quote Icon Overlay */}
                  <div className="absolute right-6 top-6 text-primary/15 transition-colors duration-500 group-hover:text-primary/30">
                    <Quote className="size-10" />
                  </div>

                  <div>
                    {/* Star Rating */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-4 fill-primary text-primary"
                        />
                      ))}
                    </div>

                    {/* Quote Content */}
                    <p className="mt-6 font-sans text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/90">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="mt-8 flex items-center gap-4 border-t border-border/40 pt-6">
                    <div className="relative size-12 overflow-hidden rounded-full border border-primary/30 bg-muted">
                      {/* Avatar Image Fallback Container */}
                      <Image
                        src={item.avatar}
                        alt={item.author}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-foreground">
                        {item.author}
                      </h4>
                      <p className="font-mono text-xs text-muted-foreground">
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
