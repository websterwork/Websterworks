/**
 * -----------------------------------------------------------------------------
 * AI Model Development Service
 * -----------------------------------------------------------------------------
 */

import type { Service } from "./types";

export const AIService: Service = {
    /**
     * ---------------------------------------------------------------------------
     * Identity
     * ---------------------------------------------------------------------------
     */

    id: "ai",

    slug: "ai-model-development",

    /**
     * ---------------------------------------------------------------------------
     * Hero
     * ---------------------------------------------------------------------------
     */

    hero: {
        title: "AI Model Development",

        subtitle: "Intelligence engineered for modern businesses.",

        shortDescription:
            "Build intelligent systems that automate, analyze and transform your business.",

        longDescription:
            "We design and develop custom AI-powered solutions tailored to your business goals. From conversational AI and intelligent automation to document processing, predictive analytics and AI integrations, we create scalable systems that improve productivity, reduce operational costs and unlock new digital capabilities.",

        accentColor: "#3B82F6",
    },

    /**
     * ---------------------------------------------------------------------------
     * Assets
     * ---------------------------------------------------------------------------
     */

    assets: {
        hero: "/images/services/ai/hero.png",

        thumbnail: "/images/services/ai/thumb.png",

        background: "/images/services/ai/background.webp",

        gallery: [],
    },

    /**
     * ---------------------------------------------------------------------------
     * Technologies
     * ---------------------------------------------------------------------------
     */

    technologies: [
        {
            name: "OpenAI",
            description: "LLMs & AI APIs",
        },
        {
            name: "Claude",
            description: "Reasoning Models",
        },
        {
            name: "Python",
            description: "AI Development",
        },
        {
            name: "FastAPI",
            description: "High-performance AI APIs",
        },
        {
            name: "LangChain",
            description: "AI Workflows",
        },
        {
            name: "Vector Databases",
            description: "Semantic Search",
        },
        {
            name: "Docker",
            description: "Deployment",
        },
    ],

    /**
     * ---------------------------------------------------------------------------
     * Features
     * ---------------------------------------------------------------------------
     */

    features: [
        {
            title: "Custom AI Assistants",

            description:
                "Purpose-built AI assistants trained around your business workflows.",
        },

        {
            title: "Document Intelligence",

            description:
                "Extract, classify and analyze documents using advanced AI pipelines.",
        },

        {
            title: "AI Automation",

            description:
                "Automate repetitive business operations with intelligent workflows.",
        },

        {
            title: "Private AI",

            description:
                "Deploy secure AI solutions inside your own infrastructure.",
        },
    ],

    /**
     * ---------------------------------------------------------------------------
     * Benefits
     * ---------------------------------------------------------------------------
     */

    benefits: [
        {
            title: "Reduce Operational Costs",

            description:
                "Automate repetitive tasks and reduce manual effort across departments.",
        },

        {
            title: "Improve Decision Making",

            description:
                "Generate insights using AI-powered analytics and recommendations.",
        },

        {
            title: "Increase Productivity",

            description:
                "Enable employees to accomplish more with intelligent assistance.",
        },

        {
            title: "Scalable Infrastructure",

            description:
                "Solutions built to grow alongside your business.",
        },
    ],

    /**
     * ---------------------------------------------------------------------------
     * Development Process
     * ---------------------------------------------------------------------------
     */

    process: [
        {
            step: 1,

            title: "Discovery",

            description:
                "Understand your business objectives and identify AI opportunities.",
        },

        {
            step: 2,

            title: "Planning",

            description:
                "Design architecture, workflows and implementation strategy.",
        },

        {
            step: 3,

            title: "Development",

            description:
                "Develop models, APIs and AI integrations.",
        },

        {
            step: 4,

            title: "Testing",

            description:
                "Validate accuracy, performance and security.",
        },

        {
            step: 5,

            title: "Deployment",

            description:
                "Deploy to production with monitoring and optimization.",
        },
    ],

    /**
     * ---------------------------------------------------------------------------
     * Deliverables
     * ---------------------------------------------------------------------------
     */

    deliverables: [
        {
            title: "Complete Source Code",
        },

        {
            title: "REST API Integration",
        },

        {
            title: "Deployment Configuration",
        },

        {
            title: "Documentation",
        },

        {
            title: "Training & Support",
        },
    ],

    /**
     * ---------------------------------------------------------------------------
     * FAQ
     * ---------------------------------------------------------------------------
     */

    faqs: [
        {
            question: "Can AI integrate with our existing software?",

            answer:
                "Yes. We integrate AI with CRMs, ERPs, SaaS platforms, websites and custom applications.",
        },

        {
            question: "Do you build custom AI models?",

            answer:
                "Yes. Depending on your requirements, we can fine-tune existing models or develop custom AI solutions.",
        },

        {
            question: "Can AI be deployed privately?",

            answer:
                "Absolutely. We can deploy AI solutions within your own cloud or on-premise infrastructure.",
        },
    ],

    /**
     * ---------------------------------------------------------------------------
     * Call To Action
     * ---------------------------------------------------------------------------
     */

    cta: {
        title: "Ready to build with AI?",

        description:
            "Let's create intelligent solutions that drive innovation and business growth.",

        button: "Start Your AI Project",

        href: "/contact",
    },

    /**
     * ---------------------------------------------------------------------------
     * SEO
     * ---------------------------------------------------------------------------
     */

    seo: {
        title: "AI Model Development Services | Websterwork",

        description:
            "Custom AI model development, intelligent automation, AI integrations and enterprise AI solutions tailored for modern businesses.",

        keywords: [
            "AI Development",
            "Machine Learning",
            "OpenAI",
            "LLM Development",
            "AI Automation",
            "Artificial Intelligence",
            "AI Integration",
        ],
    },
};

export default AIService;