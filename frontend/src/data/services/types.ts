/**
 * -----------------------------------------------------------------------------
 * Service Types
 * -----------------------------------------------------------------------------
 *
 * Central types for the Services module.
 *
 * Every service should follow this contract.
 *
 * -----------------------------------------------------------------------------
 */

export interface ServiceTechnology
{
    name: string;

    logo?: string;

    description?: string;
}

export interface ServiceFeature
{
    title: string;

    description: string;

    icon?: string;
}

export interface ServiceBenefit
{
    title: string;

    description: string;
}

export interface ServiceProcessStep
{
    step: number;

    title: string;

    description: string;
}

export interface ServiceDeliverable
{
    title: string;

    description?: string;
}

export interface ServiceFAQ
{
    question: string;

    answer: string;
}

export interface ServiceCTA
{
    title: string;

    description: string;

    button: string;

    href: string;
}

export interface ServiceSEO
{
    title: string;

    description: string;

    keywords: string[];
}

export interface ServiceAssets
{
    hero: string;

    thumbnail?: string;

    background?: string;

    gallery?: string[];
}

export interface ServiceHero
{
    title: string;

    subtitle: string;

    shortDescription: string;

    longDescription: string;

    accentColor: string;
}

export interface Service
{
    /**
     * ---------------------------------------------------------------------------
     * Identity
     * ---------------------------------------------------------------------------
     */

    id: string;

    slug: string;

    /**
     * ---------------------------------------------------------------------------
     * Hero
     * ---------------------------------------------------------------------------
     */

    hero: ServiceHero;

    /**
     * ---------------------------------------------------------------------------
     * Assets
     * ---------------------------------------------------------------------------
     */

    assets: ServiceAssets;

    /**
     * ---------------------------------------------------------------------------
     * Technologies
     * ---------------------------------------------------------------------------
     */

    technologies: ServiceTechnology[];

    /**
     * ---------------------------------------------------------------------------
     * Features
     * ---------------------------------------------------------------------------
     */

    features: ServiceFeature[];

    /**
     * ---------------------------------------------------------------------------
     * Benefits
     * ---------------------------------------------------------------------------
     */

    benefits: ServiceBenefit[];

    /**
     * ---------------------------------------------------------------------------
     * Development Process
     * ---------------------------------------------------------------------------
     */

    process: ServiceProcessStep[];

    /**
     * ---------------------------------------------------------------------------
     * Deliverables
     * ---------------------------------------------------------------------------
     */

    deliverables: ServiceDeliverable[];

    /**
     * ---------------------------------------------------------------------------
     * Frequently Asked Questions
     * ---------------------------------------------------------------------------
     */

    faqs: ServiceFAQ[];

    /**
     * ---------------------------------------------------------------------------
     * Call To Action
     * ---------------------------------------------------------------------------
     */

    cta: ServiceCTA;

    /**
     * ---------------------------------------------------------------------------
     * SEO
     * ---------------------------------------------------------------------------
     */

    seo: ServiceSEO;
}