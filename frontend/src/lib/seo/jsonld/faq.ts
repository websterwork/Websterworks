/**
 * -----------------------------------------------------------------------------
 * FAQ Schema
 * -----------------------------------------------------------------------------
 * Generates the Schema.org FAQPage JSON-LD.
 *
 * Used on:
 * • Home
 * • Services
 * • Industries
 * • Contact
 * • Blogs
 *
 * https://schema.org/FAQPage
 * -----------------------------------------------------------------------------
 */

import { createSchema } from "./helpers";
import type { FAQItem } from "./types";

/* -------------------------------------------------------------------------- */
/* FAQ Schema                                                                 */
/* -------------------------------------------------------------------------- */

export function faqSchema ( faqs: FAQItem[] )
{
    return createSchema( {
        "@context": "https://schema.org",

        "@type": "FAQPage",

        mainEntity: faqs.map( ( faq ) => ( {
            "@type": "Question",

            name: faq.question,

            acceptedAnswer: {
                "@type": "Answer",

                text: faq.answer,
            },
        } ) ),
    } );
}