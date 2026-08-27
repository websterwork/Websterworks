import type { Industry } from "./types";

export const ITTechnologyIndustry: Industry = {
    id: "it-technology",

    slug: "it-technology",

    hero: {
        title: "IT & Technology",

        subtitle: "End-to-end digital transformation for modern tech enterprises.",

        shortDescription:
            "From AI models and web platforms to branding, video content, and cybersecurity audits—we power technology brands across every digital touchpoint.",

        longDescription:
            "The IT & Technology sector demands more than just code. Tech firms require scalable cloud web applications, intuitive UI/UX for complex tools, high-converting tech branding, engaging video media, robust cybersecurity, and intelligent AI models. We provide specialized end-to-end solutions designed specifically for technology-driven businesses.",

        accentColor: "#3B82F6",
    },

    assets: {
        hero: "/images/industries/it-technology/hero.png",

        thumbnail: "/images/industries/it-technology/thumb.png",

        background: "/images/industries/it-technology/background.webp",

        gallery: [],
    },

    overview: {
        challenge:
            "Tech businesses face multi-front pressure: legacy code bases, weak online brand identity, complex interfaces that confuse users, cyber threats, and the struggle to integrate modern AI into their workflow.",
        solution:
            "We unite technical engineering, creative design, cybersecurity, and content creation under one strategy tailored specifically for tech brands.",
        targetAudience: [
            {
                title: "SaaS & Digital Product Companies",
                description:
                    "Product teams needing full-stack web/mobile app engineering, polished SaaS dashboard UI/UX, and automated billing integrations.",
            },
            {
                title: "IT Agencies & MSPs",
                description:
                    "Service providers looking to overhaul their online branding, generate organic leads via targeted tech SEO, and secure their client portals.",
            },
            {
                title: "Tech Startups & Founders",
                description:
                    "Early-stage ventures needing rapid MVP development, pitch video graphics, custom branding, and early security blueprints.",
            },
            {
                title: "Enterprise IT Departments",
                description:
                    "Corporate tech units requiring internal dashboard development, AI workflow automation, and infrastructure compliance.",
            },
        ],
    },

    solutions: [
        {
            title: "Custom Web & SaaS Platforms",
            serviceCategory: "Website Development",
            description:
                "Building enterprise SaaS platforms, client portals, and marketing websites optimized for speed and conversion.",
            deliverables: [
                "Next.js SaaS Web Applications",
                "Admin & Analytics Dashboards",
                "High-Speed Marketing Websites",
            ],
        },

        {
            title: "Cross-Platform Mobile Apps",
            serviceCategory: "Mobile Development",
            description:
                "Native-feeling iOS and Android applications for tech products needing mobility and push functionality.",
            deliverables: [
                "iOS & Android Product Apps",
                "Mobile Security & Encryption",
                "Offline-First Data Sync",
            ],
        },

        {
            title: "AI Models & Automation Pipelines",
            serviceCategory: "AI Models",
            description:
                "Integrating machine learning models, custom LLMs, and intelligent automation into tech platforms.",
            deliverables: [
                "Custom LLM & Chatbot Integration",
                "Predictive Analytics Models",
                "Automated Data Ingestion Pipelines",
            ],
        },

        {
            title: "UI/UX & Product Design",
            serviceCategory: "UI/UX Design",
            description:
                "Simplifying complex technical workflows into clean, accessible, and intuitive visual interfaces.",
            deliverables: [
                "Dashboard & Interface Wireframing",
                "Design Systems & Component Libraries",
                "User Journey & Friction Audits",
            ],
        },

        {
            title: "Cyber Security & Data Protection",
            serviceCategory: "Cyber Security",
            description:
                "Securing tech infrastructure, running vulnerability assessments, and hardening web & API endpoints.",
            deliverables: [
                "Penetration Testing & Vulnerability Scans",
                "API Security & Authentication Baseline",
                "Data Encryption & Access Controls",
            ],
        },

        {
            title: "Tech Brand Identity & Graphics",
            serviceCategory: "Graphics Design",
            description:
                "Establishing modern, geometric, and authoritative visual branding tailored for technology firms.",
            deliverables: [
                "Vector Logos & Brand Style Guides",
                "Product Mockups & Developer Graphics",
                "Social Media & Presentation Decks",
            ],
        },

        {
            title: "Video Content & Product Demo Media",
            serviceCategory: "Video Editing",
            description:
                "Crafting high-end promotional video visual assets, product demo walk-throughs, and social ad cuts.",
            deliverables: [
                "SaaS Demo & Explainer Videos",
                "Motion Graphics & Feature Teasers",
                "Social Media Reel & Short Edits",
            ],
        },

        {
            title: "Tech SEO & Technical Writing",
            serviceCategory: "SEO Optimization & Content Writing",
            description:
                "Driving organic qualified developer/buyer traffic to tech platforms through specialized content and technical SEO.",
            deliverables: [
                "Technical Documentation & API Guides",
                "Search-Optimized Tech Blogs & Case Studies",
                "Full Site SEO & Schema Markup Audits",
            ],
        },
    ],

    compliance: [
        {
            standard: "ISO/IEC 27001",
            description:
                "Standard management controls for securing user data, access management, and infrastructure safety.",
        },
        {
            standard: "SOC 2 Type II",
            description:
                "Verified criteria covering security, platform availability, and processing integrity for SaaS platforms.",
        },
        {
            standard: "GDPR & Data Privacy",
            description:
                "Strict user privacy controls, consent mechanisms, and localized data handling policies.",
        },
    ],

    impacts: [
        {
            metric: "99.99%",
            label: "Platform Reliability",
            description: "High-uptime web systems built for zero operational downtime.",
        },
        {
            metric: "3x",
            label: "User Engagement",
            description: "Increased adoption through clean UI/UX and intuitive software flows.",
        },
        {
            metric: "100%",
            label: "Security Coverage",
            description: "Vulnerability-tested applications protecting critical user data.",
        },
    ],

    process: [
        {
            step: 1,
            title: "Discovery & Needs Audit",
            description:
                "We evaluate your current technical stack, brand position, UI friction points, and cybersecurity status.",
        },
        {
            step: 2,
            title: "Multidisciplinary Blueprint",
            description:
                "Designing the technical architecture, UI wireframes, content roadmap, and security protocols.",
        },
        {
            step: 3,
            title: "Engineering & Creative Execution",
            description:
                "Parallel development of web/mobile products, AI integration, UI/UX asset buildout, and branding graphics.",
        },
        {
            step: 4,
            title: "Quality, Security & SEO Testing",
            description:
                "Rigorous QA, penetration testing, performance optimization, and search schema validation.",
        },
        {
            step: 5,
            title: "Launch & Continuous Support",
            description:
                "Production deployment, ongoing SEO optimization, design iterations, and maintenance.",
        },
    ],

    faqs: [
        {
            question: "Can Websterwork handle both the technical development and creative branding for our tech company?",
            answer:
                "Yes. We specialize in cross-functional projects—building high-performance web applications or mobile products while simultaneously handling UI/UX design, brand identity, marketing video media, and tech SEO.",
        },
        {
            question: "How do you help an existing SaaS company modernize its UI/UX and codebase?",
            answer:
                "We perform a UX audit and architectural checkup, refactoring old components into modern Next.js/React setups while redesigning intuitive dashboards without breaking your existing live data.",
        },
        {
            question: "Do you offer cybersecurity assessments for existing web applications?",
            answer:
                "Yes. We conduct vulnerability scans, API security evaluations, and penetration tests to identify exploits before your application reaches production.",
        },
    ],

    cta: {
        title: "Ready to elevate your tech product?",

        description:
            "Partner with our engineering and creative team to build, design, secure, and market your digital platform.",

        button: "Start Your Project",

        href: "/contact",
    },

    seo: {
        title: "IT & Technology Sector Solutions | Websterwork",

        description:
            "Full-service digital solutions for IT & Tech companies—covering web & mobile development, AI models, UI/UX, graphics, video editing, SEO, and cybersecurity.",

        keywords: [
            "Tech Industry Development",
            "SaaS Web Application",
            "AI Integration",
            "Tech UI UX Design",
            "Cyber Security Audits",
            "Tech Video Editing",
            "Software Development Agency",
        ],
    },
};