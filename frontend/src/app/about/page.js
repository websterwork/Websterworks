// app/about/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiArrowRight, FiUsers, FiAward, FiClock, FiTarget,
  FiEye, FiZap, FiShield, FiHeart, FiGlobe, FiBriefcase,
  FiCheckCircle, FiTrendingUp, FiBookOpen, FiCpu,
  FiChevronRight, FiMail, FiMapPin, FiPhone, FiLinkedin,
  FiTwitter, FiGithub, FiDribbble
} from 'react-icons/fi';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Company values expanded
  const values = [
    {
      title: 'Innovation First',
      description: 'We stay ahead of technology curves to deliver cutting-edge solutions that give you a competitive advantage. Our R&D team constantly explores emerging technologies like AI, blockchain, and IoT to bring you future-ready solutions.',
      icon: FiZap,
      color: 'from-yellow-500 to-amber-500',
      stats: '15+ Patents Filed'
    },
    {
      title: 'Transparency Guaranteed',
      description: 'Our portal provides real-time visibility into every department, milestone, and deliverable. You\'ll never wonder about project status—see exactly what\'s happening, when it\'s happening, and who\'s working on it.',
      icon: FiEye,
      color: 'from-blue-500 to-cyan-500',
      stats: '100% Project Visibility'
    },
    {
      title: 'Quality Assured',
      description: 'Rigorous testing and quality assurance processes ensure enterprise-grade reliability. We follow ISO 9001 standards and maintain a 99.9% bug-free delivery rate through automated and manual testing protocols.',
      icon: FiAward,
      color: 'from-green-500 to-emerald-500',
      stats: '99.9% Bug-Free Rate'
    },
    {
      title: 'Client-Centric Approach',
      description: 'Your success is our success. We partner with you throughout your digital transformation journey, offering strategic guidance, technical expertise, and unwavering support long after project delivery.',
      icon: FiHeart,
      color: 'from-pink-500 to-rose-500',
      stats: '98% Client Retention'
    }
  ];

  // Company milestones/timeline
  const milestones = [
    {
      year: '2014',
      title: 'Company Founded',
      description: 'Websterwork was established with a vision to democratize access to enterprise-grade digital solutions.',
      icon: FiBriefcase
    },
    {
      year: '2016',
      title: 'First International Office',
      description: 'Expanded operations to London, UK, marking our first step into the global market.',
      icon: FiGlobe
    },
    {
      year: '2018',
      title: 'AI Division Launched',
      description: 'Established dedicated AI research and development team to focus on machine learning solutions.',
      icon: FiCpu
    },
    {
      year: '2020',
      title: 'Client Portal Revolution',
      description: 'Launched our transparent department-by-department project tracking portal, setting new industry standards.',
      icon: FiEye
    },
    {
      year: '2022',
      title: '500+ Projects Milestone',
      description: 'Celebrated completing over 500 successful projects across 50+ industries worldwide.',
      icon: FiAward
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Now serving clients in 30+ countries with 200+ expert team members across 4 continents.',
      icon: FiTrendingUp
    }
  ];

  // Leadership team
  const leadership = [
    {
      name: 'Alexander Webster',
      role: 'Founder & CEO',
      bio: 'Former CTO at TechGiants, Alexander founded Websterwork to bridge the gap between innovative technology and practical business applications.',
      image: '/team/alexander.jpg',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Sarah Chen',
      role: 'Chief Technology Officer',
      bio: 'AI researcher and full-stack architect with 15+ years of experience in building scalable enterprise systems.',
      image: '/team/sarah.jpg',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Operations',
      bio: 'Expert in agile methodologies and global team coordination, ensuring seamless project delivery across time zones.',
      image: '/team/marcus.jpg',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Priya Patel',
      role: 'Chief Innovation Officer',
      bio: 'Leading our R&D initiatives, Priya specializes in emerging technologies and their practical business applications.',
      image: '/team/priya.jpg',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    }
  ];

  // Company stats
  const stats = [
    { number: '10+', label: 'Years of Excellence', icon: FiClock },
    { number: '500+', label: 'Projects Delivered', icon: FiBriefcase },
    { number: '50+', label: 'Industries Served', icon: FiGlobe },
    { number: '200+', label: 'Team Members', icon: FiUsers },
    { number: '30+', label: 'Countries', icon: FiMapPin },
    { number: '98%', label: 'Client Retention', icon: FiHeart }
  ];

  // Certifications
  const certifications = [
    { name: 'ISO 9001:2024', description: 'Quality Management' },
    { name: 'ISO 27001', description: 'Information Security' },
    { name: 'AWS Advanced Partner', description: 'Cloud Services' },
    { name: 'Microsoft Gold Partner', description: 'Solutions Partner' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-white dark:text-gray-100">
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0" />

        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-20 dark:opacity-10"
          style={{
            backgroundImage: "url('/about-hero.jpg')",
            backgroundAttachment: 'fixed'
          }}
        />

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/30 mb-6">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">About Websterwork</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                We Transform Ideas Into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 dark:from-blue-400 dark:to-cyan-400">
                  Digital Reality
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Websterwork is a premier digital transformation partner, helping businesses leverage cutting-edge technology
                to solve complex challenges and drive sustainable growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/contact"
                  className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl"
                >
                  <span>Start Your Journey</span>
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform text-xl" />
                </Link>
                <Link
                  href="/team"
                  className="px-10 py-5 bg-white/10 dark:bg-gray-800/30 hover:bg-white/20 dark:hover:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 font-bold text-lg rounded-xl transition-all duration-300 border-2 border-white/30 dark:border-gray-600/30 hover:border-white/50 dark:hover:border-gray-600/50"
                >
                  Meet Our Team
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="white" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" className="dark:fill-gray-950" />
          </svg>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Left Column - Story Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Our Story</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                From Vision to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Global Impact
                </span>
              </h2>

              <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                <p>
                  Founded in 2014, Websterwork began with a simple yet powerful vision: to make enterprise-grade
                  digital transformation accessible to businesses of all sizes. What started as a small team of
                  passionate developers has grown into a global technology partner trusted by industry leaders
                  across 30+ countries.
                </p>
                <p>
                  Our journey has been defined by continuous innovation and an unwavering commitment to quality.
                  We pioneered the transparent department-by-department project tracking system, revolutionizing
                  how clients engage with development teams and setting new standards for accountability in the
                  industry.
                </p>
                <p>
                  Today, with over 200 expert team members and 500+ successful projects delivered, we continue
                  to push the boundaries of what's possible in digital transformation. Our dedication to
                  excellence has earned us ISO 9001 and ISO 27001 certifications, along with partnerships with
                  leading technology platforms including AWS and Microsoft.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                    <FiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{cert.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{cert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl rounded-full" />

              <div className="relative grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Our Core Values</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              What Drives{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Everything We Do
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              These principles guide our decisions, shape our culture, and define our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-2xl dark:hover:shadow-gray-800/30 transition-all duration-300 hover:-translate-y-2">
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                          {value.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`px-3 py-1 bg-gradient-to-r ${value.color} bg-opacity-10 text-white rounded-full text-xs font-medium`}>
                            {value.stats}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">Our Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              A Decade of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Growth & Innovation
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From our founding to global expansion, every milestone has strengthened our commitment to excellence.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative flex flex-col md:flex-row gap-8"
                    >
                      <div className="md:w-1/3 flex md:justify-end">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg md:ml-8 flex-shrink-0">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 md:hidden">
                            {milestone.year}
                          </span>
                        </div>
                      </div>

                      <div className="md:w-2/3">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
                          <span className="hidden md:block text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                            {milestone.year}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Leadership</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Meet the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Minds Behind Websterwork
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Experienced leaders committed to driving innovation and delivering exceptional value to our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-2xl dark:hover:shadow-gray-800/30 transition-all duration-300 hover:-translate-y-2">
                  <div className="relative mb-6">
                    <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                      <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">
                          {leader.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="absolute -bottom-3 -right-3 flex gap-2">
                      <a href={leader.social.linkedin} className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                        <FiLinkedin className="w-5 h-5" />
                      </a>
                      <a href={leader.social.twitter} className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-colors">
                        <FiTwitter className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
                    {leader.role}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {leader.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/team"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:gap-4 shadow-lg"
            >
              <span>View Full Team</span>
              <FiArrowRight className="text-xl" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Quote */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full mb-6">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">Client Success</span>
                </div>

                <FaQuoteLeft className="text-6xl text-gray-200 dark:text-gray-800 mb-6" />

                <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 leading-relaxed">
                  "Websterwork didn't just build our platform—they became our strategic technology partner. Their transparent approach and technical excellence transformed our business."
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                    SJ
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">Sarah Johnson</p>
                    <p className="text-gray-600 dark:text-gray-400">CEO, TechSolutions Inc.</p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - CTA */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 rounded-3xl p-12 text-white"
              >
                <h3 className="text-3xl font-bold mb-4">
                  Ready to Write Your Success Story?
                </h3>
                <p className="text-gray-200 text-lg mb-8">
                  Join 500+ businesses that have transformed their operations with Websterwork.
                </p>
                <div className="space-y-4">
                  <Link
                    href="/contact"
                    className="block w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl text-center transition-all duration-300"
                  >
                    Start Your Project
                  </Link>
                  <Link
                    href="/case-studies"
                    className="block w-full px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-lg rounded-xl text-center transition-all duration-300 border border-white/30"
                  >
                    View Case Studies
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Build Something{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                  Extraordinary Together
                </span>
              </h2>

              <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
                Whether you're a startup with a bold vision or an enterprise ready for transformation,
                we have the expertise and passion to bring your ideas to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/contact"
                  className="px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-2xl hover:shadow-3xl"
                >
                  <span>Contact Us Today</span>
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform text-2xl" />
                </Link>
                <Link
                  href="/services"
                  className="px-12 py-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm font-bold text-xl rounded-xl transition-all duration-300 border-2 border-white/30 hover:border-white/50"
                >
                  Explore Services
                </Link>
              </div>

              <div className="mt-16 flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-200">No commitment required</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-200">Free initial consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-200">24/7 support included</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}