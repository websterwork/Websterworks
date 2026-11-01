// src/app/(marketing)/industries/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { generateSEO } from "@/config/seo";
import { Container } from "@/components/common/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { industries } from "@/data/industries";
import { ArrowRight, ShieldCheck, TrendingUp, Workflow, HelpCircle, CheckCircle2 } from "lucide-react";
import { BorderBeam } from "@/components/effects/BorderBeam";

interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    return generateSEO({
      title: "Industry Not Found | Websterwork",
      description: "The requested industry sector could not be found.",
      path: "/industries",
      noIndex: true,
    });
  }

  return generateSEO({
    title: industry.seo.title,
    description: industry.seo.description,
    keywords: industry.seo.keywords,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* 1. Header Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#181820_1px,transparent_1px),linear-gradient(to_bottom,#181820_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur-md shadow-lg">
                <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                  Industry Focus
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                {industry.hero.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg sm:text-2xl font-medium text-muted-foreground max-w-2xl mx-auto">
                {industry.hero.subtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base sm:text-lg text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
                {industry.hero.longDescription}
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 2. Challenge & Solution Overview */}
      {industry.overview && (
        <section className="py-20 relative border-t border-border/40 bg-card/20">
          <Container className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-card border border-border space-y-4">
                <h3 className="text-xl font-bold text-destructive">The Industry Challenge</h3>
                <p className="text-muted-foreground leading-relaxed">{industry.overview.challenge}</p>
              </div>
              <div className="p-8 rounded-2xl bg-card border border-border space-y-4">
                <h3 className="text-xl font-bold text-primary">Websterwork Solution</h3>
                <p className="text-muted-foreground leading-relaxed">{industry.overview.solution}</p>
              </div>
            </div>

            {/* Target Audience */}
            {industry.overview.targetAudience && industry.overview.targetAudience.length > 0 && (
              <div className="space-y-8 pt-6">
                <h3 className="text-2xl font-bold text-center">Who We Support in {industry.hero.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {industry.overview.targetAudience.map((target, idx) => (
                    <FadeIn key={idx} delay={0.1 * idx}>
                      <div className="p-6 rounded-xl bg-card border border-border space-y-2 h-full">
                        <h4 className="font-semibold text-foreground">{target.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{target.description}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* 3. Solutions & Deliverables */}
      {industry.solutions && industry.solutions.length > 0 && (
        <section className="py-24 relative">
          <Container className="space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Specialized Solutions</h2>
              <p className="text-muted-foreground">Comprehensive capabilities designed for this sector.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industry.solutions.map((sol, idx) => (
                <FadeIn key={idx} delay={0.1 * idx}>
                  <div className="relative p-8 rounded-2xl bg-card border border-border space-y-4 h-full flex flex-col justify-between group hover:border-primary/50 transition-all">
                    <BorderBeam size={120} duration={5} colorFrom="#9810fa" colorTo="transparent" />
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-primary">
                        {sol.serviceCategory}
                      </span>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {sol.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{sol.description}</p>
                    </div>

                    {sol.deliverables && sol.deliverables.length > 0 && (
                      <div className="space-y-2 pt-4 border-t border-border/60">
                        {sol.deliverables.map((deliv, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 4. Impacts & Compliance */}
      {(industry.impacts || industry.compliance) && (
        <section className="py-24 relative bg-card/20 border-t border-border/40">
          <Container className="space-y-20">
            {/* Impacts */}
            {industry.impacts && industry.impacts.length > 0 && (
              <div className="space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-mono uppercase tracking-wider text-primary">
                    <TrendingUp className="w-3.5 h-3.5" /> Proven Results
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">Measurable Impact</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {industry.impacts.map((imp, idx) => (
                    <FadeIn key={idx} delay={0.1 * idx}>
                      <div className="p-8 rounded-2xl bg-card border border-border text-center space-y-3">
                        <div className="text-4xl sm:text-5xl font-extrabold text-primary font-mono">
                          {imp.metric}
                        </div>
                        <h4 className="font-bold text-lg text-foreground">{imp.label}</h4>
                        <p className="text-xs text-muted-foreground">{imp.description}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            )}

            {/* Compliance */}
            {industry.compliance && industry.compliance.length > 0 && (
              <div className="space-y-12 pt-12 border-t border-border/40">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-mono uppercase tracking-wider text-primary">
                    <ShieldCheck className="w-3.5 h-3.5" /> Security & Standards
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">Compliance & Governance</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {industry.compliance.map((comp, idx) => (
                    <FadeIn key={idx} delay={0.1 * idx}>
                      <div className="p-6 rounded-xl bg-card border border-border space-y-2 h-full">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                        <h4 className="font-semibold text-foreground">{comp.standard}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{comp.description}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* 5. FAQs */}
      {industry.faqs && industry.faqs.length > 0 && (
        <section className="py-24 relative">
          <Container className="max-w-3xl space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-mono uppercase tracking-wider text-primary">
                <HelpCircle className="w-3.5 h-3.5" /> FAQ
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {industry.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-card border border-border space-y-2">
                  <h3 className="font-semibold text-foreground text-lg">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 6. CTA Section */}
      <section className="py-20 relative bg-card/40 border-t border-border/40 text-center">
        <Container className="max-w-3xl space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{industry.cta.title}</h2>
          <p className="text-lg text-muted-foreground">{industry.cta.description}</p>
          <div>
            <Link
              href={industry.cta.href}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all shadow-xl shadow-primary/25"
            >
              <span>{industry.cta.button}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}