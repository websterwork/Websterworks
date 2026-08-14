import { siteConfig } from "@/config/site";
import
    {
        absoluteUrl,
        createSchema,
        imageObject,
        organization,
        person,
    } from "./helpers";
import type { BlogPostingSchemaOptions } from "./types";

export function blogPostingSchema ( {
    title,
    description,
    url,
    author,
    publishedAt,
    updatedAt,
    image,
    keywords,
    articleSection,
    wordCount,
}: BlogPostingSchemaOptions )
{
    return createSchema( {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        url: absoluteUrl( url ),
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": absoluteUrl( url ),
        },
        author: person( author ),
        publisher: organization(),
        image: image
            ? imageObject( image )
            : imageObject( siteConfig.images.ogImage ),
        datePublished: publishedAt,
        dateModified: updatedAt,
        inLanguage: siteConfig.language,
        keywords,
        articleSection,
        wordCount,
        isPartOf: {
            "@type": "Blog",
            name: `${ siteConfig.name } Blog`,
        },
    } );
}