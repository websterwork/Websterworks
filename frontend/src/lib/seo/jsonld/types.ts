/**
 * -----------------------------------------------------------------------------
 * JSON-LD Shared Types
 * -----------------------------------------------------------------------------
 * Shared interfaces used across Schema.org generators.
 * -----------------------------------------------------------------------------
 */

export interface BreadcrumbItem
{
    name: string;
    url: string;
}

export interface FAQItem
{
    question: string;
    answer: string;
}

export interface WebPageSchemaOptions
{
    title: string;
    description: string;
    url: string;
}

export interface ServiceSchemaOptions
{
    name: string;
    description: string;
    slug: string;
    image?: string;
}


export interface BlogPostingSchemaOptions
{
    title: string;
    description: string;
    url: string;

    author: string;

    publishedAt: string;
    updatedAt: string;

    image?: string;

    keywords?: string[];

    articleSection?: string;

    wordCount?: number;
}

export interface IndustrySchemaOptions
{
    name: string;
    description: string;
    slug: string;
    image?: string;
    services?: string[];
}