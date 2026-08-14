/**
 * -----------------------------------------------------------------------------
 * Website Schema
 * -----------------------------------------------------------------------------
 * Generates the Schema.org WebSite JSON-LD.
 *
 * Used on:
 * • Root Layout
 * • Home Page
 *
 * https://schema.org/WebSite
 * -----------------------------------------------------------------------------
 */

import { siteConfig } from "@/config/site";
import { createSchema, absoluteUrl } from "./helpers";

/* -------------------------------------------------------------------------- */
/* Website Schema                                                             */
/* -------------------------------------------------------------------------- */

export function websiteSchema ()
{
    return createSchema( {
        "@context": "https://schema.org",

        "@type": "WebSite",

        name: siteConfig.name,

        alternateName: siteConfig.shortName,

        url: siteConfig.url,

        description: siteConfig.description,

        inLanguage: siteConfig.language,

        publisher: {
            "@type": "Organization",

            name: siteConfig.company.name,
        },

        potentialAction: {
            "@type": "SearchAction",

            target: {
                "@type": "EntryPoint",

                urlTemplate: `${ absoluteUrl( "/search" ) }?q={search_term_string}`,
            },

            "query-input": "required name=search_term_string",
        },
    } );
}