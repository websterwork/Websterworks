import type { Metadata } from "next";
import { siteConfig } from "./site";

const baseUrl =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : siteConfig.url;

export const metadataConfig: Metadata = {
    metadataBase: new URL( baseUrl ),

    title: {
        default: siteConfig.title,
        template: `%s | ${ siteConfig.name }`,
    },

    description: siteConfig.description,
    applicationName: siteConfig.name,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",

    keywords: [
        "Web Development",
        "Software Development",
        "AI Solutions",
        "Artificial Intelligence",
        "Web Applications",
        "Next.js",
        "React",
        "Node.js",
        "NestJS",
        "TypeScript",
        "UI UX",
        "Cloud",
        "Automation",
        "SEO",
        "Digital Agency",
        "Pakistan",
        "Lahore",
        "Websterwork",
    ],

    authors: [ { name: siteConfig.company.name, url: siteConfig.url } ],
    creator: siteConfig.company.name,
    publisher: siteConfig.company.name,
    category: "Technology",

    alternates: { canonical: "/" },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    openGraph: {
        type: "website",
        locale: siteConfig.locale,
        url: siteConfig.url,
        title: siteConfig.title,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.images.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.title,
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
        images: [ siteConfig.images.ogImage ],
        site: "@webs_terwork",
        creator: "@webs_terwork",
    },

    icons: {
        icon: [
            {
                media: "(prefers-color-scheme: light)",
                url: siteConfig.images.faviconLightMode,
                href: siteConfig.images.faviconLightMode,
            },
            {
                media: "(prefers-color-scheme: dark)",
                url: siteConfig.images.faviconDarkMode,
                href: siteConfig.images.faviconDarkMode,
            },
        ],
        apple: siteConfig.images.appleIcon,
        shortcut: siteConfig.images.favicon,
    },
};