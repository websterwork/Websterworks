// src/app/(marketing)/industries/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { generateSEO } from "@/config/seo";
import { Container } from "@/components/common/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { industries } from "@/data/industries";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import { BorderBeam } from "@/components/effects/BorderBeam";

export const metadata: Metadata = generateSEO({
  title: "Industries We Serve | Websterwork",
  description:
    "Explore Websterwork's tailored digital transformation and software solutions across IT & Technology, Healthcare, Finance, Education, IoT, and more.",
  path: "/industries",
  keywords: [
    "Industry Solutions",
    "Healthcare Software Development",
    "Fintech Solutions",
    "EdTech Platforms",
    "Enterprise IT Solutions",
  ],
});

export default function IndustriesPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground pt-32 pb-24 overflow-hidden">
      {/* Background Decorative Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#181820_1px,transparent_1px),linear-gradient(to_bottom,#181820_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <Container className="relative z-10 space-y-16">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur-md shadow-lg">
              <Building2 className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                Domain Expertise
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
              Tailored Solutions for <span className="text-primary">Every Industry</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              We engineer specialized digital platforms, compliance-ready systems, and robust infrastructure tuned to the exact demands of your sector.
            </p>
          </FadeIn>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {industries.map((industry, index) => (
            <FadeIn key={industry.id} delay={0.1 * index}>
              <div className="relative group rounded-2xl bg-card border border-border p-8 h-full flex flex-col justify-between transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                <BorderBeam size={150} duration={6} colorFrom="#9810fa" colorTo="transparent" />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-primary">
                      Sector 0{index + 1}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {industry.hero.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {industry.hero.shortDescription}
                    </p>
                  </div>

                  {/* Solutions count or quick preview */}
                  {industry.solutions && (
                    <div className="space-y-2 pt-2 border-t border-border/40">
                      <p className="text-xs font-semibold uppercase text-muted-foreground/80 tracking-wider">
                        Featured Offerings:
                      </p>
                      {industry.solutions.slice(0, 3).map((sol, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="truncate">{sol.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Link */}
                <div className="pt-8 mt-8 border-t border-border/60 flex items-center justify-between">
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:underline"
                  >
                    <span>Explore Industry</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <span className="text-xs font-mono text-muted-foreground/60 uppercase">
                    {industry.id}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </div>
  );
}