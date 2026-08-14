/**
 * -----------------------------------------------------------------------------
 * WebPage Schema
 * -----------------------------------------------------------------------------
 * Generates the Schema.org WebPage JSON-LD.
 *
 * Used on:
 * • Home
 * • About
 * • Services
 * • Industries
 * • Contact
 * • Resources
 * • Blogs
 * • Custom Pages
 *
 * https://schema.org/WebPage
 * -----------------------------------------------------------------------------
 */

import { siteConfig } from "@/config/site";
import { createSchema, absoluteUrl } from "./helpers";
import type { WebPageSchemaOptions } from "./types";

/* -------------------------------------------------------------------------- */
/* WebPage Schema                                                             */
/* -------------------------------------------------------------------------- */

export function webpageSchema ( {
    title,
    description,
    url,
}: WebPageSchemaOptions )
{
    return createSchema( {
        "@context": "https://schema.org",

        "@type": "WebPage",

        name: title,

        headline: title,

        description,

        url: absoluteUrl( url ),

        inLanguage: siteConfig.language,

        isPartOf: {
            "@type": "WebSite",

            name: siteConfig.name,

            url: siteConfig.url,
        },

        about: {
            "@type": "Organization",

            name: siteConfig.company.name,
        },

        publisher: {
            "@type": "Organization",

            name: siteConfig.company.name,
        },
    } );
}