// src/app/(marketing)/resources/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { navigationConfig } from "@/config/navigation";
import { Container } from "@/components/common/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { BorderBeam } from "@/components/effects/BorderBeam";
import { Newspaper, ArrowRight } from "lucide-react";

// Find the Resources item from main navigation in navigationConfig
const resourcesNavItem = navigationConfig.main.find(
  (item) => item.href === "/resources"
);

// Derive sub-navigation items dynamically from navigationConfig
const resourceCategories = (resourcesNavItem?.children || []).map((child) => ({
  id: child.href.replace("/resources/", ""), // e.g. "featured", "blogs", "case-studies"
  label: child.title,
  href: child.href,
  description: child.description,
}));

// Mock dataset representing resources items linked across categories
const allResources = [
  {
    id: 1,
    category: "featured",
    title: "Scaling Next.js Enterprise Applications in 2026",
    excerpt: "Discover architectural patterns and server-side optimization techniques used by top engineering teams.",
    readTime: "6 min read",
    date: "Oct 2026",
  },
  {
    id: 2,
    category: "blogs",
    title: "The Rise of Autonomous AI Agents in Web Development",
    excerpt: "How generative AI and custom LLM workflows are transforming how developers write and maintain code.",
    readTime: "4 min read",
    date: "Sep 2026",
  },
  {
    id: 3,
    category: "case-studies",
    title: "Transforming FinTech Security: A Global Banking Case Study",
    excerpt: "How Websterwork engineered a SOC 2 Type II compliant platform handling millions in daily transactions.",
    readTime: "8 min read",
    date: "Aug 2026",
  },
  {
    id: 4,
    category: "guides",
    title: "Complete Blueprint for Zero-Downtime Database Migrations",
    excerpt: "Step-by-step instructions for safely updating production databases without disrupting active user sessions.",
    readTime: "12 min read",
    date: "Jul 2026",
  },
  {
    id: 5,
    category: "topics",
    title: "TypeScript Advanced Generics & Utility Types Explained",
    excerpt: "A deep dive into building highly reusable and type-safe component libraries.",
    readTime: "5 min read",
    date: "Jun 2026",
  },
  {
    id: 6,
    category: "webinars",
    title: "Live Workshop: Modern UI/UX Architecture with Tailwind & Motion",
    excerpt: "Watch our lead designers and engineers build high-performing animated dashboards from scratch.",
    readTime: "45 min watch",
    date: "May 2026",
  },
  {
    id: 7,
    category: "white-papers",
    title: "Enterprise Cybersecurity Report: Mitigating API Vulnerabilities",
    excerpt: "Comprehensive research into modern penetration testing methodologies and endpoint security.",
    readTime: "20 min read",
    date: "Apr 2026",
  },
  {
    id: 8,
    category: "tools",
    title: "Websterwork JSON-LD Schema Generator Utility",
    excerpt: "Free developer tool to instantly generate valid structured data markup for SEO optimization.",
    readTime: "Interactive Tool",
    date: "Updated Daily",
  },
  {
    id: 9,
    category: "faqs",
    title: "What is Websterwork's standard project kickoff timeline?",
    excerpt: "Learn about our 5-phase execution roadmap from initial discovery to production deployment.",
    readTime: "2 min read",
    date: "Always Active",
  },
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("featured");

  // Filter resources based on selected tab
  const filteredResources = allResources.filter(
    (item) => item.category === activeTab
  );

  const activeCategoryMeta = resourceCategories.find((c) => c.id === activeTab);

  return (
    <div className="relative min-h-screen bg-background text-foreground pt-32 pb-24 overflow-hidden">
      {/* Background Decorative Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#181820_1px,transparent_1px),linear-gradient(to_bottom,#181820_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <Container className="relative z-10 space-y-16">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur-md shadow-lg">
              <Newspaper className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                Knowledge & Intelligence Hub
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
              Insights, Guides & <span className="text-primary">Resources</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Explore our curated library of engineering blogs, technical white papers, client success stories, and developer tools.
            </p>
          </FadeIn>
        </div>

        {/* Real-time Category Navigation Bar from navigationConfig */}
        <FadeIn delay={0.3}>
          <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 gap-2 scrollbar-none">
            {resourceCategories.map((cat) => {
              const isActive = activeTab === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 border ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                      : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Active Category Meta Header */}
        {activeCategoryMeta && (
          <div className="bg-card/40 border border-border/60 rounded-2xl p-6 md:p-8 backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-primary">
                Current View
              </span>
              <h2 className="text-2xl font-bold text-foreground">
                {activeCategoryMeta.label}
              </h2>
              <p className="text-sm text-muted-foreground">
                {activeCategoryMeta.description}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary text-xs font-mono text-muted-foreground border border-border">
              {filteredResources.length} Item{filteredResources.length === 1 ? "" : "s"} Available
            </span>
          </div>
        )}

        {/* Real-time Filtered Resources List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.length > 0 ? (
            filteredResources.map((item, index) => (
              <FadeIn key={item.id} delay={0.05 * index}>
                <div className="relative group rounded-2xl bg-card border border-border p-8 h-full flex flex-col justify-between transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                  <BorderBeam size={120} duration={5} colorFrom="#9810fa" colorTo="transparent" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span className="uppercase text-primary font-semibold">{item.category}</span>
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground/80">
                      {item.readTime}
                    </span>
                    <Link
                      href={`/resources/${item.category}/${item.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:underline"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4 rounded-2xl bg-card border border-border">
              <p className="text-lg text-muted-foreground">No resources found under this category at the moment.</p>
              <button
                onClick={() => setActiveTab("featured")}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
              >
                Back to Featured
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}