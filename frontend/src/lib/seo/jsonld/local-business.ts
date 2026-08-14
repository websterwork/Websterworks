/**
 * -----------------------------------------------------------------------------
 * Local Business Schema
 * -----------------------------------------------------------------------------
 * Generates the Schema.org LocalBusiness JSON-LD.
 *
 * Used on:
 * • Home
 * • Contact
 * • About
 *
 * Supports:
 * • Google Business Profile
 * • Local SEO
 * • Google Maps
 *
 * https://schema.org/LocalBusiness
 * -----------------------------------------------------------------------------
 */

import { siteConfig } from "@/config/site";

import
    {
        absoluteUrl,
        createSchema,
        imageObject,
        socialLinks,
    } from "./helpers";

/* -------------------------------------------------------------------------- */
/* Local Business Schema                                                      */
/* -------------------------------------------------------------------------- */

export function localBusinessSchema ()
{
    return createSchema( {
        "@context": "https://schema.org",

        "@type": "ProfessionalService",

        "@id": `${ siteConfig.url }#organization`,

        name: siteConfig.company.name,

        description: siteConfig.description,

        url: siteConfig.url,

        image: imageObject( siteConfig.images.ogImage ),

        logo: imageObject( siteConfig.images.logoLightMode ),

        email: siteConfig.company.email,

        telephone: siteConfig.company.phone,

        address: {
            "@type": "PostalAddress",

            streetAddress: siteConfig.company.address,

            addressLocality: siteConfig.company.city,

            addressCountry: siteConfig.company.country,
        },

        areaServed: {
            "@type": "Place",

            name: "Worldwide",
        },

        priceRange: "$$",

        sameAs: socialLinks(),
    } );
}