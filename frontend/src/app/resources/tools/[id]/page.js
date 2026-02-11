'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    FiArrowLeft,
    FiDownload,
    FiStar,
    FiUsers,
    FiClock,
    FiCode,
    FiShare2,
    FiTool,
    FiCheckCircle,
    FiExternalLink,
    FiChevronRight,
    FiCalendar,
    FiUser,
    FiTag,
    FiBook
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getTool, getRelatedResources, getTools, getTypeSpecificFields } from '../../../lib/resources-utils';

export default function ToolPage() {
    const params = useParams();
    const [tool, setTool] = useState(null);
    const [relatedTools, setRelatedTools] = useState([]);
    const [isDownloading, setIsDownloading] = useState(false);
    const [rating, setRating] = useState(4.5);
    const [userRating, setUserRating] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTool = async () => {
            try {
                if (params?.id) {
                    const toolData = getTool(params.id);

                    if (toolData) {
                        setTool(toolData);

                        // Get related tools
                        try {
                            const related = getRelatedResources(toolData, 3);
                            setRelatedTools(related);
                        } catch (error) {
                            console.error('Error getting related tools:', error);
                            const allTools = getTools();
                            const otherTools = allTools.filter(t => t && t.id !== params.id);
                            setRelatedTools(otherTools.slice(0, 3));
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading tool:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params?.id) {
            loadTool();
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

    // Get tool features from content
    const getToolFeatures = () => {
        if (!tool?.content) return [
            'Easy to use interface',
            'Fast processing',
            'Customizable settings',
            'Cross-platform support',
            'Regular updates',
            'Comprehensive documentation',
            'Active community support'
        ];

        if (tool.content.features) {
            return tool.content.features;
        }

        return [
            'Easy to use interface',
            'Fast processing',
            'Customizable settings',
            'Cross-platform support'
        ];
    };

    const features = getToolFeatures();

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading tool...</p>
                </div>
            </div>
        );
    }

    if (!tool) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🛠️</div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Tool Not Found</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        The tool you're looking for doesn't exist or has been moved.
                    </p>
                    <Link
                        href="/resources/tools"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Back to Tools
                    </Link>
                </div>
            </div>
        );
    }

    const fields = getTypeSpecificFields(tool);
    const downloadCount = fields.downloadCount || '0';
    const isPremium = tool.premium || false;
    const isFeatured = tool.featured || false;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-8">
                <Link
                    href="/resources/tools"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    Back to Tools
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 dark:from-indigo-950 dark:via-purple-950 dark:to-blue-950 text-white dark:text-gray-100">
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0" />

                <div className="container mx-auto px-4 py-16 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full">
                                <FiTool className="inline w-3 h-3 mr-1" />
                                Tool
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
                                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full">
                                    Featured
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {fields.title}
                        </h1>

                        <p className="text-xl text-gray-200 dark:text-gray-300 mb-8 max-w-3xl">
                            {fields.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-gray-200 dark:text-gray-300">
                            <div className="flex items-center gap-2">
                                <FiDownload className="w-5 h-5" />
                                <span className="font-medium">{downloadCount} downloads</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiUser className="w-5 h-5" />
                                <span>{fields.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCalendar className="w-5 h-5" />
                                <span>{fields.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiClock className="w-5 h-5" />
                                <span>{fields.readTime || '5 min read'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download CTA */}
            <section className="py-8 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl">
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    Download {fields.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Get started with this powerful tool today. {isPremium ? 'Premium version available!' : 'Completely free!'}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isDownloading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Downloading...
                                        </>
                                    ) : (
                                        <>
                                            <FiDownload className="w-5 h-5" />
                                            {isPremium ? 'Get Premium' : 'Download Free'}
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
                            {/* Tool Preview */}
                            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden mb-8">
                                <div className="aspect-video flex items-center justify-center p-8">
                                    <div className="text-center">
                                        <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                                            <FiTool className="w-16 h-16 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {fields.title} Preview
                                        </h3>
                                        <p className="text-gray-400 max-w-md mx-auto">
                                            Interactive tool interface with powerful features for developers
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <article className="prose prose-lg dark:prose-invert max-w-none">
                                <h2>Overview</h2>
                                <p>
                                    {fields.title} is a powerful tool designed to help developers and teams streamline their workflow.
                                    With its intuitive interface and robust features, it enhances productivity and simplifies
                                    complex tasks, making it an essential addition to any developer's toolkit.
                                </p>

                                <h2>Key Features</h2>
                                <div className="grid md:grid-cols-2 gap-4 my-8">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                            <FiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border-l-4 border-indigo-600 my-8">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                                        Why Choose {fields.title}?
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {fields.title} stands out with its combination of ease of use, powerful features,
                                        and excellent support. Whether you're a beginner or an experienced professional,
                                        this tool will help you achieve your goals efficiently. It's designed with
                                        developers in mind, focusing on productivity and workflow optimization.
                                    </p>
                                </div>

                                <h2>Usage Example</h2>
                                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                    <code>
                                        {`// Example usage of ${fields.title}
import { ${fields.title.split(' ').join('')} } from '${fields.title.toLowerCase().replace(/\s+/g, '-')}';

// Initialize the tool
const tool = new ${fields.title.split(' ').join('')}({
  mode: 'development',
  debug: true,
  output: 'console'
});

// Use the tool's features
tool.analyzeCode();
tool.generateReport();
tool.exportResults('results.json');

// Get insights
const insights = tool.getInsights();
console.log('Analysis complete:', insights);`}
                                    </code>
                                </pre>
                            </article>
                        </div>

                        {/* Tags Section */}
                        {tool.tags && tool.tags.length > 0 && (
                            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <FiTag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                    Related Topics
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {tool.tags.map((tag, index) => (
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

                        {/* Rating Section */}
                        <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                        Rate This Tool
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Share your experience with other users
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="flex items-center gap-1 mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setUserRating(star)}
                                                className="text-2xl hover:scale-110 transition-transform"
                                            >
                                                {star <= userRating ? (
                                                    <FiStar className="fill-current text-yellow-500 text-yellow-400" />
                                                ) : (
                                                    <FiStar className="text-gray-300 dark:text-gray-600 hover:text-yellow-400" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (userRating > 0) {
                                                alert(`Thank you for your ${userRating}-star rating!`);
                                                setUserRating(0);
                                            } else {
                                                alert('Please select a rating first');
                                            }
                                        }}
                                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                                    >
                                        Submit Rating
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Quick Info */}
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Tool Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                                        <FiDownload className="w-4 h-4" />
                                        Downloads
                                    </h4>
                                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
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
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Type</h4>
                                    <p className="text-gray-900 dark:text-gray-100">{tool.type}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Read Time</h4>
                                    <p className="text-gray-900 dark:text-gray-100">{fields.readTime || '5 min'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Related Tools */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Similar Tools
                            </h3>
                            <div className="space-y-4">
                                {relatedTools.length > 0 ? (
                                    relatedTools.map((relatedTool) => {
                                        const relatedFields = getTypeSpecificFields(relatedTool);
                                        return (
                                            <Link
                                                key={relatedTool.id}
                                                href={`/resources/tools/${relatedTool.id}`}
                                                className="block group"
                                            >
                                                <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-500">
                                                        <FiTool className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                                                            {relatedFields.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                            <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                                                                {relatedFields.category}
                                                            </span>
                                                            <span>•</span>
                                                            <span>{relatedFields.readTime || '5 min'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                        No similar tools found.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Documentation Links */}
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
                            <h3 className="text-xl font-bold mb-4">Resources</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="flex items-center gap-3">
                                        <FiDownload className="w-5 h-5" />
                                        <div>
                                            <h4 className="font-medium text-white">
                                                {isDownloading ? 'Downloading...' : 'Download Tool'}
                                            </h4>
                                            <p className="text-indigo-200 text-sm">
                                                {isPremium ? 'Premium version' : 'Free download'}
                                            </p>
                                        </div>
                                    </div>
                                    {!isDownloading && <FiDownload className="w-4 h-4 opacity-75" />}
                                </button>

                                <a
                                    href="#"
                                    className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <FiBook className="w-5 h-5" />
                                        <div>
                                            <h4 className="font-medium text-white">Documentation</h4>
                                            <p className="text-indigo-200 text-sm">Full user guide</p>
                                        </div>
                                    </div>
                                    <FiExternalLink className="w-4 h-4 opacity-75 group-hover:translate-x-1 transition-transform" />
                                </a>

                                <a
                                    href="#"
                                    className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <FiCode className="w-5 h-5" />
                                        <div>
                                            <h4 className="font-medium text-white">API Reference</h4>
                                            <p className="text-indigo-200 text-sm">Developer docs</p>
                                        </div>
                                    </div>
                                    <FiExternalLink className="w-4 h-4 opacity-75 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* More Tools */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            More Tools & Resources
                        </h2>
                        <Link
                            href="/resources/tools"
                            className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all"
                        >
                            View all tools
                            <FiChevronRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {getTools()
                            .filter(t => t && t.id !== tool.id)
                            .slice(0, 3)
                            .map((toolItem) => {
                                const itemFields = getTypeSpecificFields(toolItem);
                                return (
                                    <Link
                                        key={toolItem.id}
                                        href={`/resources/tools/${toolItem.id}`}
                                        className="group"
                                    >
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full flex flex-col">
                                            <div
                                                className="h-48 relative overflow-hidden"
                                                style={{
                                                    backgroundImage: `url(${toolItem.bgImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                                {toolItem.premium && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-semibold rounded">
                                                            Premium
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium rounded">
                                                        {itemFields.category}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {itemFields.readTime || '5 min read'}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
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