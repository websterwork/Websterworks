// src/components/sections/ServicePageSections/ServiceHeaderSection.tsx
"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { Aurora } from "@/components/effects/Aurora";
import { BorderBeam } from "@/components/effects/BorderBeam";
import type { Service } from "@/data/services/types";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface ServiceHeaderSectionProps {
  service: Service;
}

export function ServiceHeaderSection({ service }: ServiceHeaderSectionProps) {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-background">
      {/* Background Aurora / Glow Effects */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Aurora />
      </div>
      
      {/* Subtle Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#181820_1px,transparent_1px),linear-gradient(to_bottom,#181820_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur-md shadow-lg">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                Websterwork Expertise
              </span>
            </div>
          </FadeIn>

          {/* Main Title */}
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              {service.hero.title}
            </h1>
          </FadeIn>

          {/* Subtitle & Description */}
          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-2xl font-medium text-muted-foreground max-w-2xl mx-auto">
              {service.hero.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-base sm:text-lg text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
              {service.hero.longDescription}
            </p>
          </FadeIn>

          {/* Action Buttons */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href={service.cta.href}
                className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/25 overflow-hidden group"
              >
                <span>{service.cta.button}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                <BorderBeam size={200} duration={5} colorFrom="transparent" colorTo="#ffffff" />
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-foreground bg-card hover:bg-secondary/80 border border-border transition-all duration-300"
              >
                <span>Talk to an Engineer</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}