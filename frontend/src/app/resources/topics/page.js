'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiSearch, FiChevronLeft, FiTag, FiTrendingUp, FiFileText, FiVideo, FiTool, FiBook, FiMessageCircle, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getTrendingTopics, getAllResources, getTypeSpecificFields } from '../../lib/resources-utils';

export default function TopicsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    // Get trending topics (tags)
    const trendingTopics = getTrendingTopics();
    const allResources = getAllResources();

    // Extract all unique tags
    const allTags = useMemo(() => {
        const tags = allResources.flatMap(resource => resource.tags || []);
        const uniqueTags = [...new Set(tags)].sort();

        // Filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            return uniqueTags.filter(tag => tag.toLowerCase().includes(query));
        }

        return uniqueTags;
    }, [allResources, searchQuery]);

    // Get count of resources for each tag
    const tagCounts = useMemo(() => {
        const counts = {};
        allResources.forEach(resource => {
            resource.tags?.forEach(tag => {
                counts[tag] = (counts[tag] || 0) + 1;
            });
        });
        return counts;
    }, [allResources]);

    // Get resource type icon
    const getResourceIcon = (type) => {
        switch (type) {
            case 'whitepaper':
                return <FiFileText className="w-4 h-4 text-blue-500" />;
            case 'webinar':
                return <FiVideo className="w-4 h-4 text-orange-500" />;
            case 'tool':
                return <FiTool className="w-4 h-4 text-cyan-500" />;
            case 'guide':
                return <FiBook className="w-4 h-4 text-purple-500" />;
            case 'case-study':
                return <FiTrendingUp className="w-4 h-4 text-emerald-500" />;
            case 'blog':
                return <FiMessageCircle className="w-4 h-4 text-pink-500" />;
            default:
                return <FiFileText className="w-4 h-4 text-gray-500" />;
        }
    };

    // Get resource type distribution for a tag
    const getTagTypeDistribution = (tag) => {
        const resourcesWithTag = allResources.filter(resource =>
            resource.tags?.includes(tag)
        );

        const distribution = {};
        resourcesWithTag.forEach(resource => {
            distribution[resource.type] = (distribution[resource.type] || 0) + 1;
        });

        return Object.entries(distribution)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3); // Show top 3 types
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 text-white dark:text-gray-100">
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0" />

                <div className="container mx-auto px-4 py-24 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link
                                href="/resources"
                                className="inline-flex items-center gap-2 text-emerald-200 hover:text-white mb-6 transition-colors"
                            >
                                <FiChevronLeft className="w-4 h-4" />
                                Back to Resources
                            </Link>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Topics & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 dark:from-emerald-400 dark:to-cyan-400">Tags</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-8">
                                Explore resources by topics, technologies, and areas of interest. Find content that matters to you.
                            </p>

                            <div className="max-w-2xl">
                                <div className="relative">
                                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search topics..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 bg-white dark:bg-gray-950">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                                {allTags.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Topics
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                                {trendingTopics.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Trending Topics
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                                {allResources.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Resources
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                {Math.round(allResources.length / allTags.length) || 0}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Avg. Resources per Topic
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Topics */}
            {trendingTopics.length > 0 && (
                <section className="py-12 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                <FiTrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                Trending Topics
                            </h2>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Most discussed topics
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                            {trendingTopics.map((topic, index) => (
                                <motion.div
                                    key={topic.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Link
                                        href={`/resources/topics/${encodeURIComponent(topic.name)}`}
                                        className="block group"
                                    >
                                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center hover:shadow-lg dark:hover:shadow-gray-800/30 transition-all duration-300 border border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                                                <span className="text-xl font-bold text-white">
                                                    {index + 1}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                                                {topic.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {topic.count} resources
                                            </p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All Topics */}
            <section className="py-12 bg-white dark:bg-gray-950">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            All Topics
                            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                ({allTags.length})
                            </span>
                        </h2>
                    </div>

                    {allTags.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allTags.map((tag, index) => {
                                const resourceCount = tagCounts[tag] || 0;
                                const typeDistribution = getTagTypeDistribution(tag);

                                return (
                                    <motion.div
                                        key={tag}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="group"
                                    >
                                        <Link
                                            href={`/resources/topics/${encodeURIComponent(tag)}`}
                                            className="block"
                                        >
                                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center">
                                                            <FiTag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                                        </div>
                                                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                                                            {tag}
                                                        </h3>
                                                    </div>
                                                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                                        {resourceCount}
                                                    </div>
                                                </div>

                                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                                    Explore {resourceCount} resources about {tag.toLowerCase()}, including whitepapers, guides, tools, and more.
                                                </p>

                                                {typeDistribution.length > 0 && (
                                                    <div className="mb-4">
                                                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Resource Types:
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {typeDistribution.map(([type, count]) => (
                                                                <div
                                                                    key={type}
                                                                    className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                                                                >
                                                                    {getResourceIcon(type)}
                                                                    <span className="text-gray-600 dark:text-gray-400">
                                                                        {type === 'case-study' ? 'Case Study' : type}
                                                                    </span>
                                                                    <span className="text-gray-500 dark:text-gray-500">({count})</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span>{resourceCount} resources</span>
                                                        <span>•</span>
                                                        <span>{typeDistribution.length} types</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                                        <span className="text-sm">Explore</span>
                                                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                No topics found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {searchQuery ? `No topics match "${searchQuery}"` : 'No topics available'}
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-600">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Missing a Topic?
                        </h2>
                        <p className="text-xl text-emerald-100 mb-8">
                            Suggest topics you'd like us to cover in future resources and research.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg transition-colors"
                        >
                            Suggest a Topic
                            <FiArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}