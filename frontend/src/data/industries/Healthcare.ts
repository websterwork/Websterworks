import type { Industry } from "./types";

export const HealthcareIndustry: Industry = {
    id: "healthcare",

    slug: "healthcare",

    hero: {
        title: "Healthcare & Life Sciences",

        subtitle: "HIPAA-compliant platforms and digital patient experiences.",

        shortDescription:
            "From patient portals and telehealth systems to secure medical branding and SEO—we build patient-first digital experiences.",

        longDescription:
            "Modern healthcare demands rock-solid data privacy, effortless patient scheduling, and intuitive digital interfaces. We deliver HIPAA-compliant web apps, telemetry dashboards, telemedicine platforms, and brand strategies designed to build trust and elevate patient care.",

        accentColor: "#10B981",
    },

    assets: {
        hero: "/images/industries/healthcare/hero.png",

        thumbnail: "/images/industries/healthcare/thumb.png",

        background: "/images/industries/healthcare/background.webp",

        gallery: [],
    },

    overview: {
        challenge:
            "Healthcare providers struggle with outdated patient booking systems, non-compliant data storage, high patient drop-off rates online, and rigid user interfaces.",
        solution:
            "We design secure, HIPAA-compliant patient experiences, custom clinic portals, and accessible user interfaces that make care frictionless.",
        targetAudience: [
            {
                title: "Hospitals & Medical Clinics",
                description:
                    "Multi-specialty centers needing unified patient management, online booking, and HIPAA-compliant communication.",
            },
            {
                title: "HealthTech & Telehealth Startups",
                description:
                    "Digital health companies building remote consultation platforms, AI diagnostic tools, and wearable integrations.",
            },
            {
                title: "Pharmaceutical & Diagnostic Labs",
                description:
                    "Laboratories requiring portal integration for test results, doctor-patient reporting, and secure data pipelines.",
            },
        ],
    },

    solutions: [
        {
            title: "Telehealth & Clinic Portals",
            serviceCategory: "Website Development",
            description:
                "Building fast, secure patient portals with real-time video consultation and schedule management.",
            deliverables: [
                "Patient Consultation Dashboards",
                "Automated Appointment Scheduling",
                "EHR Integration Interfaces",
            ],
        },

        {
            title: "Patient Telemetry & Mobile Care",
            serviceCategory: "Mobile Development",
            description:
                "Cross-platform mobile apps for remote monitoring, medication reminders, and secure doctor messaging.",
            deliverables: [
                "iOS & Android Health Tracker Apps",
                "Push Notification Reminders",
                "Encrypted Chat Channels",
            ],
        },

        {
            title: "Medical UI/UX & Accessibility",
            serviceCategory: "UI/UX Design",
            description:
                "Creating WCAG 2.1 accessible interfaces engineered for stress-free navigation by patients of all ages.",
            deliverables: [
                "Accessible Patient Workflows",
                "Clinical EHR Interface Redesigns",
                "Design Systems for Healthcare",
            ],
        },

        {
            title: "Healthcare Security & Compliance",
            serviceCategory: "Cyber Security",
            description:
                "Protecting Electronic Health Records (EHR) and auditing infrastructure against data breaches.",
            deliverables: [
                "HIPAA Security Audits",
                "EHR Data Encryption at Rest",
                "Role-Based Access Control Protocols",
            ],
        },
    ],

    compliance: [
        {
            standard: "HIPAA / HITECH",
            description:
                "Strict controls ensuring Protected Health Information (PHI) privacy and administrative safeguards.",
        },
        {
            standard: "WCAG 2.1 AA",
            description:
                "Web content accessibility compliance for patients with disabilities.",
        },
    ],

    impacts: [
        {
            metric: "100%",
            label: "HIPAA Readiness",
            description: "Fully compliant data handling and encrypted storage protocols.",
        },
        {
            metric: "40%",
            label: "Reduced No-Shows",
            description: "Automated booking and notification systems.",
        },
    ],

    process: [
        {
            step: 1,
            title: "Compliance & Security Planning",
            description:
                "Mapping data flows to ensure strict HIPAA/PHI compliance before writing any code.",
        },
        {
            step: 2,
            title: "Accessible UX Prototyping",
            description:
                "Designing patient-centric interfaces focused on clarity, accessibility, and speed.",
        },
        {
            step: 3,
            title: "Secure Development & Launch",
            description:
                "Building encrypted web/mobile infrastructure with end-to-end security verification.",
        },
    ],

    faqs: [
        {
            question: "Are your healthcare solutions HIPAA compliant?",
            answer:
                "Yes. All healthcare portals, databases, and communication channels are architected in accordance with HIPAA data handling and encryption standards.",
        },
    ],

    cta: {
        title: "Transform your healthcare platform today",

        description:
            "Partner with our team to engineer secure, accessible, and patient-centered digital healthcare tools.",

        button: "Schedule Consultation",

        href: "/contact",
    },

    seo: {
        title: "Healthcare Digital Solutions | Websterwork",

        description:
            "HIPAA-compliant medical software development, patient portals, healthcare UI/UX design, and security audits.",

        keywords: [
            "Healthcare Software Development",
            "HIPAA Compliant Web Apps",
            "Telehealth App Development",
            "Medical UI UX",
        ],
    },
};

export default HealthcareIndustry;