/**
 * -----------------------------------------------------------------------------
 * Twitter Card Generator
 * -----------------------------------------------------------------------------
 * Generates Twitter/X card metadata.
 *
 * Used by:
 * • Twitter
 * • X
 *
 * Responsibilities:
 * • Generate card type
 * • Generate title
 * • Generate description
 * • Generate preview image
 *
 * -----------------------------------------------------------------------------
 */


import { siteConfig } from "@/config/site";


/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface TwitterOptions
{

    title?: string;

    description?: string;

    image?: string;

}



/* -------------------------------------------------------------------------- */
/* Twitter Card Generator                                                     */
/* -------------------------------------------------------------------------- */

export function generateTwitterCard ( {
    title,
    description,
    image,
}: TwitterOptions = {} )
{

    return {

        card: "summary_large_image",


        title:
            title ?? siteConfig.title,


        description:
            description ?? siteConfig.description,


        images: [
            image ?? siteConfig.images.ogImage,
        ],
    };
}