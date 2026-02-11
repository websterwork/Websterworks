'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiSearch, FiFilter, FiBarChart, FiUsers, FiClock, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';

const servicesData = [
  {
    id: 'ai-models',
    title: 'AI & Machine Learning',
    description: 'Intelligent automation and predictive analytics to transform your business operations.',
    bgImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070',
    features: [
      'Custom Neural Networks',
      'Predictive Analytics',
      'Natural Language Processing',
      'Computer Vision',
      'Chatbot Development',
      'Anomaly Detection'
    ],
    benefits: [
      'Automate repetitive tasks',
      'Make data-driven decisions',
      'Improve customer experience',
      'Reduce operational costs'
    ],
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Hugging Face', 'LangChain'],
    deliveryTime: '4-8 weeks',
    projects: 120
  },
  {
    id: 'website-development',
    title: 'Website Development',
    description: 'Modern, responsive websites that deliver exceptional user experiences.',
    bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070',
    features: [
      'React/Next.js Development',
      'E-commerce Solutions',
      'Progressive Web Apps',
      'API Integration',
      'Performance Optimization',
      'SEO Implementation'
    ],
    benefits: [
      'Increase online visibility',
      'Improve user engagement',
      'Boost conversion rates',
      'Scale with your business'
    ],
    technologies: ['Next.js', 'React', 'Node.js', 'TypeScript', 'MongoDB'],
    deliveryTime: '3-6 weeks',
    projects: 320
  },
  {
    id: 'app-development',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    bgImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070',
    features: [
      'Native iOS & Android',
      'React Native Cross-platform',
      'App Store Optimization',
      'Push Notifications',
      'Offline Capabilities',
      'In-app Purchases'
    ],
    benefits: [
      'Reach mobile audiences',
      'Enhanced customer engagement',
      'Increased brand loyalty',
      'New revenue streams'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    deliveryTime: '6-12 weeks',
    projects: 185
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    description: 'Enterprise-grade security solutions to protect your digital assets.',
    bgImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070',
    features: [
      'Security Audits & Testing',
      'Penetration Testing',
      'Threat Detection',
      'Data Encryption',
      'Incident Response',
      'Compliance Management'
    ],
    benefits: [
      'Protect sensitive data',
      'Prevent security breaches',
      'Ensure regulatory compliance',
      'Build customer trust'
    ],
    technologies: ['SIEM', 'WAF', 'VPN', 'Encryption', 'Firewalls'],
    deliveryTime: '2-4 weeks',
    projects: 135
  },
  {
    id: 'seo-optimisation',
    title: 'SEO Optimization',
    description: 'Comprehensive SEO strategies to improve visibility and drive organic traffic.',
    bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015',
    features: [
      'Technical SEO Audits',
      'Keyword Research',
      'On-page Optimization',
      'Link Building',
      'Local SEO',
      'SEO Analytics'
    ],
    benefits: [
      'Increase organic traffic',
      'Improve search rankings',
      'Generate qualified leads',
      'Boost online authority'
    ],
    technologies: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Search Console', 'Moz'],
    deliveryTime: 'Ongoing',
    projects: 210
  },
  {
    id: 'content-writing',
    title: 'Content Writing',
    description: 'Engaging, SEO-optimized content that resonates with your audience.',
    bgImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072',
    features: [
      'SEO Blog Posts',
      'Website Copywriting',
      'Technical Documentation',
      'Social Media Content',
      'Email Campaigns',
      'Whitepapers'
    ],
    benefits: [
      'Establish thought leadership',
      'Improve SEO rankings',
      'Engage your audience',
      'Drive conversions'
    ],
    technologies: ['SEO Tools', 'Grammarly', 'Copyscape', 'Hemingway'],
    deliveryTime: '3-5 days',
    projects: 280
  },
  {
    id: 'graphics-design',
    title: 'Graphics Design',
    description: 'Visually stunning designs that communicate your brand message effectively.',
    bgImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070',
    features: [
      'Logo & Brand Identity',
      'Marketing Materials',
      'Social Media Graphics',
      'Infographic Design',
      'Print Design',
      'Motion Graphics'
    ],
    benefits: [
      'Strengthen brand identity',
      'Improve visual appeal',
      'Increase engagement',
      'Stand out from competitors'
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Canva', 'Blender'],
    deliveryTime: '1-2 weeks',
    projects: 240
  },
  {
    id: 'uiux-design',
    title: 'UI/UX Design',
    description: 'User-centered designs that deliver exceptional experiences and drive conversions.',
    bgImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064',
    features: [
      'User Research & Testing',
      'Wireframing & Prototyping',
      'Interactive Design',
      'Design Systems',
      'Accessibility Compliance',
      'A/B Testing'
    ],
    benefits: [
      'Improve user satisfaction',
      'Increase conversion rates',
      'Reduce bounce rates',
      'Enhance brand perception'
    ],
    technologies: ['Figma', 'Sketch', 'Adobe XD', 'InVision', 'Miro'],
    deliveryTime: '2-4 weeks',
    projects: 190
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Professional video production and editing for marketing and entertainment.',
    bgImage: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2061',
    features: [
      'Corporate Videos',
      'Product Demos',
      'Animation & Motion Graphics',
      'Color Grading',
      'Sound Design',
      'Video SEO'
    ],
    benefits: [
      'Increase engagement',
      'Improve brand recall',
      'Drive social shares',
      'Boost conversion rates'
    ],
    technologies: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro'],
    deliveryTime: '1-3 weeks',
    projects: 165
  },
  {
    id: 'game-development',
    title: 'Game Development',
    description: 'Immersive 2D/3D games and interactive experiences across platforms.',
    bgImage: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=2070',
    features: [
      '2D/3D Game Development',
      'Unity & Unreal Engine',
      'Mobile Game Development',
      'VR/AR Experiences',
      'Multiplayer Gaming',
      'Game Monetization'
    ],
    benefits: [
      'Create engaging experiences',
      'Generate new revenue',
      'Build loyal communities',
      'Expand to new markets'
    ],
    technologies: ['Unity', 'Unreal Engine', 'Godot', 'Three.js', 'WebGL'],
    deliveryTime: '8-16 weeks',
    projects: 75
  }
];

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'development', name: 'Development' },
  { id: 'design', name: 'Design & Creative' },
  { id: 'marketing', name: 'Marketing & SEO' },
  { id: 'security', name: 'Security' },
  { id: 'ai', name: 'AI & Automation' }
];

const stats = [
  { icon: <FiBarChart />, value: '1000+', label: 'Projects Completed' },
  { icon: <FiUsers />, value: '200+', label: 'Happy Clients' },
  { icon: <FiClock />, value: '99%', label: 'On-time Delivery' },
  { icon: <FiShield />, value: '100%', label: 'Satisfaction Guarantee' }
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter services based on category and search
  const filteredServices = servicesData.filter(service => {
    const matchesCategory = selectedCategory === 'all' ||
      (selectedCategory === 'development' && ['website-development', 'app-development', 'game-development'].includes(service.id)) ||
      (selectedCategory === 'design' && ['graphics-design', 'uiux-design', 'video-editing'].includes(service.id)) ||
      (selectedCategory === 'marketing' && ['seo-optimisation', 'content-writing'].includes(service.id)) ||
      (selectedCategory === 'security' && service.id === 'cyber-security') ||
      (selectedCategory === 'ai' && service.id === 'ai-models');

    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-white dark:text-gray-100">
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0" />

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-400 dark:to-pink-400">Professional Services</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-8">
                Comprehensive digital solutions tailored to transform your business and drive growth
              </p>

              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <div className="text-white text-xl">{stat.icon}</div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FiFilter className="w-5 h-5" />
              <span className="font-medium">Filter by:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <Link href={`/services/${service.id}`}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full flex flex-col">
                    {/* Service Header with Background Image */}
                    <div
                      className="h-48 relative overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600"
                      style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${service.bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1 bg-purple-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                          {service.projects}+ Projects
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 z-10">
                        <h3 className="text-xl font-bold text-white">
                          {service.title}
                        </h3>
                      </div>
                      <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-700">
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `url(${service.bgImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            filter: 'brightness(0.8)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Service Content */}
                    <div className="p-6 flex-grow">
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.features.slice(0, 4).map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Benefits:</h4>
                        <ul className="space-y-1">
                          {service.benefits.slice(0, 3).map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between p-6 border-t border-gray-100 dark:border-gray-800">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">{service.deliveryTime}</span> delivery
                      </div>
                      <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                        <span>Learn more</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                No services found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Our Service Delivery Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Transparent, department-based workflow ensures quality and efficiency
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '01',
                title: 'Requirement Analysis',
                description: 'Our business logic team analyzes your requirements',
                bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
              },
              {
                step: '02',
                title: 'Planning & Design',
                description: 'Design team creates prototypes and wireframes',
                bgImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069'
              },
              {
                step: '03',
                title: 'Development & Testing',
                description: 'Development team builds and tests the solution',
                bgImage: 'https://images.unsplash.com/photo-1525547719578-118a4c8d22d7?q=80&w=1964'
              },
              {
                step: '04',
                title: 'Deployment & Support',
                description: 'Production team deploys and provides ongoing support',
                bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                <div
                  className="h-64 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${step.bgImage})`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />

                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                      <span className="text-gray-900 text-lg font-bold">{step.step}</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-200 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Project?
              </h2>

              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Choose a service and get started with our transparent portal-based project management
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/portal/signup"
                  className="px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group backdrop-blur-sm"
                >
                  <span>Get Started Now</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm font-semibold rounded-xl transition-all duration-300 border border-white/30 text-white"
                >
                  Schedule Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Technologies We Use
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We work with cutting-edge technologies to deliver modern solutions
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {[
              'React', 'Next.js', 'Node.js', 'Python', 'TensorFlow', 'AWS',
              'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes', 'GraphQL', 'TypeScript'
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group"
              >
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 flex items-center justify-center hover:shadow-lg transition-shadow overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <span className="text-gray-800 dark:text-gray-200 font-medium relative z-10">
                    {tech}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}