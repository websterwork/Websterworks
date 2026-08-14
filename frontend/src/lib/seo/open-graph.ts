/**
 * -----------------------------------------------------------------------------
 * Open Graph Generator
 * -----------------------------------------------------------------------------
 * Generates Open Graph metadata for social sharing.
 *
 * Used by:
 * • Facebook
 * • LinkedIn
 * • WhatsApp
 * • Discord
 * • Slack
 *
 * Responsibilities:
 * • Generate OG title
 * • Generate OG description
 * • Generate OG images
 * • Maintain consistent branding
 *
 * -----------------------------------------------------------------------------
 */


import { siteConfig } from "@/config/site";


/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface OpenGraphOptions
{

    title?: string;

    description?: string;

    image?: string;

    url?: string;

}



/* -------------------------------------------------------------------------- */
/* Open Graph Generator                                                       */
/* -------------------------------------------------------------------------- */

export function generateOpenGraph ( {
    title,
    description,
    image,
    url,
}: OpenGraphOptions = {} )
{

    return {

        type: "website",

        locale: siteConfig.locale,

        siteName: siteConfig.name,

        title:
            title ?? siteConfig.title,


        description:
            description ?? siteConfig.description,


        url:
            url ?? siteConfig.url,


        images: [
            {
                url:
                    image ?? siteConfig.images.ogImage,

                width: 1200,

                height: 630,

                alt:
                    title ?? siteConfig.title,
            },
        ],
    };
}