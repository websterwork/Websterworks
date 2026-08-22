import type { Service } from "./types";

export const WebDevelopmentService: Service = {
    id: "web",

    slug: "web-development",

    hero: {
        title: "Web Development",

        subtitle: "Modern digital experiences engineered for performance.",

        shortDescription:
            "Enterprise websites, SaaS platforms and custom web applications built with modern technologies.",

        longDescription:
            "We build scalable, secure and high-performance web applications that help businesses establish a strong digital presence. From marketing websites to enterprise dashboards and SaaS products, our solutions combine exceptional design, optimized performance and maintainable architecture.",

        accentColor: "#8B5CF6",
    },

    assets: {
        hero: "/images/services/web/hero.png",

        thumbnail: "/images/services/web/thumb.png",

        background: "/images/services/web/background.webp",

        gallery: [],
    },

    technologies: [
        { name: "Next.js" },
        { name: "React.js" },
        { name: "TypeScript" },
        { name: "NestJS" },
        { name: "Node.js" },
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "Redis" },
        { name: "Docker" },
        { name: "AWS" },
    ],

    features: [
        {
            title: "Custom Business Websites",
            description:
                "Modern websites designed around your business goals.",
        },

        {
            title: "Enterprise Applications",
            description:
                "Secure, scalable web platforms for growing organizations.",
        },

        {
            title: "SaaS Development",
            description:
                "Subscription-based software platforms built from scratch.",
        },

        {
            title: "API Development",
            description:
                "Robust REST and GraphQL APIs powering modern applications.",
        },
    ],

    benefits: [
        {
            title: "Lightning Fast Performance",
            description:
                "Optimized architecture for speed and scalability.",
        },

        {
            title: "SEO Friendly",
            description:
                "Built with technical SEO best practices from day one.",
        },

        {
            title: "Future Proof",
            description:
                "Clean architecture allowing long-term scalability.",
        },

        {
            title: "Responsive Experience",
            description:
                "Beautiful across desktop, tablet and mobile devices.",
        },
    ],

    process: [
        {
            step: 1,
            title: "Discovery",
            description: "Understanding business requirements.",
        },
        {
            step: 2,
            title: "UI/UX Planning",
            description: "Wireframes and user journey planning.",
        },
        {
            step: 3,
            title: "Development",
            description: "Frontend & backend implementation.",
        },
        {
            step: 4,
            title: "Testing",
            description: "Performance, security and QA testing.",
        },
        {
            step: 5,
            title: "Deployment",
            description: "Production deployment and optimization.",
        },
    ],

    deliverables: [
        { title: "Responsive Website" },
        { title: "Admin Dashboard" },
        { title: "API Integration" },
        { title: "Deployment" },
        { title: "Documentation" },
    ],

    faqs: [
        {
            question: "Do you build custom web applications?",
            answer:
                "Yes. Every project is developed around your business requirements.",
        },

        {
            question: "Can existing websites be redesigned?",
            answer:
                "Absolutely. We modernize and optimize existing websites while preserving important business data.",
        },
    ],

    cta: {
        title: "Ready to build your next web platform?",

        description:
            "Let's create a digital experience that grows with your business.",

        button: "Start Web Project",

        href: "/contact",
    },

    seo: {
        title: "Web Development Services | Websterwork",

        description:
            "Professional web development services including SaaS platforms, enterprise applications and modern websites.",

        keywords: [
            "Web Development",
            "Next.js",
            "React",
            "NestJS",
            "Node.js",
            "SaaS",
            "Website Development",
        ],
    },
};