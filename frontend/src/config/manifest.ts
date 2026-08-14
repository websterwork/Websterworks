// src/config/manifest.ts
import type { MetadataRoute } from 'next'
import { siteConfig } from './site'

// Create a properly typed manifest config
export const manifestConfig: MetadataRoute.Manifest = {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    lang: siteConfig.language,
    orientation: 'portrait-primary',
    scope: '/',
    id: siteConfig.name,
    icons: [
        {
            src: siteConfig.images.favicon,
            sizes: 'any',
            type: 'image/x-icon',
        },
        {
            src: siteConfig.images.appleIcon || siteConfig.images.favicon,
            sizes: '180x180',
            type: 'image/png',
        },
        {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
        },
        {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
        },
    ],
}