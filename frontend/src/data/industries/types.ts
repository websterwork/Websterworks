/**
 * -----------------------------------------------------------------------------
 * Industry Types
 * -----------------------------------------------------------------------------
 *
 * Central types for the Industry module.
 * Bridges industry-specific needs with Websterwork service capabilities.
 *
 * -----------------------------------------------------------------------------
 */

export interface IndustryOverview
{
    challenge: string;
    solution: string;
    targetAudience: {
        title: string;
        description: string;
    }[];
}

export interface IndustrySolutionArea
{
    title: string;
    description: string;
    serviceCategory: string; // Maps to your offered services (e.g., "AI Models", "Website Development", "UI/UX Design")
    deliverables: string[];
}

export interface IndustryCompliance
{
    standard: string;
    description: string;
}

export interface IndustryImpact
{
    metric: string;
    label: string;
    description: string;
}

export interface IndustryProcessStep
{
    step: number;
    title: string;
    description: string;
}

export interface IndustryFAQ
{
    question: string;
    answer: string;
}

export interface IndustryCTA
{
    title: string;
    description: string;
    button: string;
    href: string;
}

export interface IndustrySEO
{
    title: string;
    description: string;
    keywords: string[];
}

export interface IndustryAssets
{
    hero: string;
    thumbnail?: string;
    background?: string;
    gallery?: string[];
}

export interface IndustryHero
{
    title: string;
    subtitle: string;
    shortDescription: string;
    longDescription: string;
    accentColor: string;
}

export interface Industry
{
    id: string;
    slug: string;
    hero: IndustryHero;
    assets: IndustryAssets;
    overview: IndustryOverview;
    solutions: IndustrySolutionArea[]; // Industry-specific needs mapped to your agency services
    compliance: IndustryCompliance[];
    impacts: IndustryImpact[];
    process: IndustryProcessStep[];
    faqs: IndustryFAQ[];
    cta: IndustryCTA;
    seo: IndustrySEO;
}