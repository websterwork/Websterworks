// src/app/manifest.ts
import type { MetadataRoute } from 'next'
import { manifestConfig } from '@/config/manifest'

export default function manifest (): MetadataRoute.Manifest
{
    return manifestConfig
}