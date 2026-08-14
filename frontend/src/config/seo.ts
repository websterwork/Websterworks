import type { Metadata } from "next";
import { metadataConfig } from "./metadata";
import { siteConfig } from "./site";
import { absoluteUrl } from "@/lib/seo/jsonld/helpers";

type SEOOptions = {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    path?: string;
    noIndex?: boolean;
};

export function generateSEO ( {
    title,
    description,
    keywords = [],
    image,
    path = "",
    noIndex = false,
}: SEOOptions = {} ): Metadata
{
    const pageTitle = title ? `${ title } | ${ siteConfig.name }` : siteConfig.title;
    const pageDescription = description ?? siteConfig.description;
    const pageImage = image ?? siteConfig.images.ogImage;
    const canonical = absoluteUrl( path );

    return {
        ...metadataConfig,
        title: title ? { absolute: pageTitle } : metadataConfig.title,
        description: pageDescription,
        keywords: [ ...( metadataConfig.keywords as string[] ), ...keywords ],
        alternates: { canonical },
        robots: {
            index: !noIndex,
            follow: !noIndex,
        },
        openGraph: {
            ...metadataConfig.openGraph,
            title: pageTitle,
            description: pageDescription,
            url: canonical,
            images: [
                {
                    url: pageImage,
                    width: 1200,
                    height: 630,
                    alt: pageTitle,
                },
            ],
        },
        twitter: {
            ...metadataConfig.twitter,
            title: pageTitle,
            description: pageDescription,
            images: [ pageImage ],
        },
    };
}