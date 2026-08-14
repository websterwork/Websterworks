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
/* TAGS MANAGER                                                               */
/* -------------------------------------------------------------------------- */
import { GoogleTagManager } from "@next/third-parties/google";

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
      </head>
      <body>
        {/* ------------------------------------------------------ */}
        {/* Global JSON-LD                                         */}
        {/* ------------------------------------------------------ */}
        <StructuredData
          data={[organizationSchema(), websiteSchema(), localBusinessSchema()]}
        />
        
        {/* --------------------------------------------------------------------------*/}
        {/* TAGS MANAGER                                                              */}
        {/* --------------------------------------------------------------------------*/}
        <GoogleTagManager gtmId="GTM-5VZXN6F9" />

        {/* ---------------------------------------------------------- */}
        {/* Global Providers                                           */}
        {/* ---------------------------------------------------------- */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
