/**
 * -----------------------------------------------------------------------------
 * Canonical URL Generator
 * -----------------------------------------------------------------------------
 * Generates canonical URLs for SEO.
 *
 * Responsibilities:
 * • Create absolute canonical URLs
 * • Prevent duplicate content issues
 * • Support static and dynamic pages
 *
 * -----------------------------------------------------------------------------
 */

import { siteConfig } from "@/config/site";


/* -------------------------------------------------------------------------- */
/* Canonical URL                                                               */
/* -------------------------------------------------------------------------- */

export function canonicalUrl ( path: string = "/" ): string
{
    const cleanPath = path.startsWith( "/" )
        ? path
        : `/${ path }`;


    return `${ siteConfig.url }${ cleanPath }`;
}


/* -------------------------------------------------------------------------- */
/* Canonical Metadata Helper                                                   */
/* -------------------------------------------------------------------------- */

export function canonicalMetadata ( path: string = "/" )
{
    return {
        alternates: {
            canonical: canonicalUrl( path ),
        },
    };
}