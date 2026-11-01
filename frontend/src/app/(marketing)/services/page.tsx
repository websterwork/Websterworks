// src/app/(marketing)/services/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { generateSEO } from "@/config/seo";
import { Container } from "@/components/common/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { services } from "@/data/services";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { BorderBeam } from "@/components/effects/BorderBeam";

export const metadata: Metadata = generateSEO({
  title: "Our Services | Websterwork",
  description:
    "Explore Websterwork's comprehensive digital solutions including AI model development, custom web applications, mobile apps, UI/UX design, and cybersecurity.",
  path: "/services",
  keywords: [
    "Web Development Services",
    "AI Solutions",
    "Software Agency Lahore",
    "UI UX Design",
    "Mobile App Development",
  ],
});

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground pt-32 pb-24 overflow-hidden">
      {/* Background Decorative Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#181820_1px,transparent_1px),linear-gradient(to_bottom,#181820_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <Container className="relative z-10 space-y-16">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur-md shadow-lg">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                Comprehensive Digital Solutions
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
              Engineered for <span className="text-primary">Scale & Impact</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              We combine elite technical execution with world-class design to build digital products that drive growth and operational excellence.
            </p>
          </FadeIn>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {services.map((service, index) => (
            <FadeIn key={service.id} delay={0.1 * index}>
              <div className="relative group rounded-2xl bg-card border border-border p-8 h-full flex flex-col justify-between transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                <BorderBeam size={150} duration={6} colorFrom="#9810fa" colorTo="transparent" />
                
                <div className="space-y-6">
                  {/* Service Top Info */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-primary">
                        Service 0{index + 1}
                      </span>
                      <h2 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {service.hero.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-base leading-relaxed">
                    {service.hero.shortDescription}
                  </p>

                  {/* Key Features Preview */}
                  <div className="space-y-2 pt-2">
                    {service.features.slice(0, 3).map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-sm text-muted-foreground/90">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span>{feature.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Link */}
                <div className="pt-8 mt-8 border-t border-border/60 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:underline"
                  >
                    <span>Explore Service Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <span className="text-xs font-mono text-muted-foreground/60 uppercase">
                    {service.id}
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