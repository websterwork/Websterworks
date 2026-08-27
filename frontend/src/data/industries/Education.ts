import type { Industry } from "./types";

export const EducationIndustry: Industry = {
    id: "education",

    slug: "education",

    hero: {
        title: "Education & EdTech",

        subtitle: "Interactive learning platforms and digital campus infrastructure.",

        shortDescription:
            "Transforming learning with interactive LMS platforms, student portals, educational branding, and gamified web apps.",

        longDescription:
            "Modern education requires dynamic visual engagement, seamless LMS integration, and scalable digital infrastructure. We partner with universities, online academies, and EdTech ventures to deliver immersive digital learning environments.",

        accentColor: "#8B5CF6",
    },

    assets: {
        hero: "/images/industries/education/hero.png",

        thumbnail: "/images/industries/education/thumb.png",

        background: "/images/industries/education/background.webp",

        gallery: [],
    },

    overview: {
        challenge:
            "Educational institutions struggle with low student online engagement, clunky LMS software, and fragmented enrollment portals.",
        solution:
            "We design intuitive learning platforms featuring video streaming, interactive quizzes, gamified progress tracking, and streamlined enrollment.",
        targetAudience: [
            {
                title: "EdTech Startups",
                description:
                    "Next-generation learning platforms building subscription courseware, live tutoring, and AI grading tools.",
            },
            {
                title: "Universities & Schools",
                description:
                    "Academic institutions overhauling student portals, admissions sites, and remote classroom infrastructure.",
            },
        ],
    },

    solutions: [
        {
            title: "Custom LMS & Student Portals",
            serviceCategory: "Website Development",
            description:
                "Scalable learning management systems with video streaming, assignment tracking, and automated certification.",
            deliverables: [
                "Interactive Course Player Dashboards",
                "Student Enrollment & Billing Flow",
                "Gamified Analytics & Progress Badges",
            ],
        },
    ],

    compliance: [
        {
            standard: "FERPA Compliant",
            description:
                "Ensuring the privacy and security of student educational records.",
        },
    ],

    impacts: [
        {
            metric: "2.5x",
            label: "Course Completion Rate",
            description: "Higher engagement driven by gamified UI/UX design.",
        },
    ],

    process: [
        {
            step: 1,
            title: "Pedagogy & UX Discovery",
            description:
                "Analyzing student user journeys to minimize learning friction.",
        },
        {
            step: 2,
            title: "Platform Engineering",
            description:
                "Developing scalable LMS components with real-time video and quiz engines.",
        },
    ],

    faqs: [
        {
            question: "Can you integrate our existing student database into the new portal?",
            answer:
                "Yes, we build custom API connectors to sync student records, grades, and payment data smoothly.",
        },
    ],

    cta: {
        title: "Empower learners with modern EdTech",

        description:
            "Design and deploy next-generation learning platforms with our creative tech team.",

        button: "Start EdTech Project",

        href: "/contact",
    },

    seo: {
        title: "EdTech & Education Digital Solutions | Websterwork",

        description:
            "Custom LMS platforms, student portals, online learning apps, and educational UI/UX design.",

        keywords: [
            "EdTech Development",
            "Custom LMS",
            "Student Portal Design",
            "Education Software Agency",
        ],
    },
};

export default EducationIndustry;