'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiSearch, FiFilter } from 'react-icons/fi';
import { motion } from 'framer-motion';

const industriesData = [
  {
    id: 'it-technology',
    title: 'IT & Technology',
    description: 'Custom software solutions for tech companies, startups, and digital transformation initiatives.',
    bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074',
    features: [
      'Custom Software Development',
      'Tech Stack Migration',
      'API Development & Integration',
      'Cloud Infrastructure',
      'DevOps & CI/CD',
      'Technical Consulting'
    ],
    benefits: [
      'Accelerate digital transformation',
      'Improve operational efficiency',
      'Scale with cutting-edge technology',
      'Stay ahead of competitors'
    ],
    technologies: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'Python'],
    projects: 120,
    growth: '35%',
    avgProjectSize: '$75,000'
  },
  {
    id: 'medical-healthcare',
    title: 'Medical & Healthcare',
    description: 'Healthcare apps, telemedicine platforms, medical software, and health tech solutions.',
    bgImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053',
    features: [
      'Telemedicine Platforms',
      'Electronic Health Records',
      'Medical Device Integration',
      'Healthcare Analytics',
      'Patient Management Systems',
      'Clinical Trial Software'
    ],
    benefits: [
      'Improve patient care delivery',
      'Enhance healthcare accessibility',
      'Ensure HIPAA compliance',
      'Optimize medical workflows'
    ],
    technologies: ['HIPAA Compliance', 'HL7/FHIR', 'Healthcare APIs', 'Security Protocols', 'Real-time Data'],
    projects: 85,
    growth: '45%',
    avgProjectSize: '$120,000'
  },
  {
    id: 'finance-banking',
    title: 'Finance & Banking',
    description: 'Fintech solutions, banking apps, financial management systems, and payment gateways.',
    bgImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911',
    features: [
      'Banking Applications',
      'Payment Processing Systems',
      'Investment Platforms',
      'Risk Management Software',
      'Regulatory Compliance',
      'Fraud Detection Systems'
    ],
    benefits: [
      'Secure financial transactions',
      'Automate financial processes',
      'Comply with regulations',
      'Improve customer financial experience'
    ],
    technologies: ['Blockchain', 'Cryptography', 'Payment APIs', 'Financial SDKs', 'Security Standards'],
    projects: 95,
    growth: '40%',
    avgProjectSize: '$150,000'
  },
  {
    id: 'education',
    title: 'Education',
    description: 'E-learning platforms, educational apps, LMS development, and digital learning solutions.',
    bgImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070',
    features: [
      'Learning Management Systems',
      'E-learning Applications',
      'Educational Games',
      'Virtual Classrooms',
      'Student Management',
      'Assessment Platforms'
    ],
    benefits: [
      'Expand educational reach',
      'Personalize learning experiences',
      'Reduce operational costs',
      'Improve student engagement'
    ],
    technologies: ['LMS Platforms', 'Video Streaming', 'Interactive Tools', 'Assessment Systems', 'Analytics'],
    projects: 110,
    growth: '50%',
    avgProjectSize: '$60,000'
  },
  {
    id: 'manufacturing-telecommunication',
    title: 'Manufacturing & Telecommunication',
    description: 'Industrial software, IoT solutions, telecom systems, and supply chain management.',
    bgImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070',
    features: [
      'IoT Integration',
      'Supply Chain Management',
      'Production Monitoring',
      'Telecom Systems',
      'Quality Control Software',
      'Inventory Management'
    ],
    benefits: [
      'Optimize production processes',
      'Improve supply chain efficiency',
      'Reduce operational costs',
      'Enhance quality control'
    ],
    technologies: ['IoT Platforms', 'SCADA Systems', 'ERP Integration', 'Telecom APIs', 'Data Analytics'],
    projects: 75,
    growth: '30%',
    avgProjectSize: '$200,000'
  },
  {
    id: 'travel-hospitality',
    title: 'Travel & Hospitality',
    description: 'Booking systems, travel apps, hospitality management software, and reservation platforms.',
    bgImage: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?q=80&w=2065',
    features: [
      'Booking & Reservation Systems',
      'Travel Management Apps',
      'Hotel Management Software',
      'Tourism Platforms',
      'Loyalty Programs',
      'Customer Experience Tools'
    ],
    benefits: [
      'Increase booking efficiency',
      'Enhance guest experiences',
      'Streamline operations',
      'Boost customer loyalty'
    ],
    technologies: ['Booking APIs', 'Payment Gateways', 'CRM Systems', 'Mobile Apps', 'Analytics Tools'],
    projects: 65,
    growth: '55%',
    avgProjectSize: '$80,000'
  },
  {
    id: 'media-entertainment',
    title: 'Media & Entertainment',
    description: 'Streaming platforms, content management systems, media apps, and digital entertainment.',
    bgImage: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=2070',
    features: [
      'Streaming Platforms',
      'Content Management Systems',
      'Media Players',
      'Social Media Integration',
      'Content Distribution',
      'Digital Rights Management'
    ],
    benefits: [
      'Expand audience reach',
      'Monetize digital content',
      'Improve user engagement',
      'Streamline content delivery'
    ],
    technologies: ['Video Streaming', 'CDN Services', 'DRM Systems', 'Social APIs', 'Analytics Platforms'],
    projects: 90,
    growth: '60%',
    avgProjectSize: '$90,000'
  },
  {
    id: 'gaming',
    title: 'Gaming',
    description: 'Game development, gaming platforms, interactive entertainment, and esports solutions.',
    bgImage: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=2070',
    features: [
      '2D/3D Game Development',
      'Gaming Platforms',
      'Multiplayer Systems',
      'Game Analytics',
      'Monetization Systems',
      'Esports Platforms'
    ],
    benefits: [
      'Create engaging experiences',
      'Generate recurring revenue',
      'Build gaming communities',
      'Expand market reach'
    ],
    technologies: ['Unity', 'Unreal Engine', 'Game Servers', 'Payment Systems', 'Analytics'],
    projects: 50,
    growth: '70%',
    avgProjectSize: '$150,000'
  },
  {
    id: 'internet-of-things',
    title: 'Internet of Things',
    description: 'IoT solutions, smart devices, connected systems, and industrial automation.',
    bgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070',
    features: [
      'IoT Platform Development',
      'Smart Device Integration',
      'Industrial Automation',
      'Sensor Networks',
      'Real-time Monitoring',
      'Predictive Maintenance'
    ],
    benefits: [
      'Automate processes',
      'Improve operational efficiency',
      'Enable remote monitoring',
      'Reduce maintenance costs'
    ],
    technologies: ['IoT Protocols', 'Edge Computing', 'Cloud Platforms', 'Sensor Integration', 'Data Analytics'],
    projects: 45,
    growth: '65%',
    avgProjectSize: '$180,000'
  },
  {
    id: 'retail-ecommerce',
    title: 'Retail & E-commerce',
    description: 'E-commerce platforms, retail management systems, and omnichannel shopping experiences.',
    bgImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070',
    features: [
      'E-commerce Platforms',
      'Inventory Management',
      'POS Systems',
      'Customer Analytics',
      'Mobile Commerce',
      'Omnichannel Solutions'
    ],
    benefits: [
      'Increase online sales',
      'Improve customer experience',
      'Streamline inventory',
      'Personalize marketing'
    ],
    technologies: ['E-commerce Platforms', 'Payment Gateways', 'Inventory Systems', 'Analytics', 'Mobile Apps'],
    projects: 150,
    growth: '40%',
    avgProjectSize: '$70,000'
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'Property management software, real estate platforms, and digital property solutions.',
    bgImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073',
    features: [
      'Property Management Systems',
      'Real Estate Platforms',
      'Virtual Tours',
      'CRM for Real Estate',
      'Market Analysis Tools',
      'Document Management'
    ],
    benefits: [
      'Streamline property management',
      'Improve client engagement',
      'Automate processes',
      'Enhance property visibility'
    ],
    technologies: ['VR/AR', 'Property APIs', 'Document Management', 'CRM Systems', 'Analytics Tools'],
    projects: 70,
    growth: '35%',
    avgProjectSize: '$85,000'
  },
  {
    id: 'logistics-transportation',
    title: 'Logistics & Transportation',
    description: 'Logistics software, transportation management systems, and supply chain solutions.',
    bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070',
    features: [
      'Fleet Management',
      'Route Optimization',
      'Supply Chain Software',
      'Warehouse Management',
      'Tracking Systems',
      'Logistics Analytics'
    ],
    benefits: [
      'Optimize delivery routes',
      'Reduce transportation costs',
      'Improve supply chain visibility',
      'Enhance operational efficiency'
    ],
    technologies: ['GPS Tracking', 'Route Optimization', 'Warehouse Systems', 'Analytics', 'Mobile Apps'],
    projects: 60,
    growth: '45%',
    avgProjectSize: '$120,000'
  }
];

const categories = [
  { id: 'all', name: 'All Industries' },
  { id: 'technology', name: 'Technology' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'finance', name: 'Finance' },
  { id: 'education', name: 'Education' },
  { id: 'manufacturing', name: 'Manufacturing' },
  { id: 'entertainment', name: 'Entertainment' }
];

const stats = [
  { value: '500+', label: 'Industry Projects' },
  { value: '50+', label: 'Industries Served' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: '40%', label: 'Average Growth' }
];

export default function IndustriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter industries based on category and search
  const filteredIndustries = industriesData.filter(industry => {
    const matchesCategory = selectedCategory === 'all' ||
      (selectedCategory === 'technology' && ['it-technology', 'internet-of-things'].includes(industry.id)) ||
      (selectedCategory === 'healthcare' && industry.id === 'medical-healthcare') ||
      (selectedCategory === 'finance' && industry.id === 'finance-banking') ||
      (selectedCategory === 'education' && industry.id === 'education') ||
      (selectedCategory === 'manufacturing' && industry.id === 'manufacturing-telecommunication') ||
      (selectedCategory === 'entertainment' && ['media-entertainment', 'gaming'].includes(industry.id));

    const matchesSearch = industry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-white dark:text-gray-100">
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60 z-0" />

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-green-300 dark:from-blue-400 dark:to-green-400">Expertise</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-8">
                Specialized digital solutions tailored to meet the unique challenges of your industry
              </p>

              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search industries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <div className="text-white text-xl font-bold">{stat.value.charAt(0)}</div>
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
              <span className="font-medium">Filter by sector:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
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

      {/* Industries Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIndustries.map((industry, index) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <Link href={`/industry/${industry.id}`}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full flex flex-col">
                    {/* Industry Header with Background Image */}
                    <div
                      className="h-48 relative overflow-hidden bg-gradient-to-br from-blue-600 to-green-600 group-hover:from-blue-700 group-hover:to-green-700 transition-all duration-500"
                      style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${industry.bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                          {industry.projects}+ Projects
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 z-10">
                        <h3 className="text-xl font-bold text-white">
                          {industry.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                            {industry.growth} Growth
                          </span>
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                            Avg: {industry.avgProjectSize}
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-700">
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `url(${industry.bgImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            filter: 'brightness(0.7)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Industry Content */}
                    <div className="p-6 flex-grow">
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {industry.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Solutions:</h4>
                        <div className="flex flex-wrap gap-2">
                          {industry.features.slice(0, 4).map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-1">
                          {industry.technologies.slice(0, 5).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between p-6 border-t border-gray-100 dark:border-gray-800">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium text-green-600 dark:text-green-400">{industry.growth}</span> industry growth
                      </div>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                        <span>View details</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredIndustries.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                No industries found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Industry Case Studies
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Real-world examples of how we've helped businesses in different industries succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                industry: 'Healthcare',
                title: 'Telemedicine Platform',
                description: 'Developed a HIPAA-compliant telemedicine platform serving 50,000+ patients',
                result: 'Reduced patient wait time by 70%',
                bgImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053'
              },
              {
                industry: 'Finance',
                title: 'Mobile Banking App',
                description: 'Built a secure mobile banking app with biometric authentication',
                result: 'Increased user adoption by 300%',
                bgImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911'
              },
              {
                industry: 'Education',
                title: 'E-learning Platform',
                description: 'Created an interactive e-learning platform for remote education',
                result: 'Improved student engagement by 65%',
                bgImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070'
              }
            ].map((caseStudy, index) => (
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
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${caseStudy.bgImage})`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-green-600/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />

                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                      <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full mb-3 inline-block">
                        {caseStudy.industry}
                      </span>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {caseStudy.title}
                      </h3>
                      <p className="text-gray-200 text-sm mb-3">
                        {caseStudy.description}
                      </p>
                    </div>

                    <div className="text-green-300 font-semibold text-sm">
                      {caseStudy.result}
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-green-900/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Industry?
              </h2>

              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Get industry-specific solutions tailored to your unique business challenges
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/portal/signup"
                  className="px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group backdrop-blur-sm"
                >
                  <span>Start Industry Project</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm font-semibold rounded-xl transition-all duration-300 border border-white/30 text-white"
                >
                  Get Industry Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </motion.button>
        {/* <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }}
                    >
                      <FiShare2 className="w-5 h-5" />
                    </motion.button> */}
      </div>
    </div>
  );
}