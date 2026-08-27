import type { Industry } from "./types";

export const FinanceIndustry: Industry = {
    id: "finance-banking",

    slug: "finance-banking",

    hero: {
        title: "Finance & Fintech",

        subtitle: "Bank-grade financial platforms, fintech tools, and secure web portals.",

        shortDescription:
            "We design high-frequency trading dashboards, fintech apps, banking portals, and fraud-resistant financial interfaces.",

        longDescription:
            "In finance, performance and trust are non-negotiable. We build scalable fintech applications, real-time transaction dashboards, secure payment gateways, and compliant banking tools engineered for sub-second latency and bank-level security.",

        accentColor: "#EAB308",
    },

    assets: {
        hero: "/images/industries/finance/hero.png",

        thumbnail: "/images/industries/finance/thumb.png",

        background: "/images/industries/finance/background.webp",

        gallery: [],
    },

    overview: {
        challenge:
            "Fintech companies must balance real-time transaction processing with extreme security standards and intuitive user experience.",
        solution:
            "We combine zero-trust cybersecurity frameworks with sleek, conversion-focused financial interfaces.",
        targetAudience: [
            {
                title: "Digital Banks & Neobanks",
                description:
                    "Modern financial institutions needing mobile banking apps, account dashboards, and KYC verification pipelines.",
            },
            {
                title: "Investment & Trading Platforms",
                description:
                    "Brokerages needing low-latency WebSocket charting dashboards and automated portfolio trackers.",
            },
        ],
    },

    solutions: [
        {
            title: "Fintech Web & Mobile Dashboards",
            serviceCategory: "Website Development",
            description:
                "Low-latency banking portals and asset management tools featuring real-time data feeds.",
            deliverables: [
                "Real-Time Analytics Dashboards",
                "Payment Gateway Integration",
                "Automated KYC/AML Onboarding Flows",
            ],
        },

        {
            title: "Financial Security & Penetration Testing",
            serviceCategory: "Cyber Security",
            description:
                "Protecting financial assets and transaction pipelines from malicious attacks and data leaks.",
            deliverables: [
                "API Penetration Testing",
                "Zero-Trust Architecture Setup",
                "Fraud Detection AI Models",
            ],
        },
    ],

    compliance: [
        {
            standard: "PCI-DSS Level 1",
            description:
                "Maximum security compliance for processing, storing, and transmitting credit card data.",
        },
    ],

    impacts: [
        {
            metric: "<100ms",
            label: "Real-Time Latency",
            description: "Instant data updates across financial trading dashboards.",
        },
    ],

    process: [
        {
            step: 1,
            title: "Risk & Architecture Audit",
            description:
                "Reviewing financial APIs, transaction logic, and regulatory requirements.",
        },
        {
            step: 2,
            title: "High-Performance Build",
            description:
                "Engineering resilient microservices and bulletproof user interfaces.",
        },
    ],

    faqs: [
        {
            question: "How do you ensure PCI-DSS compliance?",
            answer:
                "We implement end-to-end tokenization, SSL encryption, restricted database access, and PCI-compliant payment provider integrations.",
        },
    ],

    cta: {
        title: "Build the future of digital finance",

        description:
            "Leverage our team to launch high-performance, secure fintech platforms.",

        button: "Talk to Fintech Experts",

        href: "/contact",
    },

    seo: {
        title: "Fintech & Financial Software Development | Websterwork",

        description:
            "Bank-grade fintech software, payment solutions, real-time trading dashboards, and financial security.",

        keywords: [
            "Fintech Development",
            "Banking Web Apps",
            "PCI DSS Security",
            "Financial Dashboards",
        ],
    },
};

export default FinanceIndustry;