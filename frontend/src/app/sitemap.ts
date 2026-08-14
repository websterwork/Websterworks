// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap (): MetadataRoute.Sitemap
{
    return [
        {
            url: 'https://www.websterwork.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        // Add more URLs here
    ]
}