import { siteConfig } from "@/config/site";

export function createSchema<T> ( schema: T ): T
{
    return schema;
}

export function absoluteUrl ( path: string = "/" ): string
{
    if ( path.startsWith( "http" ) )
    {
        return path;
    }

    const baseUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : siteConfig.url;

    const cleanPath = path.startsWith( "/" ) ? path : `/${ path }`;
    return `${ baseUrl }${ cleanPath }`;
}

export function imageObject ( imagePath: string )
{
    return {
        "@type": "ImageObject",
        url: absoluteUrl( imagePath ),
    };
}

export function organization ()
{
    return {
        "@type": "Organization",
        name: siteConfig.company.name,
        url: absoluteUrl( "/" ),
        logo: imageObject( siteConfig.images.logoLightMode ),
        sameAs: socialLinks(),
    };
}

export function person ( name: string )
{
    return {
        "@type": "Person",
        name,
    };
}

export function socialLinks(): string[] {
  return (Object.values(siteConfig.social) as string[]).filter(
    (link) => typeof link === "string" && link.trim().length > 0
  );
}