import { siteConfig } from "@/config/site";
import
    {
        absoluteUrl,
        createSchema,
        imageObject,
        organization,
    } from "./helpers";
import type { ServiceSchemaOptions } from "./types";

export function serviceSchema ( {
    name,
    description,
    slug,
    image,
}: ServiceSchemaOptions )
{
    return createSchema( {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: absoluteUrl( `/services/${ slug }` ),
        image: image
            ? imageObject( image )
            : imageObject( siteConfig.images.ogImage ),
        provider: organization(),
        serviceType: name,
        category: "Software Development",
        areaServed: {
            "@type": "Place",
            name: "Worldwide",
        },
        availableLanguage: [ "English" ],
        brand: {
            "@type": "Brand",
            name: siteConfig.company.name,
        },
        audience: {
            "@type": "BusinessAudience",
        },
        termsOfService: absoluteUrl( "/terms" ),
    } );
}