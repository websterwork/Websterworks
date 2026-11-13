/**
 * -----------------------------------------------------------------------------
 * Root Layout
 * -----------------------------------------------------------------------------
 * Main application wrapper.
 *
 * Responsibilities:
 * • Global metadata
 * • Global CSS
 * • Font loading
 * • Application providers
 * • Global JSON-LD structured data
 * • HTML language configuration
 *
 * -----------------------------------------------------------------------------
 */
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script"; // <-- Native Next.js Script for optimized GTM loading
/* -------------------------------------------------------------------------- */
/* Providers                                                                  */
/* -------------------------------------------------------------------------- */

import { Providers } from "@/providers/Providers";

import "./globals.css";

/* -------------------------------------------------------------------------- */
/* Config & Helpers                                                           */
/* -------------------------------------------------------------------------- */

import { metadataConfig } from "@/config/metadata";
import { socialLinks } from "@/lib/seo/jsonld/helpers";

/* -------------------------------------------------------------------------- */
/* SEO                                                                        */
/* -------------------------------------------------------------------------- */

import {
  StructuredData,
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/seo";

/* -------------------------------------------------------------------------- */
/* Metadata                                                                   */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = metadataConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const activeSocials = socialLinks();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Render rel="me" tags for extensions and cross-domain verification */}
        {activeSocials.map((url) => (
          <link key={url} rel="me" href={url} />
        ))}
        {/* Preconnect hints to eliminate GTM connection latency */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body>
        {/* ------------------------------------------------------ */}
        {/* Global JSON-LD                                         */}
        {/* ------------------------------------------------------ */}
        <StructuredData
          data={[organizationSchema(), websiteSchema(), localBusinessSchema()]}
        />

        {/* --------------------------------------------------------------------------*/}
        {/* OPTIMIZED GTM VIA NEXT/SCRIPT (Lazy Loaded)                              */}
        {/* --------------------------------------------------------------------------*/}
        <Script
          id="google-tag-manager"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-5VZXN6F9"
        />

        {/* ---------------------------------------------------------- */}
        {/* Global Providers                                           */}
        {/* ---------------------------------------------------------- */}
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}