// src/app/(marketing)/services/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { generateSEO } from "@/config/seo";
import { Container } from "@/components/common/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { ServiceHeaderSection } from "@/components/sections/ServicesPageSections/ServiceHeaderSection";
import { CheckCircle2, Layers, Cpu, Workflow, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BorderBeam } from "@/components/effects/BorderBeam";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return generateSEO({
      title: "Service Not Found | Websterwork",
      description: "The requested service could not be found.",
      path: "/services",
      noIndex: true,
    });
  }

  return generateSEO({
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* 1. Header Section */}
      <ServiceHeaderSection service={service} />

      {/* 2. Technologies Section */}
      {service.technologies && service.technologies.length > 0 && (
        <section className="py-20 relative border-t border-border/40 bg-card/20">
          <Container className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-mono uppercase tracking-wider text-primary">
                <Cpu className="w-3.5 h-3.5" /> Stack & Tech
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Technologies We Master</h2>
              <p className="text-muted-foreground">
                Built using industry-leading tools and robust frameworks for maximum performance.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {service.technologies.map((tech, idx) => (
                <FadeIn key={idx} delay={0.05 * idx}>
                  <div className="p-6 rounded-xl bg-card border border-border text-center space-y-2 hover:border-primary/50 transition-all duration-300 group">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tech.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{tech.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 3. Features & Benefits Section */}
      <section className="py-24 relative">
        <Container className="space-y-20">
          {/* Features */}
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-mono uppercase tracking-wider text-primary">
                <Layers className="w-3.5 h-3.5" /> Capabilities
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Key Features & Offerings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.features.map((feature, idx) => (
                <FadeIn key={idx} delay={0.1 * idx}>
                  <div className="relative p-8 rounded-2xl bg-card border border-border space-y-3 h-full group hover:border-primary/50 transition-all">
                    <BorderBeam size={100} duration={5} colorFrom="#9810fa" colorTo="transparent" />
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold font-mono">
                      0{idx + 1}
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Benefits */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="space-y-12 pt-12 border-t border-border/40">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Why Choose This Service</h2>
                <p className="text-muted-foreground">Tangible business advantages delivered with every engagement.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.benefits.map((benefit, idx) => (
                  <FadeIn key={idx} delay={0.1 * idx}>
                    <div className="p-6 rounded-xl bg-card/60 border border-border space-y-3 h-full">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                      <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* 4. Development Process */}
      {service.process && service.process.length > 0 && (
        <section className="py-24 relative bg-card/20 border-t border-border/40">
          <Container className="space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-mono uppercase tracking-wider text-primary">
                <Workflow className="w-3.5 h-3.5" /> Roadmap
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Our Execution Process</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {service.process.map((step, idx) => (
                <FadeIn key={idx} delay={0.1 * idx}>
                  <div className="p-6 rounded-2xl bg-card border border-border space-y-4 relative h-full flex flex-col justify-between">
                    <span className="text-3xl font-extrabold text-primary/40 font-mono">
                      0{step.step}
                    </span>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 5. Deliverables & FAQs */}
      <section className="py-24 relative">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Deliverables */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">What You Get</h2>
              <p className="text-muted-foreground">Guaranteed assets and project handoff components.</p>
            </div>

            <div className="space-y-3">
              {service.deliverables.map((deliv, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-medium text-foreground">{deliv.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-mono uppercase tracking-wider text-primary">
                <HelpCircle className="w-3.5 h-3.5" /> Support
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-card border border-border space-y-2">
                  <h3 className="font-semibold text-foreground text-lg">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Bottom CTA Section */}
      <section className="py-20 relative bg-card/40 border-t border-border/40 text-center">
        <Container className="max-w-3xl space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{service.cta.title}</h2>
          <p className="text-lg text-muted-foreground">{service.cta.description}</p>
          <div>
            <Link
              href={service.cta.href}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all shadow-xl shadow-primary/25"
            >
              <span>{service.cta.button}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}