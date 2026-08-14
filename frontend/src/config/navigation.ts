/**
 * -----------------------------------------------------------------------------
 * Websterwork Navigation Configuration
 * -----------------------------------------------------------------------------
 * Single source of truth for all application navigation.
 *
 * Used by:
 * • Navbar
 * • Mobile Navigation
 * • Footer
 * • Breadcrumbs
 * • Sitemap Generator
 * • Future Dashboard Navigation
 *
 * -----------------------------------------------------------------------------
 */

import
    {
        Home,
        Info,
        Briefcase,
        Building2,
        Newspaper,
        Mail,
        LogIn,
        UserPlus,
        LucideIcon,
    } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Navigation Types                                                           */
/* -------------------------------------------------------------------------- */

export interface NavItem
{
    title: string;
    href: string;
    description?: string;
    icon?: LucideIcon;
    children?: NavItem[];
}

/* -------------------------------------------------------------------------- */
/* Navigation Config                                                          */
/* -------------------------------------------------------------------------- */

export const navigationConfig = {
    // -------------------------------------------------------------------------
    // Main Navigation
    // -------------------------------------------------------------------------

    main: [
        {
            title: "Home",
            href: "/",
            icon: Home,
        },
        {
            title: "About",
            href: "/about",
            icon: Info,
        },
        {
            title: "Services",
            href: "/services",
            icon: Briefcase,
            children: [
                {
                    title: "AI Models",
                    href: "/services/ai-models",
                    description: "Custom artificial intelligence and machine learning solutions.",
                },
                {
                    title: "Website Development",
                    href: "/services/web-development",
                    description: "Modern, responsive, and high-performance web applications.",
                },
                {
                    title: "Mobile Development",
                    href: "/services/mobile-development",
                    description: "Native and cross-platform apps for iOS and Android.",
                },
                {
                    title: "Game Development",
                    href: "/services/game-development",
                    description: "Immersive 2D and 3D gaming experiences across platforms.",
                },
                {
                    title: "Graphics Design",
                    href: "/services/graphics-design",
                    description: "Visual identity, branding, and promotional design assets.",
                },
                {
                    title: "UI/UX Design",
                    href: "/services/ui-ux-design",
                    description: "User-centric interface and experience design.",
                },
                {
                    title: "Video Editing",
                    href: "/services/video-editing",
                    description: "Professional video post-production and motion graphics.",
                },
                {
                    title: "Content Writing",
                    href: "/services/content-writing",
                    description: "SEO-friendly copy and engagement-focused technical writing.",
                },
                {
                    title: "SEO Optimization",
                    href: "/services/seo",
                    description: "Search engine strategy, technical audits, and organic ranking.",
                },
                {
                    title: "Cyber Security",
                    href: "/services/cyber-security",
                    description: "Application auditing, vulnerability assessments, and protection.",
                },
            ],
        },
        {
            title: "Industries",
            href: "/industries",
            icon: Building2,
            children: [
                {
                    title: "IT & Technology",
                    href: "/industries/technology",
                    description: "Scalable software systems and enterprise IT infra.",
                },
                {
                    title: "Healthcare",
                    href: "/industries/healthcare",
                    description: "HIPAA-compliant platforms and digital health systems.",
                },
                {
                    title: "Finance & Banking",
                    href: "/industries/finance",
                    description: "Fintech integrations, security compliance, and banking solutions.",
                },
                {
                    title: "Education",
                    href: "/industries/education",
                    description: "E-learning applications, LMS integration, and edtech tools.",
                },
                {
                    title: "Manufacturing",
                    href: "/industries/manufacturing",
                    description: "Automation, workflow management, and operational software.",
                },
                {
                    title: "Travel & Hospitality",
                    href: "/industries/travel",
                    description: "Booking engines, portal platforms, and guest management.",
                },
                {
                    title: "Media & Entertainment",
                    href: "/industries/media",
                    description: "Streaming, digital publishing, and distribution engines.",
                },
                {
                    title: "Gaming",
                    href: "/industries/gaming",
                    description: "Interactive real-time game architecture and backend tools.",
                },
                {
                    title: "IoT",
                    href: "/industries/iot",
                    description: "Connected device platforms, telemetry, and edge analytics.",
                },
            ],
        },
        {
            title: "Resources",
            href: "/resources",
            icon: Newspaper,
            children: [
                {
                    title: "Featured",
                    href: "/resources/featured",
                    description: "Our top picked insights and trending stories.",
                },
                {
                    title: "Blogs",
                    href: "/resources/blogs",
                    description: "Industry news, tech breakdowns, and company updates.",
                },
                {
                    title: "Case Studies",
                    href: "/resources/case-studies",
                    description: "In-depth reviews of our client success stories.",
                },
                {
                    title: "Guides",
                    href: "/resources/guides",
                    description: "Comprehensive step-by-step technical and business tutorials.",
                },
                {
                    title: "Topics",
                    href: "/resources/topics",
                    description: "Browse content organized by technology and field.",
                },
                {
                    title: "Webinars",
                    href: "/resources/webinars",
                    description: "Live workshops and recorded panel discussions.",
                },
                {
                    title: "White Papers",
                    href: "/resources/white-papers",
                    description: "In-depth research reports and technical analysis.",
                },
                {
                    title: "Tools",
                    href: "/resources/tools",
                    description: "Free calculators, utilities, and developer kits.",
                },
                {
                    title: "FAQs",
                    href: "/resources/faqs",
                    description: "Answers to common questions regarding our process.",
                },
            ],
        },
        {
            title: "Contact",
            href: "/contact",
            icon: Mail,
        },
    ],

    // -------------------------------------------------------------------------
    // Authentication
    // -------------------------------------------------------------------------

    auth: [
        {
            title: "Login",
            href: "/login",
            icon: LogIn,
        },
        {
            title: "Sign Up",
            href: "/signup",
            icon: UserPlus,
        },
    ],

    // -------------------------------------------------------------------------
    // Footer Navigation
    // -------------------------------------------------------------------------

    footer: {
        sections: [
            {
                title: "Company",

                links: [
                    {
                        title: "Home",
                        href: "/",
                    },
                    {
                        title: "About Us",
                        href: "/about",
                    },
                    {
                        title: "Our Process",
                        href: "/process",
                    },
                    {
                        title: "Careers",
                        href: "/careers",
                    },
                    {
                        title: "Customer Support",
                        href: "/support",
                    },
                ],
            },

            {
                title: "Resources",

                links: [
                    {
                        title: "Featured",
                        href: "/resources/featured",
                    },
                    {
                        title: "Blogs",
                        href: "/resources/blogs",
                    },
                    {
                        title: "Case Studies",
                        href: "/resources/case-studies",
                    },
                    {
                        title: "Guides",
                        href: "/resources/guides",
                    },
                    {
                        title: "Topics",
                        href: "/resources/topics",
                    },
                    {
                        title: "Webinars",
                        href: "/resources/webinars",
                    },
                    {
                        title: "White Papers",
                        href: "/resources/white-papers",
                    },
                    {
                        title: "Tools",
                        href: "/resources/tools",
                    },
                    {
                        title: "FAQs",
                        href: "/resources/faqs",
                    },
                ],
            },

            {
                title: "Services",

                links: [
                    {
                        title: "AI Models",
                        href: "/services/ai-models",
                    },
                    {
                        title: "Website Development",
                        href: "/services/web-development",
                    },
                    {
                        title: "Mobile Development",
                        href: "/services/mobile-development",
                    },
                    {
                        title: "Game Development",
                        href: "/services/game-development",
                    },
                    {
                        title: "Graphics Design",
                        href: "/services/graphics-design",
                    },
                    {
                        title: "UI/UX Design",
                        href: "/services/ui-ux-design",
                    },
                    {
                        title: "Video Editing",
                        href: "/services/video-editing",
                    },
                    {
                        title: "Content Writing",
                        href: "/services/content-writing",
                    },
                    {
                        title: "SEO Optimization",
                        href: "/services/seo",
                    },
                    {
                        title: "Cyber Security",
                        href: "/services/cyber-security",
                    },
                ],
            },

            {
                title: "Industries",

                links: [
                    {
                        title: "IT & Technology",
                        href: "/industries/technology",
                    },
                    {
                        title: "Healthcare",
                        href: "/industries/healthcare",
                    },
                    {
                        title: "Finance & Banking",
                        href: "/industries/finance",
                    },
                    {
                        title: "Education",
                        href: "/industries/education",
                    },
                    {
                        title: "Manufacturing",
                        href: "/industries/manufacturing",
                    },
                    {
                        title: "Travel & Hospitality",
                        href: "/industries/travel",
                    },
                    {
                        title: "Media & Entertainment",
                        href: "/industries/media",
                    },
                    {
                        title: "Gaming",
                        href: "/industries/gaming",
                    },
                    {
                        title: "IoT",
                        href: "/industries/iot",
                    },
                ],
            },

            {
                title: "Legal",

                links: [
                    {
                        title: "Privacy Policy",
                        href: "/privacy-policy",
                    },
                    {
                        title: "Terms & Conditions",
                        href: "/terms-and-conditions",
                    },
                    {
                        title: "Cookies",
                        href: "/cookies",
                    },
                ],
            },
        ],
    },
} as const;

export type NavigationConfig = typeof navigationConfig;