'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiClock, FiUsers, FiDollarSign, FiShield, FiTrendingUp, FiBarChart } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Service data for ALL services with background images
const serviceDetails = {
    'ai-models': {
        title: 'AI & Machine Learning Development',
        description: 'Custom AI models and machine learning solutions that transform business operations through intelligent automation and predictive analytics.',
        longDescription: `Our AI and Machine Learning services help businesses leverage artificial intelligence to automate processes, gain insights from data, and make smarter decisions. We develop custom AI models tailored to your specific business needs, whether it's predictive analytics, natural language processing, computer vision, or recommendation systems.

We work with cutting-edge technologies to build scalable, efficient AI solutions that integrate seamlessly with your existing systems. Our approach combines deep technical expertise with practical business understanding to deliver AI solutions that drive real business value.`,
        bgImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070',
        features: [
            'Custom Neural Networks Development',
            'Predictive Analytics Models',
            'Natural Language Processing (NLP)',
            'Computer Vision Solutions',
            'Chatbot & Virtual Assistant Development',
            'Anomaly Detection Systems',
            'Recommendation Engines',
            'AI Integration with Existing Systems'
        ],
        benefits: [
            'Automate repetitive tasks and processes',
            'Make data-driven decisions with predictive insights',
            'Improve customer experience with intelligent interactions',
            'Reduce operational costs through efficiency gains',
            'Gain competitive advantage with AI capabilities',
            'Scale operations without proportional cost increases'
        ],
        technologies: [
            { name: 'TensorFlow', description: 'Open-source ML framework' },
            { name: 'PyTorch', description: 'Deep learning framework' },
            { name: 'OpenAI API', description: 'Advanced language models' },
            { name: 'Hugging Face', description: 'Transformer models library' },
            { name: 'LangChain', description: 'LLM application framework' },
            { name: 'Scikit-learn', description: 'Traditional ML algorithms' }
        ],
        useCases: [
            {
                title: 'Customer Service Automation',
                description: 'AI-powered chatbots handle 80% of customer queries, reducing response time from hours to seconds.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
            },
            {
                title: 'Predictive Maintenance',
                description: 'ML models predict equipment failures before they happen, reducing downtime by 40%.',
                image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070'
            },
            {
                title: 'Fraud Detection',
                description: 'AI systems detect fraudulent transactions with 99.5% accuracy, saving millions in potential losses.',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070'
            },
            {
                title: 'Personalized Marketing',
                description: 'Recommendation engines increase conversion rates by 35% through personalized content.',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015'
            }
        ],
        deliveryTime: '4-8 weeks',
        pricing: {
            basic: 'Starting from $5,000',
            standard: 'Starting from $15,000',
            enterprise: 'Custom pricing'
        },
        projects: 120,
        successRate: '98%'
    },
    'website-development': {
        title: 'Website Development',
        description: 'Modern, responsive websites built with cutting-edge technologies to deliver exceptional user experiences.',
        longDescription: `Our website development services create powerful, scalable, and high-performance websites that drive business growth. We specialize in building custom websites using React, Next.js, and other modern frameworks that are optimized for speed, SEO, and user engagement.

From simple business websites to complex e-commerce platforms, we deliver solutions that are not only visually stunning but also technically robust and business-focused. Our websites are designed to convert visitors into customers and grow with your business.`,
        bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070',
        features: [
            'Custom React/Next.js Development',
            'E-commerce Solutions',
            'Progressive Web Apps',
            'API Integration',
            'Performance Optimization',
            'SEO Implementation',
            'Content Management Systems',
            'Responsive Mobile Design'
        ],
        benefits: [
            'Increase online visibility and brand presence',
            'Improve user engagement and conversion rates',
            'Scale seamlessly with business growth',
            'Enhanced security and reliability',
            'Better search engine rankings',
            'Mobile-first responsive design'
        ],
        technologies: [
            { name: 'Next.js', description: 'React framework for production' },
            { name: 'React', description: 'JavaScript library for UI' },
            { name: 'TypeScript', description: 'Type-safe JavaScript' },
            { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
            { name: 'MongoDB', description: 'NoSQL database' },
            { name: 'PostgreSQL', description: 'Relational database' }
        ],
        useCases: [
            {
                title: 'E-commerce Platform',
                description: 'Online store with secure payments, inventory management, and analytics dashboard.',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070'
            },
            {
                title: 'Business Website',
                description: 'Professional corporate website with lead generation and contact management.',
                image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069'
            },
            {
                title: 'Web Application',
                description: 'Custom web app with user authentication, real-time features, and admin panel.',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015'
            },
            {
                title: 'Portfolio Site',
                description: 'Creative portfolio showcasing work with smooth animations and interactions.',
                image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1964'
            }
        ],
        deliveryTime: '3-6 weeks',
        pricing: {
            basic: 'Starting from $3,000',
            standard: 'Starting from $8,000',
            enterprise: 'Custom pricing'
        },
        projects: 320,
        successRate: '99%'
    },
    'app-development': {
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications for iOS and Android with seamless performance.',
        longDescription: `We build high-quality mobile applications that provide exceptional user experiences across iOS and Android platforms. Whether you need a native app for maximum performance or a cross-platform solution for cost-effectiveness, we deliver apps that users love.

Our mobile app development process focuses on intuitive design, smooth performance, and robust functionality. We ensure your app stands out in the competitive app stores and delivers real value to your users.`,
        bgImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070',
        features: [
            'Native iOS & Android Development',
            'React Native Cross-platform',
            'App Store Optimization',
            'Push Notifications',
            'Offline Capabilities',
            'In-app Purchases',
            'Social Media Integration',
            'Real-time Features'
        ],
        benefits: [
            'Reach millions of mobile users',
            'Enhanced customer engagement',
            'Increased brand loyalty',
            'New revenue streams',
            'Push notification marketing',
            'Offline functionality'
        ],
        technologies: [
            { name: 'React Native', description: 'Cross-platform framework' },
            { name: 'Flutter', description: 'Google\'s UI toolkit' },
            { name: 'Swift', description: 'iOS development' },
            { name: 'Kotlin', description: 'Android development' },
            { name: 'Firebase', description: 'Backend services' },
            { name: 'Redux', description: 'State management' }
        ],
        useCases: [
            {
                title: 'Social Media App',
                description: 'Feature-rich social platform with media sharing and real-time messaging.',
                image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1974'
            },
            {
                title: 'E-commerce Mobile App',
                description: 'Shopping app with secure payments, wishlists, and order tracking.',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070'
            },
            {
                title: 'Fitness Tracking App',
                description: 'Health and fitness app with workout plans and progress tracking.',
                image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070'
            },
            {
                title: 'Food Delivery App',
                description: 'Restaurant ordering and delivery app with real-time tracking.',
                image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981'
            }
        ],
        deliveryTime: '6-12 weeks',
        pricing: {
            basic: 'Starting from $10,000',
            standard: 'Starting from $25,000',
            enterprise: 'Custom pricing'
        },
        projects: 185,
        successRate: '97%'
    },
    'cyber-security': {
        title: 'Cyber Security Services',
        description: 'Enterprise-grade security solutions to protect your digital assets and sensitive data.',
        longDescription: `In today's digital landscape, cybersecurity is not optional - it's essential. Our comprehensive cybersecurity services protect your business from threats, vulnerabilities, and attacks. We provide end-to-end security solutions including threat assessment, penetration testing, security monitoring, and incident response.

Our team of security experts implements robust security measures to safeguard your applications, networks, and data, ensuring compliance with industry standards and regulations.`,
        bgImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070',
        features: [
            'Security Audits & Vulnerability Assessment',
            'Penetration Testing',
            'Network Security Monitoring',
            'Data Encryption & Protection',
            'Incident Response Planning',
            'Compliance Management',
            'Security Training',
            'Threat Intelligence'
        ],
        benefits: [
            'Protect sensitive customer data',
            'Prevent security breaches and attacks',
            'Ensure regulatory compliance',
            'Build customer trust and confidence',
            'Reduce financial and reputational risks',
            '24/7 security monitoring'
        ],
        technologies: [
            { name: 'SIEM', description: 'Security Information Management' },
            { name: 'WAF', description: 'Web Application Firewall' },
            { name: 'VPN', description: 'Virtual Private Network' },
            { name: 'Encryption', description: 'Data protection' },
            { name: 'Firewalls', description: 'Network security' },
            { name: 'IDS/IPS', description: 'Intrusion Detection/Prevention' }
        ],
        useCases: [
            {
                title: 'E-commerce Security',
                description: 'Protect customer payment information and prevent fraud on online stores.',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070'
            },
            {
                title: 'Healthcare Data Protection',
                description: 'Secure patient health records and ensure HIPAA compliance.',
                image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053'
            },
            {
                title: 'Financial Security',
                description: 'Protect financial transactions and prevent unauthorized access.',
                image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911'
            },
            {
                title: 'Corporate Network Security',
                description: 'Secure corporate networks and prevent data breaches.',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074'
            }
        ],
        deliveryTime: '2-4 weeks',
        pricing: {
            basic: 'Starting from $2,000',
            standard: 'Starting from $5,000',
            enterprise: 'Custom pricing'
        },
        projects: 135,
        successRate: '100%'
    },
    'seo-optimisation': {
        title: 'SEO Optimization',
        description: 'Comprehensive SEO strategies to improve visibility, drive organic traffic, and boost rankings.',
        longDescription: `Our SEO services are designed to increase your website's visibility in search engines and drive qualified organic traffic. We combine technical SEO, content optimization, and link building strategies to improve your search rankings and deliver sustainable growth.

Our data-driven approach focuses on your target audience and business goals, ensuring that our SEO efforts translate into real business results and ROI.`,
        bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015',
        features: [
            'Technical SEO Audits',
            'Keyword Research & Strategy',
            'On-page Optimization',
            'Link Building & Outreach',
            'Local SEO Optimization',
            'SEO Analytics & Reporting',
            'Content Strategy',
            'Competitor Analysis'
        ],
        benefits: [
            'Increase organic website traffic',
            'Improve search engine rankings',
            'Generate qualified leads',
            'Boost online authority',
            'Higher ROI than paid advertising',
            'Long-term sustainable growth'
        ],
        technologies: [
            { name: 'Google Analytics', description: 'Web analytics' },
            { name: 'SEMrush', description: 'SEO toolkit' },
            { name: 'Ahrefs', description: 'SEO analysis' },
            { name: 'Search Console', description: 'Google\'s search tools' },
            { name: 'Moz', description: 'SEO software' },
            { name: 'Screaming Frog', description: 'SEO spider' }
        ],
        useCases: [
            {
                title: 'Local Business SEO',
                description: 'Improve local search visibility and drive customers to physical locations.',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070'
            },
            {
                title: 'E-commerce SEO',
                description: 'Optimize product pages and category pages for higher conversions.',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070'
            },
            {
                title: 'B2B Lead Generation',
                description: 'Target high-value keywords to generate qualified business leads.',
                image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069'
            },
            {
                title: 'Brand Authority Building',
                description: 'Establish thought leadership and dominate industry search results.',
                image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069'
            }
        ],
        deliveryTime: 'Ongoing',
        pricing: {
            basic: 'Starting from $500/month',
            standard: 'Starting from $1,500/month',
            enterprise: 'Custom pricing'
        },
        projects: 210,
        successRate: '95%'
    },
    'content-writing': {
        title: 'Content Writing',
        description: 'Engaging, SEO-optimized content that resonates with your audience and drives conversions.',
        longDescription: `Great content is the foundation of digital success. Our content writing services create compelling, valuable content that engages your audience, builds trust, and drives action. From blog posts and articles to website copy and social media content, we deliver content that achieves your business objectives.

Our content is not only well-written but also strategically optimized for SEO and conversion, ensuring it reaches the right audience and drives results.`,
        bgImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072',
        features: [
            'SEO Blog Posts & Articles',
            'Website Copywriting',
            'Technical Documentation',
            'Social Media Content',
            'Email Campaigns',
            'Whitepapers & Case Studies',
            'Product Descriptions',
            'Content Strategy'
        ],
        benefits: [
            'Establish thought leadership',
            'Improve SEO rankings',
            'Engage and educate audience',
            'Drive conversions and sales',
            'Build brand credibility',
            'Support marketing campaigns'
        ],
        technologies: [
            { name: 'SEO Tools', description: 'Content optimization' },
            { name: 'Grammarly', description: 'Writing assistant' },
            { name: 'Copyscape', description: 'Plagiarism checker' },
            { name: 'Hemingway', description: 'Readability editor' },
            { name: 'Google Trends', description: 'Content research' },
            { name: 'Keyword Research', description: 'SEO planning' }
        ],
        useCases: [
            {
                title: 'Blog Content Strategy',
                description: 'Regular, valuable blog posts that drive traffic and establish authority.',
                image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070'
            },
            {
                title: 'Website Copy Overhaul',
                description: 'Refresh website content to improve conversions and user experience.',
                image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069'
            },
            {
                title: 'Product Launch Content',
                description: 'Comprehensive content for successful product launches and marketing.',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070'
            },
            {
                title: 'Educational Content',
                description: 'Informative content that helps customers and builds trust.',
                image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070'
            }
        ],
        deliveryTime: '3-5 days',
        pricing: {
            basic: 'Starting from $50/article',
            standard: 'Starting from $150/article',
            enterprise: 'Custom pricing'
        },
        projects: 280,
        successRate: '96%'
    },
    'graphics-design': {
        title: 'Graphics Design',
        description: 'Visually stunning designs that communicate your brand message effectively and memorably.',
        longDescription: `Great design is more than just aesthetics - it's communication. Our graphic design services create visually compelling designs that effectively communicate your brand message and capture attention. From logos and branding to marketing materials and digital graphics, we design with purpose and strategy.

Our designs are not only beautiful but also functional, supporting your business goals and enhancing user experience across all touchpoints.`,
        bgImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070',
        features: [
            'Logo & Brand Identity Design',
            'Marketing Materials Design',
            'Social Media Graphics',
            'Infographic Design',
            'Print Design',
            'Motion Graphics',
            'Illustration',
            'Packaging Design'
        ],
        benefits: [
            'Strengthen brand identity',
            'Improve visual appeal',
            'Increase engagement',
            'Stand out from competitors',
            'Professional image',
            'Consistent brand messaging'
        ],
        technologies: [
            { name: 'Adobe Creative Suite', description: 'Design software' },
            { name: 'Figma', description: 'Interface design' },
            { name: 'Canva', description: 'Graphic design' },
            { name: 'Blender', description: '3D design' },
            { name: 'After Effects', description: 'Motion graphics' },
            { name: 'Illustrator', description: 'Vector graphics' }
        ],
        useCases: [
            {
                title: 'Brand Identity Creation',
                description: 'Complete brand identity including logo, colors, typography, and guidelines.',
                image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080'
            },
            {
                title: 'Marketing Campaign Design',
                description: 'Cohesive design for multi-channel marketing campaigns.',
                image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974'
            },
            {
                title: 'Social Media Graphics',
                description: 'Eye-catching graphics optimized for each social media platform.',
                image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1974'
            },
            {
                title: 'Product Packaging',
                description: 'Attractive packaging design that sells products on shelves.',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2058'
            }
        ],
        deliveryTime: '1-2 weeks',
        pricing: {
            basic: 'Starting from $300/design',
            standard: 'Starting from $800/design',
            enterprise: 'Custom pricing'
        },
        projects: 240,
        successRate: '98%'
    },
    'uiux-design': {
        title: 'UI/UX Design',
        description: 'User-centered designs that deliver exceptional experiences, drive conversions, and build loyalty.',
        longDescription: `Great user experience is the key to digital success. Our UI/UX design services create intuitive, engaging, and effective digital experiences that users love. We combine user research, information architecture, interaction design, and visual design to create products that are not only beautiful but also highly functional and user-friendly.

Our human-centered design approach ensures that every design decision is based on user needs and business goals, resulting in products that deliver real value.`,
        bgImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064',
        features: [
            'User Research & Personas',
            'Wireframing & Prototyping',
            'Interactive Design',
            'Design Systems',
            'Accessibility Compliance',
            'User Journey Mapping',
            'A/B Testing',
            'Mobile-First Design'
        ],
        benefits: [
            'Improve user satisfaction',
            'Increase conversion rates',
            'Reduce bounce rates',
            'Enhance brand perception',
            'Better usability',
            'Higher user retention'
        ],
        technologies: [
            { name: 'Figma', description: 'Collaborative design' },
            { name: 'Sketch', description: 'UI design' },
            { name: 'Adobe XD', description: 'Experience design' },
            { name: 'InVision', description: 'Prototyping' },
            { name: 'Miro', description: 'Collaboration whiteboard' },
            { name: 'Zeplin', description: 'Design handoff' }
        ],
        useCases: [
            {
                title: 'Website Redesign',
                description: 'Modern, user-friendly website redesign that improves conversions.',
                image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069'
            },
            {
                title: 'Mobile App Design',
                description: 'Intuitive mobile app interface designed for optimal user experience.',
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070'
            },
            {
                title: 'SaaS Dashboard Design',
                description: 'Complex dashboard with clear information architecture and navigation.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
            },
            {
                title: 'E-commerce UX Optimization',
                description: 'Streamlined shopping experience that reduces cart abandonment.',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070'
            }
        ],
        deliveryTime: '2-4 weeks',
        pricing: {
            basic: 'Starting from $2,000/project',
            standard: 'Starting from $6,000/project',
            enterprise: 'Custom pricing'
        },
        projects: 190,
        successRate: '99%'
    },
    'video-editing': {
        title: 'Video Editing',
        description: 'Professional video production and editing that engages audiences and communicates effectively.',
        longDescription: `Video is the most engaging form of content in today's digital world. Our video editing services transform raw footage into compelling, professional videos that capture attention and convey your message effectively. From corporate videos and product demos to social media content and animations, we create videos that resonate with your audience.

Our video production process ensures high-quality results that align with your brand and achieve your communication goals.`,
        bgImage: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2061',
        features: [
            'Corporate Videos',
            'Product Demos & Tutorials',
            'Animation & Motion Graphics',
            'Color Grading & Correction',
            'Sound Design & Mixing',
            'Video SEO Optimization',
            'Social Media Video Clips',
            'YouTube Channel Management'
        ],
        benefits: [
            'Increase engagement rates',
            'Improve brand recall',
            'Drive social shares',
            'Boost conversion rates',
            'Explain complex concepts simply',
            'Build emotional connections'
        ],
        technologies: [
            { name: 'Premiere Pro', description: 'Video editing' },
            { name: 'After Effects', description: 'Motion graphics' },
            { name: 'DaVinci Resolve', description: 'Color grading' },
            { name: 'Final Cut Pro', description: 'Apple editing' },
            { name: 'Blender', description: '3D animation' },
            { name: 'Audition', description: 'Audio editing' }
        ],
        useCases: [
            {
                title: 'Product Launch Video',
                description: 'Exciting product announcement video that generates buzz and sales.',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070'
            },
            {
                title: 'Corporate Training Video',
                description: 'Professional training videos for employee onboarding and education.',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070'
            },
            {
                title: 'Social Media Ads',
                description: 'Short, engaging video ads optimized for social media platforms.',
                image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1974'
            },
            {
                title: 'Customer Testimonial Videos',
                description: 'Authentic customer stories that build trust and credibility.',
                image: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1973'
            }
        ],
        deliveryTime: '1-3 weeks',
        pricing: {
            basic: 'Starting from $500/video',
            standard: 'Starting from $1,500/video',
            enterprise: 'Custom pricing'
        },
        projects: 165,
        successRate: '97%'
    },
    'game-development': {
        title: 'Game Development',
        description: 'Immersive 2D/3D games and interactive experiences that engage and entertain audiences.',
        longDescription: `Game development combines creativity, technology, and psychology to create engaging interactive experiences. Our game development services bring your game ideas to life, whether it's a mobile game, PC game, or VR experience. We handle everything from concept and design to development and deployment.

Our team of game developers creates engaging gameplay mechanics, stunning visuals, and smooth performance to deliver games that players love and keep coming back to.`,
        bgImage: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=2070',
        features: [
            '2D/3D Game Development',
            'Unity & Unreal Engine Development',
            'Mobile Game Development',
            'VR/AR Experiences',
            'Multiplayer Gaming',
            'Game Physics & AI',
            'Game Store Publishing',
            'Monetization Strategies'
        ],
        benefits: [
            'Create engaging entertainment',
            'Generate new revenue streams',
            'Build loyal gaming communities',
            'Expand to new markets',
            'Brand engagement through games',
            'Educational and training applications'
        ],
        technologies: [
            { name: 'Unity', description: 'Game engine' },
            { name: 'Unreal Engine', description: 'AAA game engine' },
            { name: 'Godot', description: 'Open-source engine' },
            { name: 'Three.js', description: 'WebGL library' },
            { name: 'WebGL', description: 'Web graphics' },
            { name: 'C#/C++', description: 'Programming languages' }
        ],
        useCases: [
            {
                title: 'Mobile Casual Games',
                description: 'Addictive mobile games with simple controls and engaging mechanics.',
                image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071'
            },
            {
                title: 'Educational Games',
                description: 'Fun learning experiences that make education engaging and effective.',
                image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070'
            },
            {
                title: 'Branded Games',
                description: 'Games that promote brands and products through interactive experiences.',
                image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080'
            },
            {
                title: 'VR Training Simulations',
                description: 'Immersive virtual reality training for complex skills and procedures.',
                image: 'https://images.unsplash.com/photo-1525547719578-118a4c8d22d7?q=80&w=1964'
            }
        ],
        deliveryTime: '8-16 weeks',
        pricing: {
            basic: 'Starting from $10,000',
            standard: 'Starting from $30,000',
            enterprise: 'Custom pricing'
        },
        projects: 75,
        successRate: '95%'
    }
};

const stats = [
    { icon: <FiClock />, value: '4-8 Weeks', label: 'Average Delivery Time' },
    { icon: <FiUsers />, value: '120+', label: 'Projects Completed' },
    { icon: <FiBarChart />, value: '98%', label: 'Success Rate' },
    { icon: <FiDollarSign />, value: 'ROI Focused', label: 'Business Impact' }
];

export default function ServiceDetailPage({ params }) {
    const service = serviceDetails[params.id];

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
            {/* Hero Section with Background Image */}
            <section className="relative overflow-hidden text-white dark:text-gray-100 min-h-[70vh] flex items-center">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${service.bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40" />
                </div>

                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="max-w-4xl">
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 text-purple-300 dark:text-purple-400 hover:text-white mb-6"
                        >
                            ← Back to Services
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mb-8">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                    {service.title}
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-400 max-w-3xl">
                                    {service.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                {[
                                    { icon: <FiClock />, value: service.deliveryTime, label: 'Delivery Time' },
                                    { icon: <FiUsers />, value: `${service.projects}+`, label: 'Projects Completed' },
                                    { icon: <FiBarChart />, value: service.successRate, label: 'Success Rate' },
                                    { icon: <FiDollarSign />, value: 'ROI Focused', label: 'Business Impact' }
                                ].map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 text-center"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                            <div className="text-white">{stat.icon}</div>
                                        </div>
                                        <div className="text-xl font-bold mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-300 dark:text-gray-400">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2">
                        {/* Overview */}
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Service Overview
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-line">
                                    {service.longDescription}
                                </p>
                            </div>
                        </section>

                        {/* Features */}
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Key Features
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {service.features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl"
                                    >
                                        <FiCheck className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Use Cases with Images */}
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Real-World Applications
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {service.useCases.map((useCase, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div
                                            className="h-48 relative overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600"
                                            style={{
                                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${useCase.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h3 className="text-xl font-bold text-white">
                                                    {useCase.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-gray-700 dark:text-gray-300">
                                                {useCase.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Benefits */}
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    Business Benefits
                                </h3>
                                <ul className="space-y-3">
                                    {service.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <FiTrendingUp className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Technologies */}
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    Technologies We Use
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {service.technologies.map((tech, index) => (
                                        <div
                                            key={index}
                                            className="relative group"
                                        >
                                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 hover:shadow-md transition-shadow">
                                                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                                                    {tech.name}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                                                {tech.description}
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="relative overflow-hidden rounded-2xl">
                                <div
                                    className="absolute inset-0 z-0"
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${service.bgImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                />
                                <div className="relative z-10 p-6 text-white">
                                    <h3 className="text-xl font-bold mb-4">
                                        Pricing Options
                                    </h3>
                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                                            <span className="text-purple-200">Basic:</span>
                                            <span className="font-bold text-lg">{service.pricing.basic}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                                            <span className="text-purple-200">Standard:</span>
                                            <span className="font-bold text-lg">{service.pricing.standard}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                                            <span className="text-purple-200">Enterprise:</span>
                                            <span className="font-bold text-lg">{service.pricing.enterprise}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Link
                                            href="/portal/signup"
                                            className="block w-full bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 rounded-lg text-center transition-colors"
                                        >
                                            Start Project
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm py-3 rounded-lg text-center transition-colors"
                                        >
                                            Schedule Call
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Services */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Related Services
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Explore other services that might interest you
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                title: 'Data Analytics',
                                description: 'Turn data into actionable insights',
                                bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
                                href: '/services/data-analytics'
                            },
                            {
                                title: 'Cloud Solutions',
                                description: 'Scalable cloud infrastructure',
                                bgImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070',
                                href: '/services/cloud'
                            },
                            {
                                title: 'IoT Development',
                                description: 'Connected device solutions',
                                bgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070',
                                href: '/services/iot'
                            }
                        ].map((relatedService, index) => (
                            <Link
                                key={index}
                                href={relatedService.href}
                                className="group overflow-hidden rounded-2xl hover:shadow-xl transition-shadow duration-300"
                            >
                                <div
                                    className="h-48 relative overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600"
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${relatedService.bgImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                    <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                                        <div className="text-2xl opacity-90"></div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">
                                                {relatedService.title}
                                            </h3>
                                            <p className="text-gray-200">
                                                {relatedService.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}