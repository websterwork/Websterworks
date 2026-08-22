import type { Service } from "./types";

export const GraphicsDesignService: Service = {
    id: "graphics",

    slug: "graphics-design",

    hero: {
        title: "Graphics & UI/UX Design",

        subtitle: "Design experiences that inspire confidence.",

        shortDescription:
            "Creative branding, modern interfaces and digital experiences designed to convert.",

        longDescription:
            "Our design process combines creativity with usability to create memorable digital experiences. Whether it's branding, product design, mobile interfaces or marketing assets, every design decision is focused on clarity, consistency and business impact.",

        accentColor: "#EC4899",
    },

    assets: {
        hero: "/images/services/design/hero.png",

        thumbnail: "/images/services/design/thumb.png",

        background: "/images/services/design/background.webp",

        gallery: [],
    },

    technologies: [
        { name: "Figma" },
        { name: "Adobe Photoshop" },
        { name: "Illustrator" },
        { name: "After Effects" },
        { name: "Framer" },
    ],

    features: [
        {
            title: "Brand Identity",
            description:
                "Professional branding systems for modern businesses.",
        },

        {
            title: "UI Design",
            description:
                "Pixel-perfect interfaces focused on usability.",
        },

        {
            title: "UX Research",
            description:
                "User-centered design backed by research and testing.",
        },

        {
            title: "Marketing Assets",
            description:
                "Creative visuals for social media and advertising.",
        },
    ],

    benefits: [
        {
            title: "Stronger Brand Recognition",
            description:
                "Create memorable and consistent visual identity.",
        },

        {
            title: "Better User Experience",
            description:
                "Designs that reduce friction and improve engagement.",
        },

        {
            title: "Higher Conversion Rates",
            description:
                "Interfaces optimized for customer actions.",
        },

        {
            title: "Professional Presence",
            description:
                "Premium visuals that build trust with customers.",
        },
    ],

    process: [
        {
            step: 1,
            title: "Research",
            description: "Understand business goals and audience.",
        },

        {
            step: 2,
            title: "Concept Design",
            description: "Create visual directions and wireframes.",
        },

        {
            step: 3,
            title: "Design",
            description: "Develop polished UI and branding assets.",
        },

        {
            step: 4,
            title: "Feedback",
            description: "Iterate based on stakeholder reviews.",
        },

        {
            step: 5,
            title: "Delivery",
            description: "Deliver organized design systems and assets.",
        },
    ],

    deliverables: [
        { title: "Brand Guidelines" },
        { title: "UI Design Files" },
        { title: "Design System" },
        { title: "Icons & Assets" },
        { title: "Developer Handoff" },
    ],

    faqs: [
        {
            question: "Do you provide Figma source files?",
            answer:
                "Yes. Clients receive complete editable design files.",
        },

        {
            question: "Can you redesign existing products?",
            answer:
                "Yes. We modernize interfaces while improving usability and consistency.",
        },
    ],

    cta: {
        title: "Let's create exceptional user experiences.",

        description:
            "Design products your customers will love to use.",

        button: "Start Design Project",

        href: "/contact",
    },

    seo: {
        title: "Graphics & UI/UX Design | Websterwork",

        description:
            "Professional branding, UI/UX design, product design and creative digital experiences.",

        keywords: [
            "UI Design",
            "UX Design",
            "Branding",
            "Graphics Design",
            "Figma",
            "Adobe Illustrator",
            "Creative Design",
        ],
    },
};