'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    FiArrowLeft,
    FiCalendar,
    FiUser,
    FiFileText,
    FiDownload,
    FiShare2,
    FiEye,
    FiBook,
    FiChevronRight,
    FiTrendingUp,
    FiCheckCircle,
    FiStar,
    FiTag
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getWhitepaper, getRelatedResources, getWhitepapers, getTypeSpecificFields } from '../../../lib/resources-utils';

export default function WhitepaperPage() {
    const params = useParams();
    const [whitepaper, setWhitepaper] = useState(null);
    const [relatedPapers, setRelatedPapers] = useState([]);
    const [isDownloading, setIsDownloading] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWhitepaper = async () => {
            try {
                if (params?.id) {
                    const paperData = getWhitepaper(params.id);

                    if (paperData) {
                        setWhitepaper(paperData);

                        // Get related whitepapers
                        try {
                            const related = getRelatedResources(paperData, 3);
                            setRelatedPapers(related);
                        } catch (error) {
                            console.error('Error getting related papers:', error);
                            const allPapers = getWhitepapers();
                            const otherPapers = allPapers.filter(p => p && p.id !== params.id);
                            setRelatedPapers(otherPapers.slice(0, 3));
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading whitepaper:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params?.id) {
            loadWhitepaper();
        }
    }, [params]);

    const handleDownload = () => {
        setIsDownloading(true);
        // Simulate download
        setTimeout(() => {
            setIsDownloading(false);
            alert('Download started! Check your downloads folder.');
        }, 1500);
    };

    // Get key findings from content
    const getKeyFindings = () => {
        if (!whitepaper?.content) return [
            'Industry adoption of new technologies is accelerating',
            'Organizations embracing innovation see significant competitive advantages',
            'Digital transformation drives operational efficiency improvements',
            'Cybersecurity remains a critical concern for all organizations'
        ];

        if (whitepaper.content.keyFindings) {
            return whitepaper.content.keyFindings;
        }

        if (whitepaper.content.executiveSummary) {
            return [
                'Comprehensive analysis of current industry trends',
                'Strategic recommendations for organizational success',
                'Data-driven insights and market projections'
            ];
        }

        return [
            'Industry adoption of new technologies is accelerating',
            'Organizations embracing innovation see significant competitive advantages'
        ];
    };

    const keyFindings = getKeyFindings();

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading whitepaper...</p>
                </div>
            </div>
        );
    }

    if (!whitepaper) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">📄</div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Whitepaper Not Found</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        The whitepaper you're looking for doesn't exist or has been moved.
                    </p>
                    <Link
                        href="/resources/whitepapers"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Back to Whitepapers
                    </Link>
                </div>
            </div>
        );
    }

    const fields = getTypeSpecificFields(whitepaper);
    const downloadCount = fields.downloadCount || '0';
    const isPremium = whitepaper.premium || false;
    const isFeatured = whitepaper.featured || false;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-8">
                <Link
                    href="/resources/whitepapers"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    Back to Whitepapers
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 text-white dark:text-gray-100">
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0" />

                <div className="container mx-auto px-4 py-16 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                                <FiFileText className="inline w-3 h-3 mr-1" />
                                Whitepaper
                            </span>
                            <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                                {fields.category}
                            </span>
                            {isPremium && (
                                <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-sm font-medium rounded-full">
                                    Premium
                                </span>
                            )}
                            {isFeatured && (
                                <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-full">
                                    Featured
                                </span>
                            )}
                            <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full flex items-center gap-1">
                                <FiEye className="w-3 h-3" />
                                {downloadCount} downloads
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
                                <FiBook className="w-5 h-5" />
                                <span>{fields.readTime || '15 min read'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiDownload className="w-5 h-5" />
                                <span>{downloadCount} downloads</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download CTA */}
            <section className="py-8 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl">
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    Download Full Whitepaper
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Get complete analysis, data, and strategic insights in PDF format.
                                    {isPremium ? ' Premium content includes additional case studies.' : ' Free download available.'}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isDownloading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Downloading...
                                        </>
                                    ) : (
                                        <>
                                            <FiDownload className="w-5 h-5" />
                                            {isPremium ? 'Download Premium' : 'Download Free'}
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                                    className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <FiShare2 className="w-5 h-5" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                            {/* Whitepaper Cover */}
                            <div className="relative bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl overflow-hidden mb-8">
                                <div className="aspect-[16/9] flex items-center justify-center p-8">
                                    <div className="text-center">
                                        <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center">
                                            <FiFileText className="w-16 h-16 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {fields.title}
                                        </h3>
                                        <p className="text-blue-200 max-w-md mx-auto">
                                            Comprehensive research and strategic analysis
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <article className="prose prose-lg dark:prose-invert max-w-none">
                                <h2>Executive Summary</h2>
                                <p>
                                    {whitepaper.content?.executiveSummary ||
                                        `This comprehensive whitepaper provides detailed insights into the latest trends,
                                        developments, and strategic implications in ${fields.category}. Based on extensive
                                        research and data analysis, we present findings that can help organizations
                                        make informed decisions and maintain competitive advantages.`}
                                </p>

                                <h2>Key Findings</h2>
                                <div className="grid md:grid-cols-2 gap-4 my-8">
                                    {keyFindings.map((finding, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                            <FiCheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 dark:text-gray-300">{finding}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border-l-4 border-blue-600 my-8">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                                        <FiTrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        Primary Insight
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        The adoption of new technologies is accelerating at an unprecedented rate, with
                                        organizations that embrace innovation seeing significant competitive advantages
                                        and improved operational efficiency.
                                    </p>
                                </div>

                                <h2>Market Analysis</h2>
                                <p>
                                    The current market landscape is characterized by rapid digital transformation across
                                    all sectors. Our analysis indicates that companies that fail to adapt to these changes
                                    risk falling behind their competitors and losing substantial market share.
                                </p>

                                <h2>Strategic Recommendations</h2>
                                <p>
                                    Based on our comprehensive analysis, we recommend the following strategic actions
                                    for organizations looking to stay competitive and drive sustainable growth:
                                </p>

                                <ol className="space-y-4 my-6">
                                    <li className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</span>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-gray-100">Invest in Digital Transformation</h4>
                                            <p className="text-gray-700 dark:text-gray-300 mt-1">Allocate resources for modernizing infrastructure and adopting new technologies</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</span>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-gray-100">Develop Cybersecurity Strategies</h4>
                                            <p className="text-gray-700 dark:text-gray-300 mt-1">Implement comprehensive security frameworks to protect against evolving threats</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</span>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-gray-100">Foster Innovation Culture</h4>
                                            <p className="text-gray-700 dark:text-gray-300 mt-1">Encourage collaboration, experimentation, and continuous learning</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</span>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-gray-100">Implement Sustainable Practices</h4>
                                            <p className="text-gray-700 dark:text-gray-300 mt-1">Adopt green technologies and sustainable operational practices</p>
                                        </div>
                                    </li>
                                </ol>

                                <h2>Conclusion</h2>
                                <p>
                                    The future presents both significant challenges and unprecedented opportunities.
                                    Organizations that proactively adapt to technological advancements, embrace innovation,
                                    and implement strategic changes will be best positioned for success in the coming years.
                                    This whitepaper serves as a roadmap for navigating the complex landscape and achieving
                                    sustainable growth.
                                </p>
                            </article>

                            {/* Tags */}
                            {whitepaper.tags && whitepaper.tags.length > 0 && (
                                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                        <FiTag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        Related Topics
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {whitepaper.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Quick Info */}
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Document Details
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                                        <FiDownload className="w-4 h-4" />
                                        Downloads
                                    </h4>
                                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        {downloadCount}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Author</h4>
                                    <p className="text-gray-900 dark:text-gray-100">{fields.author}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Published</h4>
                                    <p className="text-gray-900 dark:text-gray-100">{fields.date}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Category</h4>
                                    <p className="text-gray-900 dark:text-gray-100">{fields.category}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Read Time</h4>
                                    <p className="text-gray-900 dark:text-gray-100">{fields.readTime || '15 min'}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Format</h4>
                                    <p className="text-gray-900 dark:text-gray-100">PDF Document</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">File Size</h4>
                                    <p className="text-gray-900 dark:text-gray-100">~2.5 MB</p>
                                </div>
                            </div>
                        </div>

                        {/* Related Whitepapers */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Related Research
                            </h3>
                            <div className="space-y-4">
                                {relatedPapers.length > 0 ? (
                                    relatedPapers.map((paper) => {
                                        const relatedFields = getTypeSpecificFields(paper);
                                        return (
                                            <Link
                                                key={paper.id}
                                                href={`/resources/whitepapers/${paper.id}`}
                                                className="block group"
                                            >
                                                <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                                                    <div className="w-12 h-16 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-cyan-500">
                                                        <FiFileText className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                                            {relatedFields.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                            <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                                                                {relatedFields.category}
                                                            </span>
                                                            <span>•</span>
                                                            <span>{relatedFields.readTime || '15 min'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                        No related whitepapers found.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
                            <h3 className="text-xl font-bold mb-4">Custom Research</h3>
                            <p className="text-blue-100 mb-6">
                                Need tailored research for your organization? We can create custom whitepapers.
                            </p>
                            <Link
                                href="/contact"
                                className="block w-full text-center py-3 bg-white text-blue-600 hover:bg-gray-100 font-medium rounded-lg transition-colors"
                            >
                                Request Custom Research
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* More Whitepapers */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            More Whitepapers
                        </h2>
                        <Link
                            href="/resources/whitepapers"
                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
                        >
                            View all whitepapers
                            <FiChevronRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {getWhitepapers()
                            .filter(p => p && p.id !== whitepaper.id)
                            .slice(0, 3)
                            .map((paper) => {
                                const itemFields = getTypeSpecificFields(paper);
                                return (
                                    <Link
                                        key={paper.id}
                                        href={`/resources/whitepapers/${paper.id}`}
                                        className="group"
                                    >
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full flex flex-col">
                                            <div
                                                className="h-48 relative overflow-hidden"
                                                style={{
                                                    backgroundImage: `url(${paper.bgImage || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069'})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                                {paper.premium && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-semibold rounded">
                                                            Premium
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded">
                                                        {itemFields.category}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {itemFields.readTime || '15 min read'}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                                    {itemFields.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1 line-clamp-2">
                                                    {itemFields.description}
                                                </p>
                                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <FiDownload className="w-3 h-3" />
                                                        {itemFields.downloadCount || '0'}
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