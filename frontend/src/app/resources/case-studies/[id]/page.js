'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  FiArrowLeft,
  FiCalendar,
  FiUser,
  FiTrendingUp,
  FiTarget,
  FiCheckCircle,
  FiDownload,
  FiShare2,
  FiFileText,
  FiChevronRight,
  FiUsers,
  FiClock,
  FiDollarSign,
  FiBriefcase,
  FiBarChart
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getResource, getRelatedResources, getCaseStudies, getTypeSpecificFields, formatCaseStudyMetrics } from '../../../lib/resources-utils';

export default function CaseStudyPage() {
  const params = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [relatedStudies, setRelatedStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCaseStudy = async () => {
      try {
        if (params?.id) {
          const study = getResource(params.id);

          if (study && study.type === 'case-study') {
            setCaseStudy(study);

            // Get related case studies
            try {
              const related = getRelatedResources(study, 2);
              setRelatedStudies(related);
            } catch (error) {
              console.error('Error getting related studies:', error);
              // Fallback: get other case studies excluding current one
              const allStudies = getCaseStudies();
              const otherStudies = allStudies.filter(s => s && s.id !== params.id);
              setRelatedStudies(otherStudies.slice(0, 2));
            }
          } else {
            console.error('Resource found but not a case study:', study?.type);
          }
        }
      } catch (error) {
        console.error('Error loading case study:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      loadCaseStudy();
    }
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Case Study Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The case study you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/resources/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  // Get type-specific fields
  const fields = getTypeSpecificFields(caseStudy);
  const formattedMetrics = formatCaseStudyMetrics(fields.metrics);

  // Get resource image
  const getResourceImage = (resource) => {
    return resource.bgImage || resource.image || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069';
  };

  // Format content for display
  const renderContent = () => {
    const content = caseStudy.content || {};

    return (
      <>
        {/* Challenge Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <span className="text-red-600 dark:text-red-400 font-bold">1</span>
            </div>
            The Challenge
          </h2>
          <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border-l-4 border-red-600">
            <p className="text-gray-700 dark:text-gray-300">
              {content.challenge ||
                `${fields.client} faced significant challenges in their ${fields.industry?.toLowerCase() || fields.category?.toLowerCase()} operations, 
                including inefficiencies in their existing processes, rising operational costs, and difficulty 
                scaling their services to meet growing customer demand.`}
            </p>
          </div>
        </section>

        {/* Solution Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
            </div>
            Our Solution
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border-l-4 border-blue-600">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {content.solution ||
                `We developed a comprehensive ${fields.industry?.toLowerCase() || 'technology'} solution that addressed all 
                the key challenges. Our approach combined innovative technology with proven methodologies to 
                deliver measurable results.`}
            </p>

            {content.solution && typeof content.solution === 'string' && content.solution.length > 200 ? (
              <div className="mt-4 space-y-3">
                {content.solution.split('. ').map((sentence, idx) => (
                  sentence.trim() && (
                    <div key={idx} className="flex items-start gap-2">
                      <FiCheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                      <span>{sentence.trim()}.</span>
                    </div>
                  )
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* Implementation Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
            </div>
            Implementation
          </h2>
          <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl border-l-4 border-purple-600">
            <p className="text-gray-700 dark:text-gray-300">
              The implementation was carried out in carefully planned phases over {fields.timeline}.
              Each phase included thorough testing, stakeholder feedback sessions, and performance
              validation to ensure the solution met all requirements and delivered the expected results.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{fields.teamSize}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Team Size</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{fields.budget}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Budget</div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 font-bold">4</span>
            </div>
            Results & Impact
          </h2>
          <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border-l-4 border-green-600">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {content.results ||
                `The implementation resulted in significant improvements across multiple metrics. 
                ${fields.client} experienced enhanced efficiency, reduced costs, and improved customer 
                satisfaction, positioning them for sustainable growth in their market.`}
            </p>

            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Key Achievements:</h3>
            <div className="space-y-3">
              {formattedMetrics.map((metric, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiTrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-gray-100 text-lg">{metric.value}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">{metric.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/resources/case-studies"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          Back to Case Studies
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getResourceImage(caseStudy)})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-white">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                Case Study
              </span>
              <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                {fields.industry || fields.category}
              </span>
              {caseStudy.premium && (
                <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
                  Premium
                </span>
              )}
              {caseStudy.featured && (
                <span className="px-3 py-1 bg-purple-600 text-white text-sm font-medium rounded-full">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {fields.title}
            </h1>

            <p className="text-xl text-gray-200 mb-8 max-w-3xl">
              {fields.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-gray-200">
              <div className="flex items-center gap-2">
                <FiCalendar className="w-5 h-5" />
                <span>{fields.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiUser className="w-5 h-5" />
                <span>{fields.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="w-5 h-5" />
                <span>{fields.timeline}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="w-5 h-5" />
                <span>{fields.teamSize}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Key Results & Metrics
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {formattedMetrics.slice(0, 3).map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiTrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{metric.value}</div>
                  <p className="text-gray-700 dark:text-gray-300">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <div className="text-gray-700 dark:text-gray-300">
                {renderContent()}
              </div>
            </article>

            {/* Download Section */}
            <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Download Full Case Study
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Get the complete PDF version with detailed analysis and technical specifications.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                    <FiDownload className="w-5 h-5" />
                    Download PDF
                  </button>
                  <button className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors flex items-center gap-2">
                    <FiShare2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Project Details */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Project Details
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                    <FiBriefcase className="w-4 h-4" />
                    Client
                  </h4>
                  <p className="text-gray-900 dark:text-gray-100">{fields.client}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                    <FiTarget className="w-4 h-4" />
                    Industry
                  </h4>
                  <p className="text-gray-900 dark:text-gray-100">{fields.industry || fields.category}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                    <FiClock className="w-4 h-4" />
                    Duration
                  </h4>
                  <p className="text-gray-900 dark:text-gray-100">{fields.timeline}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                    <FiUsers className="w-4 h-4" />
                    Team Size
                  </h4>
                  <p className="text-gray-900 dark:text-gray-100">{fields.teamSize}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                    <FiDollarSign className="w-4 h-4" />
                    Budget
                  </h4>
                  <p className="text-gray-900 dark:text-gray-100">{fields.budget}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['React', 'Next.js', 'Node.js', 'AWS', 'MongoDB', 'Docker'].map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Case Studies */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Related Studies
              </h3>
              <div className="space-y-4">
                {relatedStudies.length > 0 ? (
                  relatedStudies.map((study) => {
                    const relatedFields = getTypeSpecificFields(study);
                    return (
                      <Link
                        key={study.id}
                        href={`/resources/case-studies/${study.id}`}
                        className="block group"
                      >
                        <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-green-300 dark:hover:border-green-700 transition-colors">
                          <div
                            className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                            style={{
                              backgroundImage: `url(${getResourceImage(study)})`
                            }}
                          />
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                              {relatedFields.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              {relatedFields.industry || relatedFields.category}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>{relatedFields.timeline}</span>
                              <span>•</span>
                              <span>{relatedFields.teamSize}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No related case studies found.
                  </p>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Need a Similar Solution?</h3>
              <p className="text-green-100 mb-6">
                Our team can help you achieve similar results for your business.
              </p>
              <Link
                href="/contact"
                className="block w-full text-center py-3 bg-white text-green-600 hover:bg-gray-100 font-medium rounded-lg transition-colors mb-3"
              >
                Get a Consultation
              </Link>
              <Link
                href="/services"
                className="block w-full text-center py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium rounded-lg transition-colors"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      {fields.testimonial && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xl font-bold">
                    {fields.client?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {fields.client || 'Client'} Feedback
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {fields.clientPosition || 'Client Representative'}
                    </p>
                  </div>
                </div>
                <blockquote className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100 italic mb-6">
                  "{fields.testimonial}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Success Metrics Achieved</div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formattedMetrics.length}+
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Next Steps Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar success for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FiTarget className="w-5 h-5" />
                Start a Project
              </Link>
              <Link
                href="/resources/case-studies"
                className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FiFileText className="w-5 h-5" />
                View More Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}