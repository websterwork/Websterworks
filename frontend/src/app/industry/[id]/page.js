'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiClock, FiUsers, FiDollarSign, FiTrendingUp, FiBarChart } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Complete industry data with background images
const industryDetails = {
    'it-technology': {
        title: 'IT & Technology Solutions',
        description: 'Custom software solutions for tech companies, startups, and digital transformation initiatives.',
        longDescription: `We provide comprehensive IT and technology solutions that help businesses stay competitive in the digital age. Our expertise spans across custom software development, cloud infrastructure, DevOps, and technical consulting. We understand the unique challenges of the technology sector and deliver solutions that drive innovation and growth.

Whether you're a startup building your MVP or an enterprise undergoing digital transformation, we have the expertise to deliver scalable, secure, and efficient technology solutions that align with your business objectives.`,
        bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074',
        features: [
            'Custom Software Development',
            'Tech Stack Migration & Modernization',
            'API Development & Integration',
            'Cloud Infrastructure Setup',
            'DevOps & CI/CD Implementation',
            'Technical Consulting & Architecture'
        ],
        benefits: [
            'Accelerate digital transformation initiatives',
            'Improve operational efficiency through automation',
            'Scale with cutting-edge technology solutions',
            'Stay ahead of competitors with innovative solutions',
            'Reduce technical debt and maintenance costs',
            'Enhance system security and reliability'
        ],
        technologies: [
            { name: 'React/Next.js', description: 'Frontend development' },
            { name: 'Node.js/Python', description: 'Backend development' },
            { name: 'AWS/Azure/GCP', description: 'Cloud platforms' },
            { name: 'Docker/Kubernetes', description: 'Containerization' },
            { name: 'Microservices', description: 'Architecture pattern' },
            { name: 'CI/CD Tools', description: 'Automation pipelines' }
        ],
        caseStudies: [
            {
                title: 'SaaS Platform Development',
                description: 'Built a scalable SaaS platform for a tech startup serving 10,000+ users.',
                result: '300% user growth in first year',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
            },
            {
                title: 'Legacy System Migration',
                description: 'Migrated legacy systems to modern cloud infrastructure for enterprise client.',
                result: '60% reduction in operational costs',
                image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074'
            },
            {
                title: 'API Integration Platform',
                description: 'Developed an API integration platform connecting multiple third-party services.',
                result: 'Reduced integration time by 80%',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074'
            },
            {
                title: 'DevOps Implementation',
                description: 'Implemented complete DevOps pipeline for software development team.',
                result: '90% faster deployment cycles',
                image: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?q=80&w=2070'
            }
        ],
        statistics: {
            projects: 120,
            avgProjectSize: '$75,000',
            growth: '35%',
            clientSatisfaction: '98%'
        },
        pricing: {
            small: 'Starting from $25,000',
            medium: 'Starting from $75,000',
            enterprise: 'Custom pricing'
        }
    },
    'medical-healthcare': {
        title: 'Medical & Healthcare Technology',
        description: 'Healthcare apps, telemedicine platforms, medical software, and health tech solutions.',
        longDescription: `We specialize in developing healthcare technology solutions that improve patient care, enhance operational efficiency, and ensure regulatory compliance. Our expertise includes telemedicine platforms, electronic health records (EHR), medical device integration, and healthcare analytics.

We understand the critical importance of security and compliance in healthcare technology. All our solutions are built with HIPAA compliance in mind and incorporate the latest security standards to protect sensitive patient data.`,
        bgImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053',
        features: [
            'Telemedicine & Remote Care Platforms',
            'Electronic Health Records (EHR) Systems',
            'Medical Device Integration',
            'Healthcare Analytics & Reporting',
            'Patient Management Systems',
            'Clinical Trial Management Software'
        ],
        benefits: [
            'Improve patient care delivery and outcomes',
            'Enhance healthcare accessibility through telemedicine',
            'Ensure HIPAA and regulatory compliance',
            'Optimize medical workflows and reduce errors',
            'Enable data-driven healthcare decisions',
            'Reduce operational costs through automation'
        ],
        technologies: [
            { name: 'HIPAA Compliance', description: 'Healthcare regulations' },
            { name: 'HL7/FHIR Standards', description: 'Healthcare data exchange' },
            { name: 'Healthcare APIs', description: 'System integration' },
            { name: 'Security Protocols', description: 'Data protection' },
            { name: 'Real-time Analytics', description: 'Patient insights' },
            { name: 'IoT Device Integration', description: 'Medical devices' }
        ],
        caseStudies: [
            {
                title: 'Telemedicine Platform',
                description: 'Developed a HIPAA-compliant telemedicine platform for rural healthcare.',
                result: 'Served 50,000+ remote patients',
                image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080'
            },
            {
                title: 'Hospital Management System',
                description: 'Built comprehensive hospital management software for chain of hospitals.',
                result: 'Improved efficiency by 40%',
                image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053'
            },
            {
                title: 'Medical Device Integration',
                description: 'Integrated various medical devices with centralized monitoring system.',
                result: 'Reduced monitoring time by 70%',
                image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=2067'
            },
            {
                title: 'Healthcare Analytics Dashboard',
                description: 'Created analytics dashboard for healthcare provider network.',
                result: 'Improved decision-making by 65%',
                image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2074'
            }
        ],
        statistics: {
            projects: 85,
            avgProjectSize: '$120,000',
            growth: '45%',
            clientSatisfaction: '99%'
        },
        pricing: {
            small: 'Starting from $50,000',
            medium: 'Starting from $150,000',
            enterprise: 'Custom pricing'
        }
    },
    'finance-banking': {
        title: 'Finance & Banking Technology',
        description: 'Fintech solutions, banking apps, financial management systems, and payment gateways.',
        longDescription: `We deliver secure, scalable, and innovative financial technology solutions that transform how businesses and consumers interact with financial services. Our expertise includes banking applications, payment processing systems, investment platforms, and regulatory compliance solutions.

In the highly regulated financial sector, we prioritize security, compliance, and reliability. All our financial solutions incorporate robust security measures and comply with relevant financial regulations and standards.`,
        bgImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911',
        features: [
            'Digital Banking Applications',
            'Payment Processing Systems',
            'Investment & Trading Platforms',
            'Risk Management Software',
            'Regulatory Compliance Solutions',
            'Fraud Detection & Prevention'
        ],
        benefits: [
            'Secure financial transactions and data',
            'Automate financial processes and operations',
            'Comply with financial regulations',
            'Improve customer financial experience',
            'Enable digital transformation in banking',
            'Reduce operational risks and costs'
        ],
        technologies: [
            { name: 'Blockchain Technology', description: 'Secure transactions' },
            { name: 'Cryptography', description: 'Data encryption' },
            { name: 'Payment APIs', description: 'Transaction processing' },
            { name: 'Financial SDKs', description: 'Banking integration' },
            { name: 'Security Standards', description: 'Compliance protocols' },
            { name: 'Real-time Processing', description: 'Instant transactions' }
        ],
        caseStudies: [
            {
                title: 'Mobile Banking App',
                description: 'Developed secure mobile banking app with biometric authentication.',
                result: '300% increase in mobile users',
                image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070'
            },
            {
                title: 'Payment Gateway',
                description: 'Built custom payment gateway processing $10M+ monthly.',
                result: '99.9% uptime reliability',
                image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911'
            },
            {
                title: 'Investment Platform',
                description: 'Created robo-advisor investment platform for retail investors.',
                result: 'Managed $100M+ in assets',
                image: 'https://images.unsplash.com/photo-1642790553124-4c56d74c5a6a?q=80&w=2070'
            },
            {
                title: 'Fraud Detection System',
                description: 'Implemented AI-based fraud detection for financial institution.',
                result: 'Reduced fraud by 95%',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070'
            }
        ],
        statistics: {
            projects: 95,
            avgProjectSize: '$150,000',
            growth: '40%',
            clientSatisfaction: '98%'
        },
        pricing: {
            small: 'Starting from $75,000',
            medium: 'Starting from $200,000',
            enterprise: 'Custom pricing'
        }
    },
    'education': {
        title: 'Education Technology',
        description: 'E-learning platforms, educational apps, LMS development, and digital learning solutions.',
        longDescription: `We revolutionize education through technology by creating engaging, accessible, and effective learning solutions. Our expertise spans learning management systems, educational applications, virtual classrooms, and interactive learning tools.

Whether you're an educational institution, corporate training department, or edtech startup, we deliver solutions that enhance learning outcomes, improve engagement, and scale education delivery globally.`,
        bgImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070',
        features: [
            'Learning Management Systems (LMS)',
            'Virtual Classroom Platforms',
            'Educational Mobile Applications',
            'Interactive Learning Tools',
            'Student Assessment Platforms',
            'Content Management Systems'
        ],
        benefits: [
            'Expand educational reach globally',
            'Personalize learning experiences',
            'Improve student engagement and outcomes',
            'Reduce operational costs',
            'Enable remote and hybrid learning',
            'Track learning analytics effectively'
        ],
        technologies: [
            { name: 'Moodle/Canvas', description: 'LMS platforms' },
            { name: 'Video Streaming', description: 'Live classes' },
            { name: 'Interactive Tools', description: 'Learning engagement' },
            { name: 'Assessment Systems', description: 'Student evaluation' },
            { name: 'Analytics Dashboards', description: 'Learning insights' },
            { name: 'Mobile Learning', description: 'On-the-go education' }
        ],
        caseStudies: [
            {
                title: 'University LMS Platform',
                description: 'Developed comprehensive LMS for major university serving 50,000+ students.',
                result: '95% student adoption rate',
                image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070'
            },
            {
                title: 'Corporate Training Platform',
                description: 'Built custom training platform for multinational corporation.',
                result: 'Reduced training costs by 60%',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070'
            },
            {
                title: 'Language Learning App',
                description: 'Created interactive language learning app with AI tutor.',
                result: '2M+ downloads globally',
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070'
            },
            {
                title: 'Virtual Science Lab',
                description: 'Developed virtual lab simulations for remote science education.',
                result: 'Improved comprehension by 75%',
                image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070'
            }
        ],
        statistics: {
            projects: 110,
            avgProjectSize: '$60,000',
            growth: '50%',
            clientSatisfaction: '97%'
        },
        pricing: {
            small: 'Starting from $30,000',
            medium: 'Starting from $80,000',
            enterprise: 'Custom pricing'
        }
    },
    'manufacturing-telecommunication': {
        title: 'Manufacturing & Telecommunication',
        description: 'Industrial software, IoT solutions, telecom systems, and supply chain management.',
        longDescription: `We provide cutting-edge technology solutions for manufacturing and telecommunications industries, enabling digital transformation, operational efficiency, and competitive advantage. Our expertise includes IoT integration, industrial automation, telecom systems, and supply chain optimization.

We understand the unique challenges of industrial environments and deliver robust, scalable solutions that withstand demanding operational conditions while driving business value.`,
        bgImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070',
        features: [
            'Industrial IoT Integration',
            'Supply Chain Management Systems',
            'Production Monitoring & Control',
            'Telecom Network Management',
            'Quality Control Automation',
            'Predictive Maintenance Solutions'
        ],
        benefits: [
            'Optimize production processes and efficiency',
            'Improve supply chain visibility and control',
            'Reduce operational costs through automation',
            'Enhance product quality and consistency',
            'Enable predictive maintenance',
            'Streamline telecom operations'
        ],
        technologies: [
            { name: 'IoT Platforms', description: 'Device connectivity' },
            { name: 'SCADA Systems', description: 'Industrial control' },
            { name: 'ERP Integration', description: 'Business processes' },
            { name: 'Telecom APIs', description: 'Network management' },
            { name: 'Predictive Analytics', description: 'Maintenance insights' },
            { name: '5G Integration', description: 'High-speed connectivity' }
        ],
        caseStudies: [
            {
                title: 'Smart Factory Implementation',
                description: 'Implemented IoT-enabled smart factory for automotive manufacturer.',
                result: '25% increase in production efficiency',
                image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070'
            },
            {
                title: 'Telecom Network Management',
                description: 'Built comprehensive network management system for telecom provider.',
                result: '40% reduction in network downtime',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074'
            },
            {
                title: 'Supply Chain Optimization',
                description: 'Developed AI-powered supply chain optimization for manufacturer.',
                result: '30% reduction in logistics costs',
                image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070'
            },
            {
                title: 'Predictive Maintenance System',
                description: 'Implemented predictive maintenance for industrial equipment.',
                result: 'Reduced maintenance costs by 45%',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
            }
        ],
        statistics: {
            projects: 75,
            avgProjectSize: '$200,000',
            growth: '30%',
            clientSatisfaction: '96%'
        },
        pricing: {
            small: 'Starting from $100,000',
            medium: 'Starting from $300,000',
            enterprise: 'Custom pricing'
        }
    },
    'travel-hospitality': {
        title: 'Travel & Hospitality Technology',
        description: 'Booking systems, travel apps, hospitality management software, and reservation platforms.',
        longDescription: `We transform the travel and hospitality industry through innovative technology solutions that enhance guest experiences, streamline operations, and drive revenue growth. Our expertise includes booking engines, hotel management systems, travel applications, and customer experience platforms.

We understand the dynamic nature of the travel industry and deliver solutions that adapt to changing customer preferences and market conditions.`,
        bgImage: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?q=80&w=2065',
        features: [
            'Booking & Reservation Systems',
            'Hotel Management Software',
            'Travel Mobile Applications',
            'Customer Experience Platforms',
            'Revenue Management Systems',
            'Loyalty Program Management'
        ],
        benefits: [
            'Increase booking efficiency and conversion',
            'Enhance guest experiences and satisfaction',
            'Streamline hotel and resort operations',
            'Boost customer loyalty and retention',
            'Optimize revenue and pricing',
            'Expand market reach globally'
        ],
        technologies: [
            { name: 'Booking APIs', description: 'Reservation systems' },
            { name: 'Payment Gateways', description: 'Transaction processing' },
            { name: 'CRM Systems', description: 'Customer management' },
            { name: 'Mobile Apps', description: 'On-the-go booking' },
            { name: 'Analytics Tools', description: 'Business insights' },
            { name: 'GPS Integration', description: 'Location services' }
        ],
        caseStudies: [
            {
                title: 'Hotel Chain Management System',
                description: 'Built centralized management system for hotel chain with 50+ properties.',
                result: '35% increase in operational efficiency',
                image: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?q=80&w=2065'
            },
            {
                title: 'Travel Booking Platform',
                description: 'Developed comprehensive travel booking platform for agency.',
                result: '200% increase in online bookings',
                image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070'
            },
            {
                title: 'Cruise Line Mobile App',
                description: 'Created mobile app for cruise line with onboard services.',
                result: '4.8-star rating in app stores',
                image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070'
            },
            {
                title: 'Airline Reservation System',
                description: 'Modernized reservation system for regional airline.',
                result: '99.9% system availability',
                image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074'
            }
        ],
        statistics: {
            projects: 65,
            avgProjectSize: '$80,000',
            growth: '55%',
            clientSatisfaction: '98%'
        },
        pricing: {
            small: 'Starting from $40,000',
            medium: 'Starting from $120,000',
            enterprise: 'Custom pricing'
        }
    },
    'media-entertainment': {
        title: 'Media & Entertainment Technology',
        description: 'Streaming platforms, content management systems, media apps, and digital entertainment.',
        longDescription: `We power the future of media and entertainment with innovative technology solutions that engage audiences, monetize content, and streamline operations. Our expertise includes streaming platforms, content management systems, media applications, and digital distribution solutions.

In the fast-paced world of media and entertainment, we deliver solutions that keep pace with changing consumer behaviors and technological advancements.`,
        bgImage: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=2070',
        features: [
            'Video Streaming Platforms',
            'Content Management Systems',
            'Media Player Applications',
            'Digital Rights Management',
            'Content Distribution Networks',
            'Audience Analytics Platforms'
        ],
        benefits: [
            'Expand audience reach and engagement',
            'Monetize digital content effectively',
            'Streamline content production and distribution',
            'Protect intellectual property rights',
            'Gain audience insights through analytics',
            'Adapt to changing media consumption habits'
        ],
        technologies: [
            { name: 'Video Streaming', description: 'Content delivery' },
            { name: 'CDN Services', description: 'Global distribution' },
            { name: 'DRM Systems', description: 'Content protection' },
            { name: 'Social APIs', description: 'Platform integration' },
            { name: 'Analytics Platforms', description: 'Audience insights' },
            { name: 'Content Encoding', description: 'Format optimization' }
        ],
        caseStudies: [
            {
                title: 'OTT Streaming Service',
                description: 'Built complete OTT streaming platform for media company.',
                result: '1M+ subscribers in first year',
                image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=2070'
            },
            {
                title: 'News CMS Platform',
                description: 'Developed content management system for major news network.',
                result: '60% faster content publishing',
                image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070'
            },
            {
                title: 'Music Streaming App',
                description: 'Created music streaming app with personalized recommendations.',
                result: '5M+ monthly active users',
                image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070'
            },
            {
                title: 'Podcast Distribution Platform',
                description: 'Built platform for podcast creation and distribution.',
                result: '10,000+ podcasts hosted',
                image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069'
            }
        ],
        statistics: {
            projects: 90,
            avgProjectSize: '$90,000',
            growth: '60%',
            clientSatisfaction: '97%'
        },
        pricing: {
            small: 'Starting from $50,000',
            medium: 'Starting from $150,000',
            enterprise: 'Custom pricing'
        }
    },
    'gaming': {
        title: 'Gaming & Esports Technology',
        description: 'Game development, gaming platforms, interactive entertainment, and esports solutions.',
        longDescription: `We create immersive gaming experiences and robust gaming platforms that captivate players and drive engagement. Our expertise spans game development, gaming platforms, multiplayer systems, and esports solutions, delivering entertainment that connects players worldwide.

Whether you're developing the next hit game or building a gaming platform, we bring technical excellence and creative vision to every project.`,
        bgImage: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=2070',
        features: [
            '2D/3D Game Development',
            'Multiplayer Gaming Systems',
            'Gaming Platform Development',
            'Esports Tournament Platforms',
            'Game Analytics & Monetization',
            'Virtual Reality Games'
        ],
        benefits: [
            'Create engaging gaming experiences',
            'Generate recurring revenue streams',
            'Build vibrant gaming communities',
            'Expand to global gaming markets',
            'Monetize through multiple channels',
            'Leverage cutting-edge gaming tech'
        ],
        technologies: [
            { name: 'Unity/Unreal Engine', description: 'Game development' },
            { name: 'Game Servers', description: 'Multiplayer hosting' },
            { name: 'Payment Systems', description: 'In-game purchases' },
            { name: 'Analytics', description: 'Player insights' },
            { name: 'VR/AR', description: 'Immersive experiences' },
            { name: 'Cloud Gaming', description: 'Streaming technology' }
        ],
        caseStudies: [
            {
                title: 'Mobile Casino Game',
                description: 'Developed popular casino game with social features.',
                result: '10M+ downloads worldwide',
                image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071'
            },
            {
                title: 'Esports Tournament Platform',
                description: 'Built platform for organizing esports tournaments.',
                result: '500,000+ tournament participants',
                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070'
            },
            {
                title: 'Educational Game Series',
                description: 'Created series of educational games for children.',
                result: 'Used in 5,000+ schools',
                image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070'
            },
            {
                title: 'VR Adventure Game',
                description: 'Developed immersive VR adventure game.',
                result: 'Industry award winner',
                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070'
            }
        ],
        statistics: {
            projects: 50,
            avgProjectSize: '$150,000',
            growth: '70%',
            clientSatisfaction: '95%'
        },
        pricing: {
            small: 'Starting from $80,000',
            medium: 'Starting from $250,000',
            enterprise: 'Custom pricing'
        }
    },
    'internet-of-things': {
        title: 'Internet of Things Solutions',
        description: 'IoT solutions, smart devices, connected systems, and industrial automation.',
        longDescription: `We enable digital transformation through IoT solutions that connect devices, gather data, and automate processes across industries. Our expertise includes IoT platform development, smart device integration, industrial automation, and connected system solutions.

From smart homes to industrial IoT, we deliver solutions that harness the power of connected devices to drive efficiency, insights, and innovation.`,
        bgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070',
        features: [
            'IoT Platform Development',
            'Smart Device Integration',
            'Industrial Automation Solutions',
            'Sensor Network Implementation',
            'Real-time Data Monitoring',
            'Predictive Maintenance Systems'
        ],
        benefits: [
            'Automate processes and operations',
            'Improve operational efficiency',
            'Enable remote monitoring and control',
            'Reduce maintenance costs',
            'Gather valuable operational data',
            'Enhance safety and reliability'
        ],
        technologies: [
            { name: 'IoT Protocols', description: 'Device communication' },
            { name: 'Edge Computing', description: 'Local processing' },
            { name: 'Cloud Platforms', description: 'Data management' },
            { name: 'Sensor Integration', description: 'Data collection' },
            { name: 'Data Analytics', description: 'Insights generation' },
            { name: '5G Connectivity', description: 'High-speed data' }
        ],
        caseStudies: [
            {
                title: 'Smart City Platform',
                description: 'Developed IoT platform for smart city initiatives.',
                result: '30% reduction in energy consumption',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070'
            },
            {
                title: 'Industrial IoT Monitoring',
                description: 'Implemented IoT monitoring for manufacturing plant.',
                result: '40% reduction in equipment downtime',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070'
            },
            {
                title: 'Smart Agriculture System',
                description: 'Built IoT system for precision agriculture.',
                result: '25% increase in crop yield',
                image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070'
            },
            {
                title: 'Healthcare IoT Monitoring',
                description: 'Developed patient monitoring IoT system.',
                result: 'Improved patient outcomes by 35%',
                image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2074'
            }
        ],
        statistics: {
            projects: 45,
            avgProjectSize: '$180,000',
            growth: '65%',
            clientSatisfaction: '96%'
        },
        pricing: {
            small: 'Starting from $100,000',
            medium: 'Starting from $300,000',
            enterprise: 'Custom pricing'
        }
    },
    'retail-ecommerce': {
        title: 'Retail & E-commerce Technology',
        description: 'E-commerce platforms, retail management systems, and omnichannel shopping experiences.',
        longDescription: `We transform retail businesses through technology solutions that enhance customer experiences, streamline operations, and drive sales growth. Our expertise includes e-commerce platforms, retail management systems, omnichannel solutions, and customer experience platforms.

Whether you're an online retailer or brick-and-mortar store, we deliver solutions that bridge the digital and physical retail worlds.`,
        bgImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070',
        features: [
            'E-commerce Platform Development',
            'Inventory Management Systems',
            'Point of Sale (POS) Solutions',
            'Customer Experience Platforms',
            'Mobile Commerce Applications',
            'Omnichannel Retail Solutions'
        ],
        benefits: [
            'Increase online sales and revenue',
            'Improve customer shopping experience',
            'Streamline inventory management',
            'Personalize marketing and offers',
            'Enable omnichannel retail',
            'Gain customer insights through analytics'
        ],
        technologies: [
            { name: 'E-commerce Platforms', description: 'Online store systems' },
            { name: 'Payment Gateways', description: 'Transaction processing' },
            { name: 'Inventory Systems', description: 'Stock management' },
            { name: 'Analytics', description: 'Business insights' },
            { name: 'Mobile Apps', description: 'Mobile shopping' },
            { name: 'CRM Systems', description: 'Customer management' }
        ],
        caseStudies: [
            {
                title: 'Global E-commerce Platform',
                description: 'Built scalable e-commerce platform for international retailer.',
                result: '300% increase in online sales',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070'
            },
            {
                title: 'Retail Chain POS System',
                description: 'Developed custom POS system for retail chain.',
                result: '50% faster checkout process',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070'
            },
            {
                title: 'Mobile Shopping App',
                description: 'Created mobile shopping app with AR features.',
                result: '4.9-star app store rating',
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070'
            },
            {
                title: 'Subscription Box Service',
                description: 'Built subscription platform for curated product boxes.',
                result: '100,000+ active subscribers',
                image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070'
            }
        ],
        statistics: {
            projects: 150,
            avgProjectSize: '$70,000',
            growth: '40%',
            clientSatisfaction: '98%'
        },
        pricing: {
            small: 'Starting from $35,000',
            medium: 'Starting from $100,000',
            enterprise: 'Custom pricing'
        }
    },
    'real-estate': {
        title: 'Real Estate Technology',
        description: 'Property management software, real estate platforms, and digital property solutions.',
        longDescription: `We modernize the real estate industry through technology solutions that streamline property management, enhance client experiences, and drive business growth. Our expertise includes property management systems, real estate platforms, virtual tours, and market analysis tools.

Whether you're a property manager, real estate agent, or developer, we deliver solutions that transform how real estate business is conducted.`,
        bgImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073',
        features: [
            'Property Management Systems',
            'Real Estate Listing Platforms',
            'Virtual Tour & 3D Visualization',
            'Real Estate CRM Solutions',
            'Market Analysis & Valuation Tools',
            'Document Management Systems'
        ],
        benefits: [
            'Streamline property management operations',
            'Improve client engagement and service',
            'Automate listing and marketing processes',
            'Enhance property visibility and marketing',
            'Gain market insights through analytics',
            'Reduce paperwork and manual processes'
        ],
        technologies: [
            { name: 'VR/AR Technology', description: 'Virtual property tours' },
            { name: 'Property APIs', description: 'Listing integration' },
            { name: 'Document Management', description: 'Paperless processes' },
            { name: 'CRM Systems', description: 'Client management' },
            { name: 'Analytics Tools', description: 'Market insights' },
            { name: 'Mobile Apps', description: 'On-the-go access' }
        ],
        caseStudies: [
            {
                title: 'Property Management Platform',
                description: 'Built comprehensive platform for property management company.',
                result: '60% reduction in administrative work',
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073'
            },
            {
                title: 'Real Estate Marketplace',
                description: 'Developed marketplace for residential and commercial properties.',
                result: '10,000+ properties listed',
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073'
            },
            {
                title: 'Virtual Tour Platform',
                description: 'Created platform for interactive virtual property tours.',
                result: 'Reduced in-person visits by 70%',
                image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070'
            },
            {
                title: 'Commercial Real Estate App',
                description: 'Built app for commercial real estate transactions.',
                result: '$500M+ in facilitated deals',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070'
            }
        ],
        statistics: {
            projects: 70,
            avgProjectSize: '$85,000',
            growth: '35%',
            clientSatisfaction: '97%'
        },
        pricing: {
            small: 'Starting from $40,000',
            medium: 'Starting from $120,000',
            enterprise: 'Custom pricing'
        }
    },
    'logistics-transportation': {
        title: 'Logistics & Transportation Technology',
        description: 'Logistics software, transportation management systems, and supply chain solutions.',
        longDescription: `We optimize logistics and transportation operations through technology solutions that improve efficiency, reduce costs, and enhance visibility across the supply chain. Our expertise includes fleet management, route optimization, warehouse systems, and transportation management.

In the complex world of logistics, we deliver solutions that streamline operations, improve decision-making, and drive business growth.`,
        bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070',
        features: [
            'Fleet Management Systems',
            'Route Optimization Software',
            'Supply Chain Management',
            'Warehouse Management Systems',
            'Real-time Tracking Solutions',
            'Logistics Analytics Platforms'
        ],
        benefits: [
            'Optimize delivery routes and schedules',
            'Reduce transportation costs',
            'Improve supply chain visibility',
            'Enhance operational efficiency',
            'Enable real-time tracking',
            'Make data-driven logistics decisions'
        ],
        technologies: [
            { name: 'GPS Tracking', description: 'Real-time location' },
            { name: 'Route Optimization', description: 'Efficient routing' },
            { name: 'Warehouse Systems', description: 'Inventory management' },
            { name: 'Analytics', description: 'Performance insights' },
            { name: 'Mobile Apps', description: 'Driver management' },
            { name: 'IoT Integration', description: 'Asset tracking' }
        ],
        caseStudies: [
            {
                title: 'Fleet Management System',
                description: 'Built system for managing 500+ vehicle fleet.',
                result: '20% reduction in fuel costs',
                image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070'
            },
            {
                title: 'Last-Mile Delivery Platform',
                description: 'Developed platform for last-mile delivery optimization.',
                result: '35% faster delivery times',
                image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070'
            },
            {
                title: 'Warehouse Automation',
                description: 'Implemented automation system for warehouse operations.',
                result: '60% increase in order processing speed',
                image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070'
            },
            {
                title: 'Global Logistics Platform',
                description: 'Built platform for managing international logistics.',
                result: '40% improvement in shipment visibility',
                image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070'
            }
        ],
        statistics: {
            projects: 60,
            avgProjectSize: '$120,000',
            growth: '45%',
            clientSatisfaction: '96%'
        },
        pricing: {
            small: 'Starting from $60,000',
            medium: 'Starting from $180,000',
            enterprise: 'Custom pricing'
        }
    }
};

export default function IndustryDetailPage({ params }) {
    const industry = industryDetails[params.id];

    if (!industry) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
            {/* Hero Section with Background Image */}
            <section className="relative overflow-hidden text-white dark:text-gray-100 min-h-[70vh] flex items-center">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${industry.bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-green-900/40" />
                </div>

                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="max-w-4xl">
                        <Link
                            href="/industry"
                            className="inline-flex items-center gap-2 text-blue-300 dark:text-blue-400 hover:text-white mb-6"
                        >
                            ← Back to Industries
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mb-8">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                    {industry.title}
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-400 max-w-3xl">
                                    {industry.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                {[
                                    { icon: <FiClock />, value: `${industry.statistics.projects}+`, label: 'Projects Completed' },
                                    { icon: <FiDollarSign />, value: industry.statistics.avgProjectSize, label: 'Average Project Size' },
                                    { icon: <FiTrendingUp />, value: industry.statistics.growth, label: 'Industry Growth' },
                                    { icon: <FiBarChart />, value: industry.statistics.clientSatisfaction, label: 'Client Satisfaction' }
                                ].map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 text-center"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
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
                                Industry Overview
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-line">
                                    {industry.longDescription}
                                </p>
                            </div>
                        </section>

                        {/* Features */}
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Key Solutions
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {industry.features.map((feature, index) => (
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

                        {/* Case Studies with Images */}
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Case Studies
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {industry.caseStudies.map((caseStudy, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div
                                            className="h-48 relative overflow-hidden bg-gradient-to-br from-blue-600 to-green-600"
                                            style={{
                                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${caseStudy.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h3 className="text-xl font-bold text-white">
                                                    {caseStudy.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                                {caseStudy.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-semibold rounded-full">
                                                    Result: {caseStudy.result}
                                                </span>
                                                <FiArrowRight className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                                            </div>
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
                                    {industry.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <FiTrendingUp className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
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
                                    {industry.technologies.map((tech, index) => (
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
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${industry.bgImage})`,
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
                                            <span className="text-blue-200">Small Projects:</span>
                                            <span className="font-bold text-lg">{industry.pricing.small}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                                            <span className="text-blue-200">Medium Projects:</span>
                                            <span className="font-bold text-lg">{industry.pricing.medium}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                                            <span className="text-blue-200">Enterprise Solutions:</span>
                                            <span className="font-bold text-lg">{industry.pricing.enterprise}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Link
                                            href="/portal/signup"
                                            className="block w-full bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 rounded-lg text-center transition-colors"
                                        >
                                            Start Industry Project
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm py-3 rounded-lg text-center transition-colors"
                                        >
                                            Get Industry Consultation
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Industries */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Related Industries
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Explore other industries we serve with specialized solutions
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {(() => {
                            // Get related industries based on current industry
                            let related = [];

                            if (params.id === 'it-technology') {
                                related = [
                                    { title: 'Internet of Things', description: 'IoT solutions and connected systems', bgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070', href: '/industry/internet-of-things' },
                                    { title: 'Manufacturing Tech', description: 'Industrial software and automation', bgImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070', href: '/industry/manufacturing-telecommunication' },
                                    { title: 'Finance Technology', description: 'Fintech and banking solutions', bgImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911', href: '/industry/finance-banking' }
                                ];
                            } else if (params.id === 'medical-healthcare') {
                                related = [
                                    { title: 'Education Technology', description: 'E-learning and educational solutions', bgImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070', href: '/industry/education' },
                                    { title: 'IoT Solutions', description: 'Connected healthcare devices', bgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070', href: '/industry/internet-of-things' },
                                    { title: 'Retail Technology', description: 'Pharmacy and medical retail', bgImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070', href: '/industry/retail-ecommerce' }
                                ];
                            } else {
                                // Default related industries
                                related = [
                                    { title: 'IT Technology', description: 'Custom software solutions', bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074', href: '/industry/it-technology' },
                                    { title: 'Retail Technology', description: 'E-commerce and retail systems', bgImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070', href: '/industry/retail-ecommerce' },
                                    { title: 'Logistics Tech', description: 'Transportation and supply chain', bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070', href: '/industry/logistics-transportation' }
                                ];
                            }

                            return related.map((relatedIndustry, index) => (
                                <Link
                                    key={index}
                                    href={relatedIndustry.href}
                                    className="group overflow-hidden rounded-2xl hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div
                                        className="h-48 relative overflow-hidden bg-gradient-to-br from-blue-600 to-green-600"
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${relatedIndustry.bgImage})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">
                                                    {relatedIndustry.title}
                                                </h3>
                                                <p className="text-gray-200">
                                                    {relatedIndustry.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ));
                        })()}
                    </div>
                </div>
            </section>
        </div>
    );
}