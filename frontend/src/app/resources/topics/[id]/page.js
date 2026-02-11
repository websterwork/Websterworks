'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    FiArrowLeft,
    FiTag,
    FiTrendingUp,
    FiFileText,
    FiVideo,
    FiTool,
    FiBook,
    FiMessageCircle,
    FiCalendar,
    FiUser,
    FiDownload,
    FiUsers,
    FiArrowRight,
    FiShare2,
    FiSearch
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getAllResources, getTypeSpecificFields, getTrendingTopics } from '../../../lib/resources-utils';

export default function TopicPage() {
    const params = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');

    // Decode the topic/tag from URL
    const topic = decodeURIComponent(params?.id || '');

    // Get all resources and filter by topic
    const allResources = getAllResources();
    const resourcesWithTopic = useMemo(() => {
        return allResources.filter(resource =>
            resource.tags?.some(tag => tag.toLowerCase() === topic.toLowerCase())
        );
    }, [allResources, topic]);

    // Get trending topics
    const trendingTopics = getTrendingTopics();

    // Filter resources by type and search
    const filteredResources = useMemo(() => {
        let filtered = resourcesWithTopic;

        // Filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(resource => {
                const fields = getTypeSpecificFields(resource);
                return (
                    resource.title?.toLowerCase().includes(query) ||
                    fields.description?.toLowerCase().includes(query) ||
                    fields.author?.toLowerCase().includes(query) ||
                    fields.category?.toLowerCase().includes(query)
                );
            });
        }

        // Filter by type
        if (selectedType !== 'all') {
            filtered = filtered.filter(resource => resource.type === selectedType);
        }

        return filtered;
    }, [resourcesWithTopic, searchQuery, selectedType]);

    // Get resource type distribution
    const typeDistribution = useMemo(() => {
        const distribution = {};
        resourcesWithTopic.forEach(resource => {
            distribution[resource.type] = (distribution[resource.type] || 0) + 1;
        });

        return Object.entries(distribution)
            .sort((a, b) => b[1] - a[1])
            .map(([type, count]) => ({ type, count }));
    }, [resourcesWithTopic]);

    // Get unique types for filter
    const allTypes = useMemo(() => {
        const types = resourcesWithTopic.map(r => r.type);
        return ['all', ...new Set(types)].sort();
    }, [resourcesWithTopic]);

    // Get related topics (other tags that appear with this topic)
    const relatedTopics = useMemo(() => {
        const topicMap = {};
        resourcesWithTopic.forEach(resource => {
            resource.tags?.forEach(tag => {
                if (tag.toLowerCase() !== topic.toLowerCase()) {
                    topicMap[tag] = (topicMap[tag] || 0) + 1;
                }
            });
        });

        return Object.entries(topicMap)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8); // Top 8 related topics
    }, [resourcesWithTopic, topic]);

    // Get resource link
    const getResourceLink = (resource) => {
        switch (resource.type) {
            case 'whitepaper':
                return `/resources/whitepapers/${resource.id}`;
            case 'webinar':
                return `/resources/webinars/${resource.id}`;
            case 'tool':
                return `/resources/tools/${resource.id}`;
            case 'guide':
                return `/resources/guides/${resource.id}`;
            case 'case-study':
                return `/resources/case-studies/${resource.id}`;
            case 'blog':
                return `/resources/blog/${resource.id}`;
            default:
                return `/resources/${resource.id}`;
        }
    };

    // Get resource icon
    const getResourceIcon = (type) => {
        switch (type) {
            case 'whitepaper':
                return <FiFileText className="w-5 h-5 text-blue-500" />;
            case 'webinar':
                return <FiVideo className="w-5 h-5 text-orange-500" />;
            case 'tool':
                return <FiTool className="w-5 h-5 text-cyan-500" />;
            case 'guide':
                return <FiBook className="w-5 h-5 text-purple-500" />;
            case 'case-study':
                return <FiTrendingUp className="w-5 h-5 text-emerald-500" />;
            case 'blog':
                return <FiMessageCircle className="w-5 h-5 text-pink-500" />;
            default:
                return <FiFileText className="w-5 h-5 text-gray-500" />;
        }
    };

    // Get resource type name
    const getResourceTypeName = (type) => {
        switch (type) {
            case 'whitepaper': return 'Whitepaper';
            case 'webinar': return 'Webinar';
            case 'tool': return 'Tool';
            case 'guide': return 'Guide';
            case 'case-study': return 'Case Study';
            case 'blog': return 'Blog Post';
            default: return type;
        }
    };

    if (!topic) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🏷️</div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Topic Not Found</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        The topic you're looking for doesn't exist.
                    </p>
                    <Link
                        href="/resources/topics"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Back to Topics
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-8">
                <Link
                    href="/resources/topics"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    Back to Topics
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 text-white dark:text-gray-100">
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0" />

                <div className="container mx-auto px-4 py-16 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                <FiTag className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                                    {topic}
                                </h1>
                                <p className="text-lg text-emerald-200 mt-2">
                                    Explore {resourcesWithTopic.length} resources on this topic
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">
                                    {resourcesWithTopic.length}
                                </div>
                                <div className="text-emerald-200">Total Resources</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">
                                    {typeDistribution.length}
                                </div>
                                <div className="text-emerald-200">Resource Types</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">
                                    {Math.round(resourcesWithTopic.length / 3)}+
                                </div>
                                <div className="text-emerald-200">Avg. Reads per Resource</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search & Filters */}
            <section className="py-6 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-40">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder={`Search in ${topic} resources...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                                <FiTag className="w-4 h-4" />
                                <span className="text-sm font-medium">Filter by Type</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {allTypes.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedType === type
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {type === 'all' ? 'All Types' : getResourceTypeName(type)}
                                        {type !== 'all' && typeDistribution.find(t => t.type === type) && (
                                            <span className="ml-1 text-xs opacity-75">
                                                ({typeDistribution.find(t => t.type === type)?.count})
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Resource Type Distribution */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Resource Types
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {typeDistribution.map(({ type, count }) => (
                                    <div
                                        key={type}
                                        className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
                                        onClick={() => setSelectedType(type)}
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            {getResourceIcon(type)}
                                            <div>
                                                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                    {count}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {getResourceTypeName(type)}s
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Explore {count} {type.replace('-', ' ')} resources on {topic}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Resources Grid */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {selectedType === 'all' ? 'All Resources' : `${getResourceTypeName(selectedType)}s`}
                                    <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                        ({filteredResources.length})
                                    </span>
                                </h2>
                            </div>

                            {filteredResources.length > 0 ? (
                                <div className="space-y-6">
                                    {filteredResources.map((resource, index) => {
                                        const fields = getTypeSpecificFields(resource);

                                        return (
                                            <motion.div
                                                key={resource.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                className="group"
                                            >
                                                <Link href={getResourceLink(resource)}>
                                                    <div className="flex flex-col md:flex-row gap-6 p-6 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300">
                                                        {/* Resource Icon */}
                                                        <div className="md:w-20 md:h-20 w-full h-40 rounded-xl overflow-hidden flex-shrink-0">
                                                            <div
                                                                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                                                                style={{
                                                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${resource.bgImage})`,
                                                                    backgroundSize: 'cover',
                                                                    backgroundPosition: 'center'
                                                                }}
                                                            />
                                                        </div>

                                                        {/* Resource Content */}
                                                        <div className="flex-grow">
                                                            <div className="flex items-center gap-3 mb-3">
                                                                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium rounded-full">
                                                                    {getResourceIcon(resource.type)}
                                                                    <span>{getResourceTypeName(resource.type)}</span>
                                                                </div>
                                                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">
                                                                    {fields.category}
                                                                </span>
                                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                    {fields.readTime}
                                                                </span>
                                                            </div>

                                                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                                {fields.title}
                                                            </h3>

                                                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                                                {fields.description}
                                                            </p>

                                                            <div className="flex flex-wrap items-center justify-between gap-4">
                                                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                                    <div className="flex items-center gap-2">
                                                                        <FiUser className="w-3 h-3" />
                                                                        {fields.author?.split(' ')[0]}
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <FiCalendar className="w-3 h-3" />
                                                                        {fields.date}
                                                                    </div>
                                                                    {resource.type === 'whitepaper' || resource.type === 'tool' ? (
                                                                        <div className="flex items-center gap-2">
                                                                            <FiDownload className="w-3 h-3" />
                                                                            {fields.downloadCount || '0'}
                                                                        </div>
                                                                    ) : resource.type === 'webinar' ? (
                                                                        <div className="flex items-center gap-2">
                                                                            <FiUsers className="w-3 h-3" />
                                                                            {fields.registrationCount || '0'}
                                                                        </div>
                                                                    ) : null}
                                                                </div>

                                                                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                                                    <span className="text-sm">Read More</span>
                                                                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                                                </div>
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
                                        No resources found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {searchQuery
                                            ? `No resources match "${searchQuery}" in ${topic}`
                                            : `No ${selectedType !== 'all' ? getResourceTypeName(selectedType).toLowerCase() : ''} resources found for ${topic}`
                                        }
                                    </p>
                                    {(searchQuery || selectedType !== 'all') && (
                                        <button
                                            onClick={() => {
                                                setSearchQuery('');
                                                setSelectedType('all');
                                            }}
                                            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                                        >
                                            Clear Filters
                                        </button>
                                    )}
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Related Topics */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                                <FiTag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                Related Topics
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {relatedTopics.map((relatedTopic) => (
                                    <Link
                                        key={relatedTopic.name}
                                        href={`/resources/topics/${encodeURIComponent(relatedTopic.name)}`}
                                        className="group"
                                    >
                                        <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                                            <div className="flex items-center gap-2">
                                                <span>{relatedTopic.name}</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                                    ({relatedTopic.count})
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Trending Topics */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                                <FiTrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                Trending Topics
                            </h3>
                            <div className="space-y-4">
                                {trendingTopics.slice(0, 5).map((trendingTopic, index) => (
                                    <Link
                                        key={trendingTopic.name}
                                        href={`/resources/topics/${encodeURIComponent(trendingTopic.name)}`}
                                        className="group block"
                                    >
                                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                                        {trendingTopic.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {trendingTopic.count} resources
                                                    </div>
                                                </div>
                                            </div>
                                            <FiArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Download All */}
                        <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">
                                Download All Resources
                            </h3>
                            <p className="text-emerald-200 mb-6">
                                Get all {resourcesWithTopic.length} {topic} resources as a curated collection.
                            </p>
                            <button className="w-full py-3 bg-white hover:bg-gray-100 text-emerald-900 font-medium rounded-lg flex items-center justify-center gap-2 transition-colors">
                                <FiDownload className="w-5 h-5" />
                                Download Collection (.ZIP)
                            </button>
                        </div>

                        {/* Share Section */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                <FiShare2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                Share This Topic
                            </h3>
                            <div className="flex gap-2">
                                <button className="flex-1 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                                    Twitter
                                </button>
                                <button className="flex-1 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                    LinkedIn
                                </button>
                                <button className="flex-1 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 rounded-lg hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors">
                                    Email
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Topics */}
            <section className="border-t border-gray-200 dark:border-gray-800 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Explore More Topics
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        Discover more insights across various topics in our resources library.
                    </p>
                    <Link
                        href="/resources/topics"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                    >
                        <FiTag className="w-5 h-5" />
                        Browse All Topics
                    </Link>
                </div>
            </section>
        </div>
    );
}