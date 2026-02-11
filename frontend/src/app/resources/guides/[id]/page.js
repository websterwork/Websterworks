'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    FiArrowLeft,
    FiCalendar,
    FiUser,
    FiClock,
    FiTool,
    FiDownload,
    FiShare2,
    FiCheckCircle,
    FiBookOpen,
    FiChevronRight,
    FiCode,
    FiVideo,
    FiBook,
    FiTag,
    FiStar
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getGuide, getRelatedResources, getGuides, getTypeSpecificFields } from '../../../lib/resources-utils';

export default function GuidePage() {
    const params = useParams();
    const [guide, setGuide] = useState(null);
    const [relatedGuides, setRelatedGuides] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGuide = async () => {
            try {
                if (params?.id) {
                    const guideData = getGuide(params.id);

                    if (guideData) {
                        setGuide(guideData);

                        // Get related guides
                        try {
                            const related = getRelatedResources(guideData, 3);
                            setRelatedGuides(related);
                        } catch (error) {
                            console.error('Error getting related guides:', error);
                            const allGuides = getGuides();
                            const otherGuides = allGuides.filter(g => g && g.id !== params.id);
                            setRelatedGuides(otherGuides.slice(0, 3));
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading guide:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params?.id) {
            loadGuide();
        }
    }, [params]);

    // Get guide-specific content sections
    const getGuideContent = () => {
        if (!guide?.content) return [];

        if (guide.content.chapters) {
            return guide.content.chapters;
        }

        // Default chapters based on guide type
        return [
            'Introduction & Setup',
            'Core Concepts',
            'Implementation',
            'Testing & Debugging',
            'Best Practices',
            'Advanced Topics'
        ];
    };

    const contentSections = getGuideContent();

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading guide...</p>
                </div>
            </div>
        );
    }

    if (!guide) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">📚</div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Guide Not Found</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        The guide you're looking for doesn't exist or has been moved.
                    </p>
                    <Link
                        href="/resources/guides"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Back to Guides
                    </Link>
                </div>
            </div>
        );
    }

    const fields = getTypeSpecificFields(guide);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-8">
                <Link
                    href="/resources/guides"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    Back to Guides
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-orange-900 via-orange-800 to-yellow-900 dark:from-orange-950 dark:via-orange-900 dark:to-yellow-950 text-white dark:text-gray-100">
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0" />

                <div className="container mx-auto px-4 py-16 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-orange-600 text-white text-sm font-medium rounded-full">
                                <FiBook className="inline w-3 h-3 mr-1" />
                                Guide
                            </span>
                            <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                                {fields.category}
                            </span>
                            {guide.premium && (
                                <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-sm font-medium rounded-full">
                                    Premium
                                </span>
                            )}
                            {guide.featured && (
                                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full">
                                    <FiStar className="inline w-3 h-3 mr-1" />
                                    Featured
                                </span>
                            )}
                            <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full flex items-center gap-1">
                                <FiClock className="w-3 h-3" />
                                {fields.readTime || '10 min read'}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {fields.title}
                        </h1>

                        <p className="text-xl text-gray-200 dark:text-gray-300 mb-8 max-w-3xl">
                            {fields.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-gray-200 dark:text-gray-300">
                            <div className="flex items-center gap-2">
                                <FiUser className="w-5 h-5" />
                                <span className="font-medium">{fields.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCalendar className="w-5 h-5" />
                                <span>{fields.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiTool className="w-5 h-5" />
                                <span>{fields.category}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Progress Steps */}
            {contentSections.length > 0 && (
                <section className="py-8 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                                <FiBookOpen className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                Guide Chapters
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {contentSections.map((section, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentStep(index)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentStep === index
                                            ? 'bg-orange-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        Chapter {index + 1}: {section}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                            {contentSections.length > 0 ? (
                                <>
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                            {contentSections[currentStep]}
                                        </h2>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Chapter {currentStep + 1} of {contentSections.length}
                                        </div>
                                    </div>

                                    <article className="prose prose-lg dark:prose-invert max-w-none">
                                        {/* Dynamic content based on chapter */}
                                        {currentStep === 0 && (
                                            <>
                                                <h3>Introduction</h3>
                                                <p>
                                                    Welcome to this comprehensive guide on {fields.title}.
                                                    This tutorial is designed to take you through all the essential
                                                    concepts and practical implementations.
                                                </p>

                                                <h3>What You'll Learn</h3>
                                                <ul>
                                                    <li>Core concepts and fundamentals</li>
                                                    <li>Practical implementation steps</li>
                                                    <li>Best practices and optimization</li>
                                                    <li>Troubleshooting common issues</li>
                                                    <li>Real-world applications and examples</li>
                                                </ul>

                                                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border-l-4 border-orange-600 my-8">
                                                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                                                        Important Note
                                                    </h4>
                                                    <p className="text-gray-700 dark:text-gray-300">
                                                        Follow each chapter carefully and take your time to understand
                                                        the concepts. Don't hesitate to revisit previous sections if needed.
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        {/* Other chapters would have similar structured content */}
                                        {currentStep > 0 && (
                                            <>
                                                <h3>{contentSections[currentStep]}</h3>
                                                <p>
                                                    This section covers {contentSections[currentStep].toLowerCase()}.
                                                    Follow along to deepen your understanding and practical skills.
                                                </p>

                                                <h4>Key Concepts</h4>
                                                <ul>
                                                    <li>Fundamental principles and theory</li>
                                                    <li>Practical applications and examples</li>
                                                    <li>Common pitfalls to avoid</li>
                                                    <li>Best practices for implementation</li>
                                                </ul>

                                                {currentStep === 2 && (
                                                    <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border-l-4 border-orange-600 my-8">
                                                        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                                                            Pro Tip
                                                        </h4>
                                                        <p className="text-gray-700 dark:text-gray-300">
                                                            Practice what you learn by implementing the concepts
                                                            in a sample project. This reinforces understanding
                                                            and helps identify areas that need more attention.
                                                        </p>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                                            <div className="flex flex-wrap items-center justify-between gap-4">
                                                <button
                                                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                                                    disabled={currentStep === 0}
                                                    className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                                >
                                                    Previous Chapter
                                                </button>

                                                <div className="text-center">
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        Chapter {currentStep + 1} of {contentSections.length}
                                                    </span>
                                                </div>

                                                <button
                                                    onClick={() => setCurrentStep(prev => Math.min(contentSections.length - 1, prev + 1))}
                                                    disabled={currentStep === contentSections.length - 1}
                                                    className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                                >
                                                    {currentStep === contentSections.length - 1 ? 'Complete Guide' : 'Next Chapter'}
                                                    <FiChevronRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📚</div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                        Guide Content Coming Soon
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        The detailed content for this guide is being prepared.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Code Examples */}
                        <div className="mt-8 bg-gray-900 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <FiCode className="w-5 h-5" />
                                    Code Examples
                                </h3>
                                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg transition-colors">
                                    Copy All Code
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-gray-400 text-sm font-medium mb-2">Basic Implementation</h4>
                                    <pre className="bg-black/50 text-gray-300 p-4 rounded-lg overflow-x-auto">
                                        <code>
                                            {`// Example implementation for ${fields.title}
function initialize${fields.category.replace(/\s+/g, '')}Guide() {
  console.log('Starting ${fields.title}...');
  
  // Core configuration
  const config = {
    debug: process.env.NODE_ENV !== 'production',
    timeout: 5000
  };
  
  // Implementation logic
  const guide = new GuideImplementation(config);
  guide.setup();
  guide.execute();
  
  return guide;
}`}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        {guide.tags && guide.tags.length > 0 && (
                            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <FiTag className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                    Related Topics
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {guide.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg border border-gray-200 dark:border-gray-700"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Quick Resources */}
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                                <FiTool className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                Quick Resources
                            </h3>
                            <div className="space-y-4">
                                <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all">
                                    <div className="flex items-center gap-3">
                                        <FiDownload className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-gray-100">Download PDF</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Complete guide</p>
                                        </div>
                                    </div>
                                    <FiDownload className="w-4 h-4 text-gray-400" />
                                </button>

                                <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all">
                                    <div className="flex items-center gap-3">
                                        <FiShare2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-gray-100">Share Guide</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">With colleagues</p>
                                        </div>
                                    </div>
                                    <FiShare2 className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Related Guides */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Related Guides
                            </h3>
                            <div className="space-y-4">
                                {relatedGuides.length > 0 ? (
                                    relatedGuides.map((relatedGuide) => {
                                        const relatedFields = getTypeSpecificFields(relatedGuide);
                                        return (
                                            <Link
                                                key={relatedGuide.id}
                                                href={`/resources/guides/${relatedGuide.id}`}
                                                className="block group"
                                            >
                                                <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
                                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-orange-500 to-yellow-500">
                                                        <FiBook className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                                                            {relatedFields.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                            <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                                                                {relatedFields.category}
                                                            </span>
                                                            <span>•</span>
                                                            <span>{relatedFields.readTime || '10 min'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                        No related guides found.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Progress Checklist */}
                        {contentSections.length > 0 && (
                            <div className="bg-gradient-to-br from-orange-600 to-yellow-600 rounded-2xl p-6 text-white">
                                <h3 className="text-xl font-bold mb-4">Progress Checklist</h3>
                                <div className="space-y-3">
                                    {contentSections.map((section, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 bg-white/10 rounded-lg"
                                        >
                                            {currentStep >= index ? (
                                                <FiCheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                                            ) : (
                                                <div className="w-5 h-5 border-2 border-white/30 rounded-full flex-shrink-0" />
                                            )}
                                            <span className={currentStep >= index ? 'text-white' : 'text-orange-200'}>
                                                {section}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/20">
                                    <div className="flex items-center justify-between">
                                        <span className="text-orange-200">Progress:</span>
                                        <span className="font-bold">
                                            {Math.round(((currentStep + 1) / contentSections.length) * 100)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* More Guides */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            More Guides & Tutorials
                        </h2>
                        <Link
                            href="/resources/guides"
                            className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold hover:gap-3 transition-all"
                        >
                            View all guides
                            <FiChevronRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {getGuides()
                            .filter(g => g && g.id !== guide.id)
                            .slice(0, 3)
                            .map((guideItem) => {
                                const itemFields = getTypeSpecificFields(guideItem);
                                return (
                                    <Link
                                        key={guideItem.id}
                                        href={`/resources/guides/${guideItem.id}`}
                                        className="group"
                                    >
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full flex flex-col">
                                            <div
                                                className="h-48 relative overflow-hidden"
                                                style={{
                                                    backgroundImage: `url(${guideItem.bgImage || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074'})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                                {guideItem.premium && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-semibold rounded">
                                                            Premium
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-medium rounded">
                                                        {itemFields.category}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {itemFields.readTime || '10 min read'}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                                                    {itemFields.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1 line-clamp-2">
                                                    {itemFields.description}
                                                </p>
                                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <FiUser className="w-3 h-3" />
                                                        {itemFields.author?.split(' ')[0] || 'Author'}
                                                    </span>
                                                    <span>{itemFields.date || 'Recently'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>
                </div>
            </section>
        </div>
    );
}