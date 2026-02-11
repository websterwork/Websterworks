// app/process/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiUsers,
  FiBriefcase, FiMessageCircle, FiFileText, FiCode,
  FiSmartphone, FiMonitor, FiShield, FiCpu, FiZap,
  FiTarget, FiEye, FiAward, FiTrendingUp, FiCalendar,
  FiChevronRight, FiDownload, FiUpload, FiRefreshCw,
  FiBarChart2, FiLayers, FiGrid, FiBox, FiGitMerge,
  FiSettings, FiTool, FiVideo, FiBookOpen
} from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ProcessPage() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeProjectType, setActiveProjectType] = useState('all');

  // Main process phases - Detailed
  const processPhases = [
    {
      id: 1,
      step: '01',
      title: 'Discovery & Planning',
      icon: FiTarget,
      color: 'from-blue-500 to-cyan-500',
      duration: '2-5 days',
      description: 'We dive deep into your vision, requirements, and business objectives to create a comprehensive project roadmap.',
      details: [
        'Initial consultation and requirement gathering',
        'Technical feasibility assessment',
        'Scope definition and milestone planning',
        'Technology stack selection',
        'Resource allocation strategy',
        'Risk assessment and mitigation planning',
        'Budget estimation and timeline projection',
        'Success metrics definition'
      ],
      deliverables: [
        'Project Requirements Document',
        'Technical Architecture Blueprint',
        'Project Timeline & Milestones',
        'Resource Allocation Plan',
        'Risk Assessment Report'
      ],
      tools: ['Jira', 'Confluence', 'Figma', 'Miro', 'Slack'],
      team: ['Project Manager', 'Technical Lead', 'Business Analyst', 'UX Researcher']
    },
    {
      id: 2,
      step: '02',
      title: 'Design & Architecture',
      icon: FiLayers,
      color: 'from-purple-500 to-pink-500',
      duration: '3-10 days',
      description: 'Our design team creates intuitive user experiences while architects build scalable, secure system foundations.',
      details: [
        'User experience (UX) research and wireframing',
        'User interface (UI) design and prototyping',
        'System architecture design',
        'Database schema design',
        'API contract definition',
        'Security architecture planning',
        'Scalability and performance optimization',
        'Design system creation'
      ],
      deliverables: [
        'Interactive Prototypes',
        'UI Design System',
        'Technical Architecture Document',
        'Database Schema',
        'API Documentation'
      ],
      tools: ['Figma', 'Sketch', 'Adobe XD', 'Lucidchart', 'Postman'],
      team: ['UI/UX Designer', 'System Architect', 'Frontend Lead', 'Database Expert']
    },
    {
      id: 3,
      step: '03',
      title: 'Development & Sprint Execution',
      icon: FiCode,
      color: 'from-green-500 to-emerald-500',
      duration: '2-20 weeks',
      description: 'Agile development sprints bring your project to life with continuous integration and regular client reviews.',
      details: [
        'Sprint planning and task breakdown',
        'Frontend and backend development',
        'Database implementation',
        'API development and integration',
        'Version control and code reviews',
        'Daily stand-ups and progress updates',
        'Weekly demo sessions',
        'Continuous integration/deployment'
      ],
      deliverables: [
        'Working Software Increments',
        'Sprint Reports',
        'Code Repository',
        'Integration Documentation',
        'Progress Dashboard'
      ],
      tools: ['Git', 'VS Code', 'Docker', 'Jest', 'GitHub Actions', 'Slack'],
      team: ['Frontend Developers', 'Backend Developers', 'DevOps Engineer', 'QA Engineer']
    },
    {
      id: 4,
      step: '04',
      title: 'Testing & Quality Assurance',
      icon: FiShield,
      color: 'from-orange-500 to-red-500',
      duration: '1-3 weeks',
      description: 'Rigorous testing ensures your solution is bug-free, secure, and performs flawlessly across all scenarios.',
      details: [
        'Functional testing',
        'Performance and load testing',
        'Security vulnerability scanning',
        'Cross-browser and device testing',
        'User acceptance testing (UAT)',
        'Accessibility compliance checking',
        'Bug tracking and resolution',
        'Quality metrics reporting'
      ],
      deliverables: [
        'Test Reports',
        'Bug Tracking Log',
        'Performance Benchmarks',
        'Security Audit Report',
        'UAT Sign-off'
      ],
      tools: ['Selenium', 'Jest', 'Cypress', 'OWASP ZAP', 'Lighthouse'],
      team: ['QA Lead', 'Automation Engineer', 'Security Specialist', 'DevOps Engineer']
    },
    {
      id: 5,
      step: '05',
      title: 'Deployment & Launch',
      icon: FiUpload,
      color: 'from-blue-600 to-purple-600',
      duration: '2-5 days',
      description: 'We orchestrate a smooth, carefully planned deployment to production with zero downtime.',
      details: [
        'Deployment strategy planning',
        'Production environment setup',
        'Database migration',
        'DNS and SSL configuration',
        'CDN setup and optimization',
        'Monitoring and alerting setup',
        'Launch day support',
        'Post-deployment verification'
      ],
      deliverables: [
        'Live Production Environment',
        'Deployment Documentation',
        'Monitoring Dashboard',
        'SSL Certificates',
        'Launch Report'
      ],
      tools: ['AWS/Azure/GCP', 'Kubernetes', 'Terraform', 'New Relic', 'Datadog'],
      team: ['DevOps Engineer', 'System Administrator', 'Technical Lead', 'Project Manager']
    },
    {
      id: 6,
      step: '06',
      title: 'Post-Launch & Ongoing Support',
      icon: FiRefreshCw,
      color: 'from-teal-500 to-cyan-500',
      duration: 'Ongoing',
      description: 'Our commitment continues after launch with dedicated support, maintenance, and continuous improvement.',
      details: [
        '24/7 monitoring and incident response',
        'Regular security updates and patches',
        'Performance optimization',
        'Bug fixes and hotfixes',
        'Feature enhancements and iterations',
        'Analytics and reporting',
        'Regular health checks',
        'Strategic consultation'
      ],
      deliverables: [
        'SLA Agreement',
        'Maintenance Schedule',
        'Incident Reports',
        'Monthly Performance Reviews',
        'Roadmap Updates'
      ],
      tools: ['Jira Service Desk', 'Datadog', 'PagerDuty', 'Google Analytics', 'Mixpanel'],
      team: ['Support Engineers', 'DevOps Team', 'Technical Account Manager', 'QA Engineer']
    }
  ];

  // Project type specific processes
  const projectTypes = [
    {
      id: 'web',
      name: 'Web Development',
      icon: FiMonitor,
      color: 'from-blue-500 to-cyan-500',
      description: 'Custom websites, web applications, and enterprise portals built with modern frameworks.',
      timeline: '4-16 weeks',
      team: '5-8 members',
      highlights: [
        'Responsive, mobile-first design',
        'SEO-optimized architecture',
        'CMS integration',
        'E-commerce functionality',
        'Third-party API integrations',
        'Progressive Web App (PWA) support'
      ]
    },
    {
      id: 'mobile',
      name: 'Mobile Development',
      icon: FiSmartphone,
      color: 'from-purple-500 to-pink-500',
      description: 'Native iOS, Android, and cross-platform mobile applications with exceptional performance.',
      timeline: '6-20 weeks',
      team: '4-6 members',
      highlights: [
        'Native (Swift/Kotlin) or cross-platform (React Native/Flutter)',
        'App Store and Google Play deployment',
        'Push notifications',
        'Offline capabilities',
        'Biometric authentication',
        'In-app purchases'
      ]
    },
    {
      id: 'ai',
      name: 'AI & Machine Learning',
      icon: FiCpu,
      color: 'from-green-500 to-emerald-500',
      description: 'Intelligent systems, predictive models, and automation solutions powered by cutting-edge AI.',
      timeline: '8-24 weeks',
      team: '4-7 members',
      highlights: [
        'Custom ML model development',
        'Natural language processing',
        'Computer vision solutions',
        'Predictive analytics',
        'Recommendation engines',
        'Automated decision systems'
      ]
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      icon: FiShield,
      color: 'from-red-500 to-orange-500',
      description: 'Comprehensive security solutions to protect your digital assets and ensure compliance.',
      timeline: '4-12 weeks',
      team: '3-6 members',
      highlights: [
        'Security audits and penetration testing',
        'Threat detection and response',
        'Compliance consulting (GDPR, HIPAA, PCI)',
        'Identity and access management',
        'Security training and awareness',
        'Incident response planning'
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud Solutions',
      icon: FiBox,
      color: 'from-blue-600 to-indigo-600',
      description: 'Scalable, secure cloud infrastructure and migration services across all major providers.',
      timeline: '4-16 weeks',
      team: '3-5 members',
      highlights: [
        'Cloud migration strategy',
        'Infrastructure as code',
        'Containerization (Docker, Kubernetes)',
        'Serverless architectures',
        'Cost optimization',
        'Disaster recovery'
      ]
    },
    {
      id: 'design',
      name: 'UI/UX Design',
      icon: FiTarget,
      color: 'from-pink-500 to-rose-500',
      description: 'User-centered design experiences that delight users and drive conversions.',
      timeline: '2-8 weeks',
      team: '2-4 members',
      highlights: [
        'User research and personas',
        'Wireframing and prototyping',
        'Visual design and branding',
        'Usability testing',
        'Design systems',
        'Accessibility compliance'
      ]
    }
  ];

  // Methodology highlights
  const methodologies = [
    {
      title: 'Agile Methodology',
      icon: FiGitMerge,
      description: 'We follow Scrum framework with 2-week sprints, daily stand-ups, and sprint reviews for complete transparency.',
      benefits: ['Adaptive planning', 'Continuous improvement', 'Fast iterations', 'Client feedback integration']
    },
    {
      title: 'DevOps Culture',
      icon: FiSettings,
      description: 'Automated CI/CD pipelines, infrastructure as code, and integrated monitoring for rapid, reliable deployments.',
      benefits: ['Automated testing', 'Continuous delivery', 'Infrastructure automation', 'Real-time monitoring']
    },
    {
      title: 'Quality First',
      icon: FiAward,
      description: 'Comprehensive testing strategy including unit, integration, E2E, performance, and security testing.',
      benefits: ['Zero-bug policy', 'Test-driven development', 'Code review process', 'Automated regression']
    },
    {
      title: 'Knowledge Transfer',
      icon: FiBookOpen,
      description: 'Comprehensive documentation, training sessions, and knowledge base to empower your internal teams.',
      benefits: ['Technical documentation', 'Admin training', 'Style guides', 'Knowledge base access']
    }
  ];

  // Communication channels
  const communicationChannels = [
    {
      name: 'Project Portal',
      description: 'Real-time dashboard with task tracking, milestones, and progress reports',
      icon: FiBarChart2
    },
    {
      name: 'Daily Stand-ups',
      description: '15-minute daily sync meetings with your dedicated project manager',
      icon: FiUsers
    },
    {
      name: 'Weekly Demos',
      description: 'Every Friday, we showcase completed work and gather feedback',
      icon: FiVideo
    },
    {
      name: 'Sprint Reviews',
      description: 'End-of-sprint presentations with stakeholders and leadership',
      icon: FiTrendingUp
    },
    {
      name: 'Slack Channel',
      description: 'Direct messaging channel for quick questions and updates',
      icon: FiMessageCircle
    },
    {
      name: 'Status Reports',
      description: 'Weekly written reports with accomplishments, risks, and next steps',
      icon: FiFileText
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-white">
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0" />

        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-20 dark:opacity-10"
          style={{
            backgroundImage: "url('/process-hero.jpg')",
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
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Our Process</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                Simple,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300 dark:from-green-400 dark:to-emerald-400">
                  Transparent
                </span>{' '}
                Process
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                From concept to delivery, we ensure complete visibility and collaboration at every step of your digital transformation journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/contact"
                  className="px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl"
                >
                  <span>Start Your Project</span>
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform text-xl" />
                </Link>
                <Link
                  href="/resources"
                  className="px-10 py-5 bg-white/10 dark:bg-gray-800/30 hover:bg-white/20 dark:hover:bg-gray-800/50 backdrop-blur-sm text-white font-bold text-lg rounded-xl transition-all duration-300 border-2 border-white/30 dark:border-gray-600/30 hover:border-white/50 dark:hover:border-gray-600/50"
                >
                  Explore Resources
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

      {/* Process Overview - Steps */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">6-Phase Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              How We{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Bring Ideas to Life
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our proven methodology ensures quality, transparency, and successful outcomes at every stage.
            </p>
          </div>

          {/* Interactive Phase Navigation */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {processPhases.map((phase, index) => (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(index)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activePhase === index
                      ? `bg-gradient-to-r ${phase.color} text-white shadow-lg`
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  <phase.icon className="w-4 h-4" />
                  <span>Phase {phase.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Phase Detailed View */}
          <div className="max-w-6xl mx-auto">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-2xl"
            >
              {/* Phase Header */}
              <div className={`bg-gradient-to-r ${processPhases[activePhase].color} p-8 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-6xl font-bold opacity-20">
                    {processPhases[activePhase].step}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <FiClock className="w-4 h-4" />
                      <span className="text-sm font-medium">{processPhases[activePhase].duration}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  {processPhases[activePhase].title}
                </h3>
                <p className="text-xl text-white/90 max-w-3xl">
                  {processPhases[activePhase].description}
                </p>
              </div>

              {/* Phase Details */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Detailed Steps */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FiCheckCircle className="w-5 h-5 text-green-600" />
                      What We Do
                    </h4>
                    <ul className="space-y-3">
                      {processPhases[activePhase].details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables & Team */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FiDownload className="w-5 h-5 text-blue-600" />
                        Key Deliverables
                      </h4>
                      <div className="space-y-2">
                        {processPhases[activePhase].deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <FiFileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FiUsers className="w-5 h-5 text-purple-600" />
                        Team Members
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {processPhases[activePhase].team.map((member, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full border border-purple-200 dark:border-purple-800"
                          >
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FiTool className="w-5 h-5 text-gray-600" />
                        Tools & Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {processPhases[activePhase].tools.map((tool, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Type Specific Processes */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Tailored Approach</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Processes Designed for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Every Project Type
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              While our core methodology remains consistent, we adapt our process to the unique requirements of each technology and solution.
            </p>
          </div>

          {/* Project Type Filter */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveProjectType('all')}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeProjectType === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                All Projects
              </button>
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveProjectType(type.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeProjectType === type.id
                      ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  <type.icon className="w-4 h-4" />
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Project Type Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {(activeProjectType === 'all'
              ? projectTypes
              : projectTypes.filter(t => t.id === activeProjectType)
            ).map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">
                      {type.name}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {type.description}
                    </p>

                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <FiClock className="w-4 h-4" />
                        <span>{type.timeline}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <FiUsers className="w-4 h-4" />
                        <span>{type.team}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {type.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <FiCheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/services/${type.id}`}
                      className="inline-flex items-center gap-2 mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium hover:gap-3 transition-all"
                    >
                      <span>Learn more</span>
                      <FiArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Left Column - Methodology */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Our Methodology</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Built on{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Industry Best Practices
                </span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Our process combines Agile development, DevOps culture, and rigorous quality assurance to deliver exceptional results—on time and on budget.
              </p>

              <div className="space-y-6">
                {methodologies.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {method.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                          {method.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {method.benefits.map((benefit, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column - Stats & Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-3xl rounded-full" />

              <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Project Timeline Overview
                </h3>

                <div className="space-y-4">
                  {processPhases.slice(0, 5).map((phase, index) => (
                    <div key={phase.id} className="relative">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white font-bold text-sm">{phase.id}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {phase.title}
                            </h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {phase.duration}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${phase.color}`}
                              style={{ width: `${index === 0 ? '15%' : index === 1 ? '25%' : index === 2 ? '50%' : index === 3 ? '20%' : '15%'}` }}
                            />
                          </div>
                        </div>
                      </div>
                      {index < 4 && (
                        <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -ml-px" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FiClock className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Average Project Duration
                      </p>
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                        8-16 weeks
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Communication & Transparency */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-cyan-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Always Connected</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Complete{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                Visibility & Communication
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We believe transparency is the foundation of successful partnerships. Here's how we keep you informed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {communicationChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {channel.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {channel.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Portal Preview */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-3xl p-8 text-white overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <FiBarChart2 className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Client Portal Access</h3>
                    <p className="text-gray-300">Real-time project tracking, available 24/7</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">85%</div>
                    <div className="text-sm text-gray-300">Overall Progress</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="text-2xl font-bold text-green-400 mb-1">12</div>
                    <div className="text-sm text-gray-300">Completed Tasks</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">3</div>
                    <div className="text-sm text-gray-300">In Progress</div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-400">Next milestone: UI Review - Mar 15</span>
                  <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium">
                    <span>View Dashboard</span>
                    <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">FAQ</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Common Questions About{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                  Our Process
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "How long does a typical project take?",
                  a: "Project timelines vary based on complexity and scope. A standard website takes 4-8 weeks, mobile apps 8-16 weeks, and complex enterprise solutions 16-24 weeks. We provide detailed timelines during the discovery phase."
                },
                {
                  q: "How do you handle changes or new requirements during development?",
                  a: "We embrace change through our Agile methodology. New requirements are evaluated, prioritized, and incorporated into future sprints. This flexibility ensures we're always building what you need most."
                },
                {
                  q: "What happens after the project is launched?",
                  a: "Our relationship doesn't end at launch. We offer ongoing maintenance packages, continuous support, and can continue to develop new features. You'll have access to our support team and portal."
                },
                {
                  q: "How do you protect my intellectual property?",
                  a: "All clients sign comprehensive NDAs and IP assignment agreements. Your code, designs, and ideas remain 100% yours. We never reuse client code or designs for other projects."
                },
                {
                  q: "Can I see progress during development?",
                  a: "Absolutely! You'll have full access to our client portal with real-time task tracking, weekly demo sessions, and direct communication with your project manager and development team."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
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
                Ready to Start Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
                  Project?
                </span>
              </h2>

              <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
                Let's discuss your vision and create a customized project plan tailored to your specific needs and goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/contact"
                  className="px-12 py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-xl rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-2xl hover:shadow-3xl"
                >
                  <span>Schedule Free Consultation</span>
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform text-2xl" />
                </Link>
                <Link
                  href="/services"
                  className="px-12 py-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm font-bold text-xl rounded-xl transition-all duration-300 border-2 border-white/30 hover:border-white/50"
                >
                  Explore Services
                </Link>
              </div>

              <p className="mt-8 text-gray-300 text-sm">
                No commitment required • Free initial consultation • 24/7 support included
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}