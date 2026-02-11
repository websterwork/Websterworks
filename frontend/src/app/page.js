'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiArrowRight, FiStar, FiUsers, FiAward, FiClock,
  FiCheckCircle, FiTarget, FiEye, FiTrendingUp,
  FiZap, FiShield, FiCode, FiSmartphone, FiMonitor,
  FiBookOpen, FiBriefcase, FiGlobe, FiHeart
} from 'react-icons/fi';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: FiBriefcase },
    { number: '50+', label: 'Industries Served', icon: FiGlobe },
    { number: '99%', label: 'Client Satisfaction', icon: FiHeart },
    { number: '24/7', label: 'Support Available', icon: FiClock }
  ];

  const services = [
    {
      id: 'ai-models',
      title: 'AI Models Development',
      description: 'Custom AI models and machine learning solutions for automation and intelligent decision-making.',
      bgImage: '/services/ai-bg.jpg',
      darkBgImage: '/services/ai-bg-dark.jpg',
      icon: FiZap,
      link: '/services/ai-models'
    },
    {
      id: 'website-development',
      title: 'Website Development',
      description: 'Modern, responsive websites with React, Next.js, and cutting-edge frameworks.',
      bgImage: '/services/web-bg.jpg',
      darkBgImage: '/services/web-bg-dark.jpg',
      icon: FiMonitor,
      link: '/services/website-development'
    },
    {
      id: 'app-development',
      title: 'Android/iOS Development',
      description: 'Native and cross-platform mobile applications with seamless performance.',
      bgImage: '/services/mobile-bg.jpg',
      darkBgImage: '/services/mobile-bg-dark.jpg',
      icon: FiSmartphone,
      link: '/services/app-development'
    },
    {
      id: 'game-development',
      title: 'Game Development',
      description: 'Immersive 2D/3D games and interactive experiences across multiple platforms.',
      bgImage: '/services/game-bg.jpg',
      darkBgImage: '/services/game-bg-dark.jpg',
      icon: FiCode,
      link: '/services/game-development'
    },
    {
      id: 'graphics-design',
      title: 'Graphics Design',
      description: 'Visually stunning designs that communicate your brand message effectively.',
      bgImage: '/services/design-bg.jpg',
      darkBgImage: '/services/design-bg-dark.jpg',
      icon: FiTarget,
      link: '/services/graphics-design'
    },
    {
      id: 'uiux-design',
      title: 'UI/UX Design',
      description: 'User-centered designs that deliver exceptional experiences and drive conversions.',
      bgImage: '/services/uiux-bg.jpg',
      darkBgImage: '/services/uiux-bg-dark.jpg',
      icon: FiEye,
      link: '/services/uiux-design'
    },
    {
      id: 'video-editing',
      title: 'Video Editing',
      description: 'Professional video production and editing for marketing, tutorials, and entertainment.',
      bgImage: '/services/video-bg.jpg',
      darkBgImage: '/services/video-bg-dark.jpg',
      icon: FiTrendingUp,
      link: '/services/video-editing'
    },
    {
      id: 'content-writing',
      title: 'Content Writing',
      description: 'Engaging, SEO-optimized content that resonates with your audience.',
      bgImage: '/services/content-bg.jpg',
      darkBgImage: '/services/content-bg-dark.jpg',
      icon: FiBookOpen,
      link: '/services/content-writing'
    },
    {
      id: 'seo-optimisation',
      title: 'SEO Optimisation',
      description: 'Comprehensive SEO strategies to improve visibility and drive organic traffic.',
      bgImage: '/services/seo-bg.jpg',
      darkBgImage: '/services/seo-bg-dark.jpg',
      icon: FiTrendingUp,
      link: '/services/seo-optimisation'
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security',
      description: 'Enterprise-grade security solutions to protect your digital assets and data.',
      bgImage: '/services/security-bg.jpg',
      darkBgImage: '/services/security-bg-dark.jpg',
      icon: FiShield,
      link: '/services/cyber-security'
    }
  ];

  const industries = [
    {
      id: 'it-technology',
      title: 'IT Technology',
      description: 'Custom software solutions for tech companies and startups',
      bgImage: '/industries/it-bg.jpg',
      darkBgImage: '/industries/it-bg-dark.jpg',
      count: 120
    },
    {
      id: 'medical-healthcare',
      title: 'Medical & Healthcare',
      description: 'Healthcare apps, telemedicine platforms, and medical software',
      bgImage: '/industries/medical-bg.jpg',
      darkBgImage: '/industries/medical-bg-dark.jpg',
      count: 85
    },
    {
      id: 'finance-banking',
      title: 'Finance & Banking',
      description: 'Fintech solutions, banking apps, and financial management systems',
      bgImage: '/industries/finance-bg.jpg',
      darkBgImage: '/industries/finance-bg-dark.jpg',
      count: 95
    },
    {
      id: 'education',
      title: 'Education',
      description: 'E-learning platforms, educational apps, and LMS development',
      bgImage: '/industries/education-bg.jpg',
      darkBgImage: '/industries/education-bg-dark.jpg',
      count: 110
    },
    {
      id: 'manufacturing-telecommunication',
      title: 'Manufacturing & Telecommunication',
      description: 'Industrial software, IoT solutions, and telecom systems',
      bgImage: '/industries/manufacturing-bg.jpg',
      darkBgImage: '/industries/manufacturing-bg-dark.jpg',
      count: 75
    },
    {
      id: 'travel-hospitality',
      title: 'Travel & Hospitality',
      description: 'Booking systems, travel apps, and hospitality management software',
      bgImage: '/industries/travel-bg.jpg',
      darkBgImage: '/industries/travel-bg-dark.jpg',
      count: 65
    },
    {
      id: 'media-entertainment',
      title: 'Media & Entertainment',
      description: 'Streaming platforms, content management systems, and media apps',
      bgImage: '/industries/media-bg.jpg',
      darkBgImage: '/industries/media-bg-dark.jpg',
      count: 90
    },
    {
      id: 'gaming',
      title: 'Gaming',
      description: 'Game development, gaming platforms, and interactive entertainment',
      bgImage: '/industries/gaming-bg.jpg',
      darkBgImage: '/industries/gaming-bg-dark.jpg',
      count: 50
    },
    {
      id: 'internet-of-things',
      title: 'Internet of Things',
      description: 'IoT solutions, smart devices, and connected systems',
      bgImage: '/industries/iot-bg.jpg',
      darkBgImage: '/industries/iot-bg-dark.jpg',
      count: 45
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechSolutions Inc.',
      content: 'The transparent portal system changed how we manage projects. Seeing each department\'s progress in real-time gave us complete confidence.',
      rating: 5,
      project: 'E-commerce Platform',
      image: '/testimonials/client1.jpg',
      darkImage: '/testimonials/client1-dark.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'CTO, HealthCare Plus',
      content: 'Their cybersecurity team prevented a major breach. The department-based approach ensured specialized attention at every stage.',
      rating: 5,
      project: 'Healthcare Security Suite',
      image: '/testimonials/client2.jpg',
      darkImage: '/testimonials/client2-dark.jpg'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Marketing Director, Global Retail',
      content: 'From SEO to content creation, each department delivered exceptional work. The portal made collaboration seamless.',
      rating: 5,
      project: 'Digital Marketing Campaign',
      image: '/testimonials/client3.jpg',
      darkImage: '/testimonials/client3-dark.jpg'
    },
    {
      name: 'David Park',
      role: 'Founder, EduTech Innovations',
      content: 'The mobile app development was handled perfectly by their dedicated teams. Milestone-based payments through the portal were very convenient.',
      rating: 5,
      project: 'Educational Mobile App',
      image: '/testimonials/client4.jpg',
      darkImage: '/testimonials/client4-dark.jpg'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Place Your Order',
      description: 'Browse services, select what you need, and submit requirements through our portal'
    },
    {
      step: '02',
      title: 'Team Assignment',
      description: 'Our expert team reviews your requirements and assigns dedicated specialists'
    },
    {
      step: '03',
      title: 'Department Processing',
      description: 'Project moves through specialized departments for each phase of development'
    },
    {
      step: '04',
      title: 'Delivery & Support',
      description: 'Complete delivery with ongoing support and maintenance options'
    }
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'We stay ahead of technology curves to deliver cutting-edge solutions that give you a competitive advantage.',
      icon: FiZap
    },
    {
      title: 'Transparency Guaranteed',
      description: 'Our portal provides real-time visibility into every department, milestone, and deliverable.',
      icon: FiEye
    },
    {
      title: 'Quality Assured',
      description: 'Rigorous testing and quality assurance processes ensure enterprise-grade reliability.',
      icon: FiAward
    },
    {
      title: 'Client-Centric Approach',
      description: 'Your success is our success. We partner with you throughout your digital transformation journey.',
      icon: FiUsers
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-white dark:text-gray-100 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0" />

        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-40 dark:opacity-20"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundAttachment: 'fixed'
          }}
        />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/30 mb-6">
                  <FiAward className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium">Trusted by 500+ Companies</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
                  Digital Excellence
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 dark:from-blue-400 dark:to-cyan-400 mt-4">
                    Across Every Industry
                  </span>
                </h1>

                <p className="text-2xl md:text-3xl text-white dark:text-gray-200 mb-12 leading-relaxed font-light">
                  From AI models to cybersecurity, we provide comprehensive digital solutions with transparent, department-by-department project tracking.
                </p>

                <div className="flex flex-col sm:flex-row gap-6">
                  <Link
                    href="/portal/signup"
                    className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white dark:text-gray-100 font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl"
                  >
                    <span>Start Your Project</span>
                    <FiArrowRight className="group-hover:translate-x-2 transition-transform text-xl" />
                  </Link>
                  <Link
                    href="/services"
                    className="px-10 py-5 bg-white/10 dark:bg-gray-800/30 hover:bg-white/20 dark:hover:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 font-bold text-lg rounded-xl transition-all duration-300 border-2 border-white/30 dark:border-gray-600/30 hover:border-white/50 dark:hover:border-gray-600/50"
                  >
                    Explore Services
                  </Link>
                </div>
              </motion.div>

              {/* Right Column - Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-6"
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 rounded-2xl p-8 text-center hover:bg-white/15 dark:hover:bg-gray-800/40 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex justify-center mb-3">
                        <Icon className="w-8 h-8 text-blue-300" />
                      </div>
                      <div className="text-4xl md:text-5xl font-bold text-white dark:text-gray-100 mb-3">
                        {stat.number}
                      </div>
                      <div className="text-gray-200 dark:text-gray-300 text-lg font-medium">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section - NEW */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-blue-500 to-purple-600">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <FiUsers className="w-20 h-20 mx-auto mb-4 opacity-50" />
                      <h3 className="text-3xl font-bold">10+ Years</h3>
                      <p className="text-lg opacity-90">of Digital Excellence</p>
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
                      <FiAward className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">98%</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Client Retention</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">About Us</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                We Transform Ideas Into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Digital Reality
                </span>
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Websterwork is a premier digital transformation partner, helping businesses leverage cutting-edge technology to solve complex challenges and drive sustainable growth.
              </p>

              <div className="space-y-4 mb-8">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-6">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
                >
                  <span>Learn more about us</span>
                  <FiArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 font-semibold hover:text-gray-900 dark:hover:text-white transition-all"
                >
                  <span>Meet our team</span>
                  <FiUsers className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">What We Do</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Our Comprehensive{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Services
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              From AI development to cybersecurity, we cover all aspects of digital transformation with specialized department expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group"
                >
                  <Link href={service.link}>
                    <div className="relative overflow-hidden rounded-2xl h-80 hover:shadow-2xl dark:hover:shadow-gray-800/30 transition-all duration-500">
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 dark:hidden"
                        style={{ backgroundImage: `url('${service.bgImage}')` }}
                      />
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 hidden dark:block"
                        style={{ backgroundImage: `url('${service.darkBgImage || service.bgImage}')` }}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent dark:from-black/95 dark:via-black/60 dark:to-transparent" />

                      {/* Content */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div className="w-12 h-12 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-white/20 dark:border-gray-700/30">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white dark:text-gray-100 mb-3 group-hover:text-blue-300 dark:group-hover:text-blue-400 transition-colors">
                          {service.title}
                        </h3>

                        <p className="text-gray-200 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {service.description}
                        </p>

                        <div className="flex items-center gap-2 text-blue-300 dark:text-blue-400 font-semibold">
                          <span>Learn more</span>
                          <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl rounded-xl transition-all duration-300 hover:gap-4 shadow-lg hover:shadow-xl"
            >
              <span>View All Services</span>
              <FiArrowRight className="text-2xl" />
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/30 mb-6">
              <span className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-white">Industries We Serve</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-gray-100 mb-6">
              Transforming{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Every Sector
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We deliver specialized solutions across diverse sectors, understanding each industry's unique challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={`/industry/${industry.id}`}>
                  <div className="relative overflow-hidden rounded-2xl h-64 hover:shadow-2xl dark:hover:shadow-gray-800/30 transition-all duration-500 group">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 dark:hidden"
                      style={{ backgroundImage: `url('${industry.bgImage}')` }}
                    />
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 hidden dark:block"
                      style={{ backgroundImage: `url('${industry.darkBgImage || industry.bgImage}')` }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent dark:from-black/95 dark:via-black/70 dark:to-transparent" />

                    {/* Content */}
                    <div className="relative h-full p-8 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-bold text-white dark:text-gray-100 group-hover:text-blue-300 dark:group-hover:text-blue-400 transition-colors">
                          {industry.title}
                        </h3>
                        <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                          {industry.count}+ Projects
                        </span>
                      </div>

                      <p className="text-gray-200 dark:text-gray-300 text-base">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/industry"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold text-xl rounded-xl hover:bg-gray-100 transition-all duration-300 hover:gap-4 shadow-lg"
            >
              <span>Explore All Industries</span>
              <FiArrowRight className="text-2xl" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">How We Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Simple, Transparent{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Process
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              From concept to delivery, we ensure complete visibility and collaboration at every step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 -translate-x-1/2 z-0" />
                )}

                <div className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-800 hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform rotate-45">
                    <span className="text-2xl font-bold text-white -rotate-45">{step.step}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">Client Success</span>
            </div>
            <div className="inline-flex items-center gap-3 mb-6">
              <FaQuoteLeft className="text-4xl text-purple-600 dark:text-purple-500" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
                Trusted by Industry Leaders
              </h2>
              <FaQuoteRight className="text-4xl text-purple-600 dark:text-purple-500" />
            </div>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              See what our clients say about our transparent portal-based project delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full border border-gray-100 dark:border-gray-800 hover:-translate-y-1">
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 text-yellow-500 dark:text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-8">
                    <FaQuoteLeft className="absolute -top-4 -left-2 text-4xl text-purple-100 dark:text-purple-900/30" />
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic relative z-10">
                      "{testimonial.content}"
                    </p>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">{testimonial.project}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-3 text-purple-600 dark:text-purple-400 font-bold text-xl hover:gap-4 transition-all"
            >
              <span>Read More Success Stories</span>
              <FiArrowRight className="text-2xl" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-white dark:text-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>

              <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join hundreds of satisfied clients who trust Websterwork for their digital transformation journey.
                Experience our transparent portal-based project management.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/portal/signup"
                  className="px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl"
                >
                  <span>Get Started Now</span>
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform text-2xl" />
                </Link>
                <Link
                  href="/contact"
                  className="px-12 py-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm font-bold text-xl rounded-xl transition-all duration-300 border-2 border-white/30 hover:border-white/50"
                >
                  Schedule a Call
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-gray-200 text-base">Portal Access</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-gray-200 text-base">Satisfaction Guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">Transparent</div>
                  <div className="text-gray-200 text-base">Pricing</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">Expert</div>
                  <div className="text-gray-200 text-base">Team</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}