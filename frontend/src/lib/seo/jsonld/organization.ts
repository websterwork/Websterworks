/**
 * -----------------------------------------------------------------------------
 * Organization Schema
 * -----------------------------------------------------------------------------
 * Generates the Schema.org Organization JSON-LD.
 *
 * Used on:
 * • Root Layout
 * • Home Page
 * • About Page
 *
 * https://schema.org/Organization
 * -----------------------------------------------------------------------------
 */

import { siteConfig } from "@/config/site";
import
    {
        createSchema,
        imageObject,
        socialLinks,
    } from "./helpers";

/* -------------------------------------------------------------------------- */
/* Organization Schema                                                        */
/* -------------------------------------------------------------------------- */

export function organizationSchema ()
{
    return createSchema( {
        "@context": "https://schema.org",

        "@type": "Organization",

        name: siteConfig.company.name,

        url: siteConfig.url,

        logo: imageObject( siteConfig.images.logoLightMode ),

        description: siteConfig.description,

        email: siteConfig.company.email,

        telephone: siteConfig.company.phone,

        address: {
            "@type": "PostalAddress",

            addressLocality: siteConfig.company.city,

            addressCountry: siteConfig.company.country,
        },

        sameAs: socialLinks(),
    } );
}