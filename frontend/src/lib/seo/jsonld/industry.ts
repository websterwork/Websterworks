/**
 * -----------------------------------------------------------------------------
 * Industry Schema
 * -----------------------------------------------------------------------------
 * Generates Schema.org JSON-LD for Industry pages.
 *
 * NOTE:
 * Schema.org does not define an "Industry" type.
 * Therefore, industry pages are represented as CollectionPage
 * with a Service as the main entity.
 *
 * Used on:
 * • /industries/*
 *
 * Examples:
 * • Healthcare
 * • Education
 * • Real Estate
 * • Manufacturing
 * • Finance
 *
 * https://schema.org/CollectionPage
 * -----------------------------------------------------------------------------
 */

import { siteConfig } from "@/config/site";

import
    {
        absoluteUrl,
        createSchema,
        imageObject,
        organization,
    } from "./helpers";

import type { IndustrySchemaOptions } from "./types";

/* -------------------------------------------------------------------------- */
/* Industry Schema                                                            */
/* -------------------------------------------------------------------------- */

export function industrySchema ( {
    name,
    description,
    slug,
    image,
    services = [],
}: IndustrySchemaOptions )
{
    return createSchema( {
        "@context": "https://schema.org",

        "@type": "CollectionPage",

        name,

        description,

        url: absoluteUrl( `/industries/${ slug }` ),

        image: image
            ? imageObject( image )
            : imageObject( siteConfig.images.ogImage ),

        provider: organization(),

        audience: {
            "@type": "BusinessAudience",

            audienceType: name,
        },

        about: {
            "@type": "Thing",

            name,
        },

        mainEntity: {
            "@type": "Service",

            provider: organization(),

            serviceType: services,
        },

        isPartOf: {
            "@type": "WebSite",

            name: siteConfig.name,

            url: siteConfig.url,
        },
    } );
}