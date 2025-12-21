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
    title: "Digital Transformation, Redefined",
    description: "We craft cutting-edge solutions in AI, web development, and cybersecurity to elevate your business.",
    button: "Start Your Journey",
    link: "/contacts",
    bgImage: "/hero-bg.jpg", // Use image instead of video to avoid 404
    overlay: "bg-gradient-to-r from-purple-900/70 to-black/70"
  },
  {
    title: "AI & Machine Learning Solutions",
    description: "Transform your business with cutting-edge artificial intelligence solutions.",
    button: "Explore AI",
    link: "/services/ai",
    bgImage: "/ai-bg.jpg",
    overlay: "bg-gradient-to-r from-blue-900/70 to-black/70"
  },
  {
    title: "Web & Mobile Development",
    description: "Build scalable, high-performance websites and mobile applications.",
    button: "View Projects",
    link: "/portfolio",
    bgImage: "/web-bg.jpg",
    overlay: "bg-gradient-to-r from-green-900/70 to-black/70"
  }
];

const servicesData = [
  {
    id: "ai",
    title: "AI & Machine Learning",
    description: "Intelligent automation and predictive analytics for business growth.",
    icon: "🧠",
    gradient: "from-purple-600 to-pink-600",
    features: ["Predictive Analytics", "Computer Vision", "NLP Chatbots", "Process Automation"],
    metrics: { projects: 85, satisfaction: 96 }
  },
  {
    id: "web",
    title: "Web Development",
    description: "Scalable, high-performance websites and web applications.",
    icon: "🌐",
    gradient: "from-blue-600 to-cyan-600",
    features: ["React/Next.js", "Real-time Apps", "E-commerce", "Progressive Web Apps"],
    metrics: { projects: 220, satisfaction: 99 }
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    description: "Native and cross-platform apps with flawless user experience.",
    icon: "📱",
    gradient: "from-green-600 to-emerald-600",
    features: ["iOS & Android", "React Native", "UI/UX Design", "App Store Optimization"],
    metrics: { projects: 145, satisfaction: 97 }
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    description: "Enterprise-grade security solutions and threat protection.",
    icon: "🔒",
    gradient: "from-red-600 to-orange-600",
    features: ["Threat Detection", "Data Encryption", "Security Audits", "24/7 Monitoring"],
    metrics: { projects: 110, satisfaction: 98 }
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
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeChartFilter === filter.toLowerCase().replace(' ', '')
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Build Something <span className="text-purple-600 dark:text-purple-400">Amazing</span>
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