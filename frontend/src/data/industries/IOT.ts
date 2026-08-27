import type { Industry } from "./types";

export const IoTIndustry: Industry = {
    id: "iot",

    slug: "iot",

    hero: {
        title: "IoT & Smart Devices",

        subtitle: "Real-time telemetry dashboards and connected device ecosystems.",

        shortDescription:
            "Connecting hardware and software through real-time device control panels, cloud MQTT bridges, and mobile apps.",

        longDescription:
            "The Internet of Things demands hardware-software harmony. We build web and mobile interfaces that monitor, visualize, and control thousands of connected devices in real time using high-performance WebSockets, MQTT pipelines, and edge device security audits.",

        accentColor: "#06B6D4",
    },

    assets: {
        hero: "/images/industries/iot/hero.png",

        thumbnail: "/images/industries/iot/thumb.png",

        background: "/images/industries/iot/background.webp",

        gallery: [],
    },

    overview: {
        challenge:
            "Hardware manufacturers face massive challenges rendering high-volume sensor telemetry without UI slowdowns or connection loss.",
        solution:
            "We design ultra-fast WebGL and chart visualization interfaces powered by streaming WebSockets.",
        targetAudience: [
            {
                title: "Smart Home & Automation Companies",
                description:
                    "Consumer device brands building mobile device controllers and automation engines.",
            },
            {
                title: "Industrial IoT (IIoT) Ventures",
                description:
                    "Manufacturing and logistics setups monitoring remote machinery, fleet sensors, and energy output.",
            },
        ],
    },

    solutions: [
        {
            title: "IoT Telemetry Dashboards",
            serviceCategory: "Website Development",
            description:
                "High-frequency data streaming interfaces displaying live device health, alerts, and spatial maps.",
            deliverables: [
                "Real-Time MQTT/WebSocket Panels",
                "Interactive Spatial Heatmaps",
                "Device Remote Management Tooling",
            ],
        },
    ],

    compliance: [
        {
            standard: "IoT Security Baseline",
            description:
                "Firmware communication encryption and device authentication controls.",
        },
    ],

    impacts: [
        {
            metric: "100k+",
            label: "Concurrent Sensors",
            description: "Capable of handling high-volume device telemetry streams.",
        },
    ],

    process: [
        {
            step: 1,
            title: "Protocol & API Integration",
            description:
                "Establishing MQTT/HTTP cloud bridges to ingest live sensor payload data.",
        },
        {
            step: 2,
            title: "Dashboard Visualization",
            description:
                "Building responsive controls and real-time visualization widgets.",
        },
    ],

    faqs: [
        {
            question: "Which protocols do you support for device connectivity?",
            answer:
                "We routinely work with MQTT, WebSockets, REST APIs, and gRPC for high-throughput IoT communication.",
        },
    ],

    cta: {
        title: "Connect your devices to the digital world",

        description:
            "Build real-time IoT dashboards and mobile companion apps with our specialized team.",

        button: "Build IoT Solution",

        href: "/contact",
    },

    seo: {
        title: "IoT & Smart Device Software Solutions | Websterwork",

        description:
            "Custom IoT dashboards, real-time sensor visualization, mobile companion apps, and device security.",

        keywords: [
            "IoT Software Development",
            "IoT Telemetry Dashboard",
            "Smart Device Mobile App",
            "MQTT Web App",
        ],
    },
};

export default IoTIndustry;