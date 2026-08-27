/**
 * ------------------------------------------------------------
 * Websterwork Site Configuration
 * ------------------------------------------------------------
 * Single source of truth for company information.
 * Import this file anywhere the application needs
 * website, branding or contact information.
 * ------------------------------------------------------------
 */

export const siteConfig = {
    name: "Websterwork",
    shortName: "Websterwork",
    title: "Websterwork | Digital Transformation & Web Solutions",
    description:
        "Websterwork builds modern web applications, AI-powered solutions, digital experiences, and scalable software for businesses worldwide.",
    tagline: "Weave, Your Business Web",
    url: "https://www.websterwork.com",
    language: "en",
    locale: "en_US",
    copyright: `© ${ new Date().getFullYear() } Websterwork. All rights reserved.`,

    company: {
        name: "Websterwork",
        email: "info@websterwork.com",
        phone: "+92 313 4385885",
        address: "",
        city: "Lahore",
        country: "Pakistan",
    },

    social: {
        github: "",
        linkedin: "https://www.linkedin.com/company/websterwork",
        facebook: "https://www.facebook.com/Websterwork",
        instagram: "https://www.instagram.com/webs.terwork/",
        x: "https://x.com/webs_terwork",
        threads: "https://www.threads.com/@webs.terwork",
        pinterest: "https://www.pinterest.com/Websterwork/",
        youtube: "",
        whatsapp: "https://wa.me/923134385885",
    },

    images: {
        logoLightMode: "/logos/black-logo.svg",
        logoDarkMode: "/logos/white-logo.svg",
        faviconLightMode: "/logos/black-logo.svg",
        faviconDarkMode: "/logos/white-logo.svg",
        favicon: "/favicon/favicon.ico",
        ogImage: "/og/og.png",
        appleIcon: "/favicon/apple-touch-icon.png",
    },

    contact: {
        info: "info@websterwork.com",
        billing: "billing@websterwork.com",
        support: "support@websterwork.com",
        sales: "sales@websterwork.com",
        careers: "careers@websterwork.com",
    },
} as const;

export type SiteConfig = typeof siteConfig;

