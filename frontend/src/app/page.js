'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';

// Fix Image warnings
const NextImage = ({ src, alt, width, height, ...props }) => (
  <Image
    src={src}
    alt={alt}
    width={width || 500}
    height={height || 300}
    style={{ width: 'auto', height: 'auto' }}
    {...props}
  />
);

// Fixed Carousel with proper slide count
const DynamicCarousel = dynamic(() => import('@/Components/Carousels/Carousel'), {
  ssr: false,
  loading: () => <div className="h-screen bg-gradient-to-r from-gray-900 to-purple-900 animate-pulse" />
});

// Fixed Charts with proper container sizing
const DynamicCharts = dynamic(() => import('@/Components/Charts/Charts'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-800 rounded-lg animate-pulse min-h-[256px]" />
});

// Fixed 3D Model with WebGL fallback
const Dynamic3DModel = dynamic(() => import('@/Components/3DModels/3DModels'), {
  ssr: false,
  loading: () => <ModelSkeleton />
});

// Import components
import FeatureCards from '@/Components/Cards/FeatureCards';
import StatsSection from '@/Components/Stats/StatsSection';
import ServiceShowcase from '@/Components/Showcases/ServicesShowcases';
import VideoShowcase from '@/Components/Video/VideoShowcase';

// Fixed homeSlides with multiple slides for Swiper loop
const homeSlides = [
  {
    title: "AI-Powered Business Solutions",
    description: "Intelligent automation, machine learning models, and predictive analytics to transform your operations.",
    button: "Start AI Journey",
    link: "/services/ai-ml",
    bgImage: "/ai-ml-bg.jpg",
    overlay: "bg-gradient-to-r from-purple-900/70 via-violet-900/60 to-black/70",
    icon: "🤖",
    stats: "150+ AI Projects"
  },
  {
    title: "Modern Web Applications",
    description: "Build responsive, high-performance web applications with React, Next.js, and cutting-edge frameworks.",
    button: "Build Your Web App",
    link: "/services/web-dev",
    bgImage: "/web-app-bg.jpg",
    overlay: "bg-gradient-to-r from-blue-900/70 via-cyan-900/60 to-black/70",
    icon: "💻",
    stats: "300+ Web Projects"
  },
  {
    title: "Mobile App Excellence",
    description: "Create beautiful, native mobile applications for iOS and Android with seamless user experiences.",
    button: "Develop Mobile App",
    link: "/services/mobile",
    bgImage: "/mobile-bg.jpg",
    overlay: "bg-gradient-to-r from-green-900/70 via-emerald-900/60 to-black/70",
    icon: "📱",
    stats: "100+ Mobile Apps"
  },
  {
    title: "Cybersecurity Solutions",
    description: "Protect your digital assets with enterprise-grade security, penetration testing, and threat monitoring.",
    button: "Secure Your Business",
    link: "/services/cybersecurity",
    bgImage: "/security-bg.jpg",
    overlay: "bg-gradient-to-r from-red-900/70 via-rose-900/60 to-black/70",
    icon: "🔒",
    stats: "Zero Security Breaches"
  },
  {
    title: "Creative UI/UX Design",
    description: "Craft visually stunning and user-friendly interfaces that drive engagement and conversions.",
    button: "Design Experience",
    link: "/services/design",
    bgImage: "/design-ui-bg.jpg",
    overlay: "bg-gradient-to-r from-pink-900/70 via-fuchsia-900/60 to-black/70",
    icon: "🎨",
    stats: "95% Client Satisfaction"
  },
  {
    title: "Cloud & DevOps",
    description: "Accelerate development with automated pipelines, scalable infrastructure, and cloud optimization.",
    button: "Optimize Workflow",
    link: "/services/devops",
    bgImage: "/cloud-devops-bg.jpg",
    overlay: "bg-gradient-to-r from-cyan-900/70 via-teal-900/60 to-black/70",
    icon: "⚡",
    stats: "99.9% Uptime"
  },
  {
    title: "E-commerce Development",
    description: "Build high-converting online stores with seamless checkout, inventory management, and analytics.",
    button: "Launch Store",
    link: "/services/ecommerce",
    bgImage: "/ecommerce-store-bg.jpg",
    overlay: "bg-gradient-to-r from-amber-900/70 via-orange-900/60 to-black/70",
    icon: "🛒",
    stats: "200% Average Growth"
  },
  {
    title: "Data Analytics & BI",
    description: "Transform data into insights with interactive dashboards, reporting tools, and predictive models.",
    button: "Analyze Now",
    link: "/services/analytics",
    bgImage: "/analytics-dash-bg.jpg",
    overlay: "bg-gradient-to-r from-indigo-900/70 via-blue-900/60 to-black/70",
    icon: "📊",
    stats: "Data-Driven Results"
  },
  {
    title: "Digital Marketing",
    description: "Boost your online presence with SEO, content marketing, social media, and PPC campaigns.",
    button: "Grow Traffic",
    link: "/services/marketing",
    bgImage: "/marketing-digital-bg.jpg",
    overlay: "bg-gradient-to-r from-rose-900/70 via-pink-900/60 to-black/70",
    icon: "📈",
    stats: "300% ROI Average"
  },
  {
    title: "Custom Software",
    description: "Tailor-made software solutions designed to solve your unique business challenges.",
    button: "Custom Solution",
    link: "/services/custom",
    bgImage: "/custom-software-bg.jpg",
    overlay: "bg-gradient-to-r from-gray-900/70 via-slate-900/60 to-black/70",
    icon: "⚙️",
    stats: "Bespoke Solutions"
  }
];

const servicesData = [
  // AI & Machine Learning
  {
    id: "ai-models",
    title: "AI Models Development",
    description: "Custom AI models and machine learning solutions for automation, prediction, and intelligent decision-making.",
    icon: "🤖",
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Custom Neural Networks",
      "Computer Vision Models",
      "Natural Language Processing",
      "Predictive Analytics",
      "Chatbot Development",
      "Anomaly Detection",
      "Recommendation Systems",
      "AI Integration APIs"
    ],
    metrics: {
      projects: 120,
      satisfaction: 96,
      deliveryTime: "4-8 weeks",
      accuracy: "98%"
    },
    technologies: ["TensorFlow", "PyTorch", "OpenAI", "LangChain", "Hugging Face"]
  },

  // Website Development
  {
    id: "website-development",
    title: "Website Development",
    description: "Modern, responsive websites with cutting-edge technology and exceptional user experiences.",
    icon: "🌐",
    gradient: "from-blue-600 to-cyan-600",
    features: [
      "React/Next.js Development",
      "E-commerce Platforms",
      "Progressive Web Apps",
      "Headless CMS Integration",
      "Real-time Applications",
      "API Development",
      "Performance Optimization",
      "Cross-browser Compatibility"
    ],
    metrics: {
      projects: 320,
      satisfaction: 99,
      deliveryTime: "3-6 weeks",
      pageSpeed: "95+"
    },
    technologies: ["Next.js", "React", "Node.js", "MongoDB", "PostgreSQL"]
  },

  // Mobile Development
  {
    id: "mobile-development",
    title: "Android/iOS Development",
    description: "Native and cross-platform mobile applications with seamless performance and intuitive UX.",
    icon: "📱",
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Native iOS & Android Apps",
      "React Native Cross-platform",
      "Flutter Development",
      "App Store Optimization",
      "Push Notifications",
      "In-app Purchases",
      "Offline Capabilities",
      "App Analytics Integration"
    ],
    metrics: {
      projects: 185,
      satisfaction: 97,
      deliveryTime: "6-12 weeks",
      storeRating: "4.8/5"
    },
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"]
  },

  // Game Development
  {
    id: "game-development",
    title: "Game Development",
    description: "Immersive 2D/3D games and interactive experiences across multiple platforms.",
    icon: "🎮",
    gradient: "from-yellow-600 to-orange-600",
    features: [
      "2D/3D Game Development",
      "Unity & Unreal Engine",
      "Mobile Game Development",
      "VR/AR Experiences",
      "Multiplayer Gaming",
      "Game Physics & AI",
      "Game Store Publishing",
      "Monetization Strategies"
    ],
    metrics: {
      projects: 75,
      satisfaction: 95,
      deliveryTime: "8-16 weeks",
      userRetention: "85%"
    },
    technologies: ["Unity", "Unreal Engine", "Godot", "Three.js", "WebGL"]
  },

  // Graphics Design
  {
    id: "graphics-design",
    title: "Graphics Design",
    description: "Visually stunning designs that communicate your brand message effectively.",
    icon: "🎨",
    gradient: "from-pink-600 to-rose-600",
    features: [
      "Logo & Brand Identity",
      "Marketing Materials",
      "Social Media Graphics",
      "Infographic Design",
      "Print Design",
      "Motion Graphics",
      "Illustration",
      "Packaging Design"
    ],
    metrics: {
      projects: 240,
      satisfaction: 98,
      deliveryTime: "1-2 weeks",
      clientRevisions: "2 included"
    },
    technologies: ["Adobe Creative Suite", "Figma", "Canva", "Blender", "After Effects"]
  },

  // UI/UX Design
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "User-centered designs that deliver exceptional experiences and drive conversions.",
    icon: "✨",
    gradient: "from-indigo-600 to-violet-600",
    features: [
      "User Research & Testing",
      "Wireframing & Prototyping",
      "Interactive Design",
      "Design Systems",
      "Accessibility Compliance",
      "User Journey Mapping",
      "A/B Testing",
      "Mobile-First Design"
    ],
    metrics: {
      projects: 190,
      satisfaction: 98,
      deliveryTime: "2-4 weeks",
      conversionIncrease: "35% avg."
    },
    technologies: ["Figma", "Sketch", "Adobe XD", "InVision", "Miro"]
  },

  // Video Editing
  {
    id: "video-editing",
    title: "Video Editing",
    description: "Professional video production and editing for marketing, tutorials, and entertainment.",
    icon: "🎬",
    gradient: "from-red-600 to-orange-600",
    features: [
      "Corporate Videos",
      "Product Demos",
      "Animation & Motion Graphics",
      "Color Grading",
      "Sound Design",
      "Video SEO Optimization",
      "Social Media Clips",
      "YouTube Channel Management"
    ],
    metrics: {
      projects: 165,
      satisfaction: 96,
      deliveryTime: "1-3 weeks",
      videoQuality: "4K/8K"
    },
    technologies: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Final Cut Pro", "Blender"]
  },

  // Content Writing
  {
    id: "content-writing",
    title: "Content Writing",
    description: "Engaging, SEO-optimized content that drives traffic and establishes authority.",
    icon: "📝",
    gradient: "from-teal-600 to-cyan-600",
    features: [
      "SEO Blog Posts",
      "Website Copywriting",
      "Technical Documentation",
      "Whitepapers & Case Studies",
      "Social Media Content",
      "Email Campaigns",
      "Script Writing",
      "Content Strategy"
    ],
    metrics: {
      projects: 280,
      satisfaction: 97,
      deliveryTime: "3-5 days",
      seoRanking: "Top 10 results"
    },
    technologies: ["SEO Tools", "Grammarly", "SEMrush", "Ahrefs", "Copyscape"]
  },

  // SEO Optimization
  {
    id: "seo-optimization",
    title: "SEO Optimization",
    description: "Comprehensive SEO strategies to improve visibility and drive organic traffic.",
    icon: "📈",
    gradient: "from-amber-600 to-yellow-600",
    features: [
      "Technical SEO Audits",
      "Keyword Research",
      "On-page Optimization",
      "Link Building",
      "Local SEO",
      "E-commerce SEO",
      "SEO Analytics",
      "Competitor Analysis"
    ],
    metrics: {
      projects: 210,
      satisfaction: 98,
      deliveryTime: "Ongoing",
      trafficIncrease: "200% avg."
    },
    technologies: ["Google Analytics", "Search Console", "SEMrush", "Ahrefs", "Moz"]
  },

  // Cyber Security
  {
    id: "cyber-security",
    title: "Cyber Security",
    description: "Enterprise-grade security solutions to protect your digital assets and data.",
    icon: "🛡️",
    gradient: "from-gray-700 to-black",
    features: [
      "Security Audits & Testing",
      "Penetration Testing",
      "Network Security",
      "Data Encryption",
      "Threat Detection",
      "Incident Response",
      "Security Training",
      "Compliance (GDPR, HIPAA)"
    ],
    metrics: {
      projects: 135,
      satisfaction: 99,
      deliveryTime: "2-4 weeks",
      breachPrevention: "100%"
    },
    technologies: ["Firewalls", "SIEM", "WAF", "VPN", "Encryption Tools"]
  }
];

const performanceData = [
  { month: 'Jan', web: 65, mobile: 45, ai: 30, cyber: 25 },
  { month: 'Feb', web: 70, mobile: 50, ai: 35, cyber: 28 },
  { month: 'Mar', web: 75, mobile: 55, ai: 40, cyber: 32 },
  { month: 'Apr', web: 80, mobile: 60, ai: 45, cyber: 35 },
  { month: 'May', web: 85, mobile: 65, ai: 50, cyber: 38 },
];

export default function Home() {
  const [activeChartFilter, setActiveChartFilter] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section with Carousel */}
      <section className="relative min-h-screen">
        <DynamicCarousel slides={homeSlides} autoplayDelay={5000} />
        <div className="absolute bottom-10 left-0 right-0 z-20">
          <StatsSection />
        </div>
      </section>

      {/* 3D Model Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Visualize Your <span className="text-purple-600 dark:text-purple-400">Digital Future</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Interactive 3D model showcasing our technology integration
            </p>
          </div>
          <Dynamic3DModel />
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-blue-600 dark:text-blue-400">Services</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We provide end-to-end digital transformation services
            </p>
          </div>

          <ServiceShowcase services={servicesData} />
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Performance <span className="text-green-600 dark:text-green-400">Analytics</span>
            </h2>

            {/* Chart Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['All Services', 'Web', 'Mobile', 'AI', 'Security'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveChartFilter(filter.toLowerCase().replace(' ', ''))}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeChartFilter === filter.toLowerCase().replace(' ', '')
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Main Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">Service Growth Trends</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Monthly project growth</p>
                </div>
                <select className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="h-64 min-h-[256px]">
                <DynamicCharts
                  data={performanceData}
                  filter={activeChartFilter}
                  animate={true}
                />
              </div>
            </div>

            {/* Distribution Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">Project Distribution</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Service allocation</p>
                </div>
                <select className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm">
                  <option>Current Year</option>
                  <option>Quarterly</option>
                </select>
              </div>
              <div className="h-64 min-h-[256px]">
                <DynamicCharts type="pie" data={performanceData} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase - FIXED URL */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <VideoShowcase
            title="Client Success Stories"
            description="Watch how we transformed businesses with innovative digital solutions"
            videoUrl="https://www.youtube.com/watch?v=Hgg7M3kSqyE"
            thumbnail="/video-thumbnail.jpg"
          />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="text-purple-600 dark:text-purple-400">Choose Us</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We combine technical expertise with creative vision
            </p>
          </div>

          <FeatureCards
            cards={[
              {
                title: "End-to-End Solutions",
                description: "Complete digital transformation from concept to deployment.",
                icon: "🚀",
                gradient: "from-purple-600 to-pink-600",
                link: "/solutions",
                stats: "200+ Projects"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock technical support.",
                icon: "🛡️",
                gradient: "from-blue-600 to-cyan-600",
                link: "/support",
                stats: "99.9% Uptime"
              },
              {
                title: "AI Analytics",
                description: "Data-driven insights for business growth.",
                icon: "📊",
                gradient: "from-green-600 to-emerald-600",
                link: "/analytics",
                stats: "50% Growth"
              },
              {
                title: "Security",
                description: "Advanced security protocols.",
                icon: "🔐",
                gradient: "from-red-600 to-orange-600",
                link: "/security",
                stats: "Zero Breaches"
              }
            ]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Let&apos;s Build Something <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Amazing</span> Together
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Join 500+ satisfied clients
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacts"
              className="px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors"
            >
              Free Consultation
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-bold rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Skeleton Loaders
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function ModelSkeleton() {
  return (
    <div className="h-96 bg-gradient-to-br from-gray-200 to-purple-200 dark:from-gray-800 dark:to-purple-900 rounded-2xl animate-pulse flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}