/**
 * -----------------------------------------------------------------------------
 * Breadcrumb Schema
 * -----------------------------------------------------------------------------
 * Generates the Schema.org BreadcrumbList JSON-LD.
 *
 * Used on:
 * • About
 * • Services
 * • Industries
 * • Resources
 * • Blogs
 * • Contact
 * • Dynamic Pages
 *
 * https://schema.org/BreadcrumbList
 * -----------------------------------------------------------------------------
 */

import { createSchema, absoluteUrl } from "./helpers";
import type { BreadcrumbItem } from "./types";

/* -------------------------------------------------------------------------- */
/* Breadcrumb Schema                                                          */
/* -------------------------------------------------------------------------- */

export function breadcrumbSchema ( items: BreadcrumbItem[] )
{
    return createSchema( {
        "@context": "https://schema.org",

        "@type": "BreadcrumbList",

        itemListElement: items.map( ( item, index ) => ( {
            "@type": "ListItem",

            position: index + 1,

            name: item.name,

            item: absoluteUrl( item.url ),
        } ) ),
    } );
}