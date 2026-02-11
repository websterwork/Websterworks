'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiSearch, FiFilter, FiChevronLeft, FiBook, FiFileText, FiTool, FiVideo, FiDownload, FiCalendar, FiUser, FiStar, FiMessageCircle, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getFeaturedResources, getAllResources, getTypeSpecificFields, typeDisplayNames, formatCaseStudyMetrics, getUniqueCategories } from '../../lib/resources-utils';

export default function FeaturedResourcesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const featuredResources = getFeaturedResources();

    // Get categories from all resources (not just featured)
    const categories = useMemo(() => {
        const allCategories = getUniqueCategories();
        return ['all', ...allCategories];
    }, []);

    // Filter resources
    const filteredResources = useMemo(() => {
        let filtered = featuredResources;

        // Filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(resource => {
                const fields = getTypeSpecificFields(resource);
                return (
                    resource.title?.toLowerCase().includes(query) ||
                    resource.description?.toLowerCase().includes(query) ||
                    resource.author?.toLowerCase().includes(query) ||
                    resource.category?.toLowerCase().includes(query) ||
                    (resource.tags && resource.tags.some(tag =>
                        tag.toLowerCase().includes(query)
                    ))
                );
            });
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(resource =>
                resource.category === selectedCategory
            );
        }

        return filtered;
    }, [featuredResources, searchQuery, selectedCategory]);

    // Get the correct link based on resource type
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

    // Get resource icon based on type (using imported icons)
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
                return <FiStar className="w-5 h-5 text-yellow-500" />;
        }
    };

    // Get resource display name
    const getResourceTypeName = (type) => {
        return typeDisplayNames[type] || type;
    };

    // Get resource stats
    const stats = useMemo(() => {
        const allResources = getAllResources();
        const featured = featuredResources;

        const typeCounts = featured.reduce((acc, resource) => {
            acc[resource.type] = (acc[resource.type] || 0) + 1;
            return acc;
        }, {});

        return {
            totalFeatured: featured.length,
            premiumCount: featured.filter(r => r.premium).length,
            typeCount: Object.keys(typeCounts).length,
            categoryCount: new Set(featured.map(r => r.category)).size,
            downloadCount: featured.reduce((sum, r) => {
                if (r.downloadCount) {
                    const num = parseInt(r.downloadCount.replace(/[^0-9]/g, ''));
                    return sum + (isNaN(num) ? 0 : num);
                }
                return sum;
            }, 0)
        };
    }, [featuredResources]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900 dark:from-yellow-950 dark:via-amber-950 dark:to-orange-950 text-white dark:text-gray-100">
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
                                className="inline-flex items-center gap-2 text-yellow-200 hover:text-white mb-6 transition-colors"
                            >
                                <FiChevronLeft className="w-4 h-4" />
                                Back to Resources
                            </Link>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                                    <FiStar className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 dark:from-yellow-400 dark:to-orange-400">Resources</span>
                                    </h1>
                                    <p className="text-lg text-yellow-200 mt-2">
                                        Handpicked content from our experts
                                    </p>
                                </div>
                            </div>

                            <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-8">
                                Discover our most popular and highly recommended resources, carefully selected by our team of experts.
                            </p>

                            <div className="max-w-2xl">
                                <div className="relative">
                                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search featured resources..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Filter */}
            <section className="py-6 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <FiFilter className="w-5 h-5" />
                            <span className="font-medium">Filter by:</span>
                        </div>

                        <div className="flex items-center overflow-x-auto scrollbar-hide">
                            <div className="flex space-x-2 py-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                            ? 'bg-yellow-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {category === 'all' ? 'All Categories' : category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-6">
                        <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                            {stats.totalFeatured}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Total Featured
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                            {stats.premiumCount}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Premium Resources
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                            {stats.typeCount}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Resource Types
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6">
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                            {stats.categoryCount}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Categories
                        </div>
                    </div>
                </div>

                {/* Featured Resources Grid */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {selectedCategory === 'all' ? 'All Featured Resources' : `Featured ${selectedCategory}`}
                            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                ({filteredResources.length})
                            </span>
                        </h2>
                    </div>

                    {filteredResources.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredResources.map((resource, index) => {
                                const fields = getTypeSpecificFields(resource);
                                const isCaseStudy = resource.type === 'case-study';
                                const metrics = isCaseStudy ? formatCaseStudyMetrics(fields.metrics) : [];

                                return (
                                    <motion.div
                                        key={resource.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group relative"
                                    >
                                        {/* Featured Badge */}
                                        <div className="absolute -top-3 -right-3 z-10">
                                            <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                                                Featured
                                            </div>
                                        </div>

                                        <Link href={getResourceLink(resource)}>
                                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full flex flex-col">
                                                {/* Resource Image */}
                                                <div
                                                    className="h-48 relative overflow-hidden"
                                                    style={{
                                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${resource.bgImage || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069'})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'
                                                    }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                                    {/* Premium Badge */}
                                                    {resource.premium && (
                                                        <div className="absolute top-4 left-4 z-10">
                                                            <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-semibold rounded-full">
                                                                Premium
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Type Badge */}
                                                    <div className="absolute bottom-4 left-4 z-10">
                                                        <div className="flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                                            {getResourceIcon(resource.type)}
                                                            <span className="capitalize">{getResourceTypeName(resource.type)}</span>
                                                        </div>
                                                    </div>

                                                    {/* Download Count */}
                                                    {fields.downloadCount && (
                                                        <div className="absolute bottom-4 right-4 z-10">
                                                            <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded flex items-center gap-1">
                                                                <FiDownload className="w-3 h-3" />
                                                                {fields.downloadCount}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Resource Content */}
                                                <div className="p-6 flex-1 flex flex-col">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-sm font-medium rounded-full">
                                                            {fields.category}
                                                        </span>
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                                            {fields.readTime || '10 min read'}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
                                                        {fields.title}
                                                    </h3>

                                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                                                        {fields.description}
                                                    </p>

                                                    {/* Case Study Metrics Preview */}
                                                    {isCaseStudy && metrics.length > 0 && (
                                                        <div className="mb-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                                            <div className="grid grid-cols-3 gap-2">
                                                                {metrics.slice(0, 3).map((metric, idx) => (
                                                                    <div key={idx} className="text-center">
                                                                        <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 line-clamp-1">
                                                                            {metric.value}
                                                                        </div>
                                                                        <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                                                                            {metric.label}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Meta Info */}
                                                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
                                                        <div className="flex items-center gap-3">
                                                            <span className="flex items-center gap-1">
                                                                <FiUser className="w-3 h-3" />
                                                                {fields.author?.split(' ')[0] || 'Author'}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <FiCalendar className="w-3 h-3" />
                                                                {fields.date || 'Date'}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                                                            <span className="text-sm">View</span>
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
                            <div className="text-6xl mb-4">⭐</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                No featured resources found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {searchQuery ? `No results for "${searchQuery}"` : 'No featured resources in this category'}
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }}
                                className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </section>

                {/* Resource Types Breakdown */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                        Featured by Resource Type
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.keys(typeDisplayNames).map((type) => {
                            const typeResources = featuredResources.filter(r => r.type === type);
                            if (typeResources.length === 0) return null;

                            const typeName = typeDisplayNames[type];
                            const pluralName = typeName.endsWith('y')
                                ? typeName.slice(0, -1) + 'ies'
                                : typeName + 's';

                            return (
                                <Link
                                    key={type}
                                    href={`/resources/${type === 'case-study' ? 'case-studies' : type + 's'}`}
                                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        {getResourceIcon(type)}
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                                            {pluralName}
                                        </h3>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                        {typeResources.length}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        Featured {typeName.toLowerCase()} resources
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400 group-hover:gap-3 transition-all">
                                        Browse all {typeName.toLowerCase()}s
                                        <FiArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="mt-16">
                    <div className="bg-gradient-to-br from-yellow-600 via-amber-600 to-orange-600 rounded-3xl p-8 md:p-12 text-white">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Want More Featured Content?
                            </h2>
                            <p className="text-xl text-yellow-100 mb-8">
                                Subscribe to our newsletter to get notified about new featured resources, exclusive content, and expert insights.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-grow px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-white"
                                />
                                <button className="px-8 py-3 bg-white text-yellow-600 font-semibold rounded-lg hover:bg-yellow-50 transition-colors whitespace-nowrap">
                                    Subscribe Now
                                </button>
                            </div>
                            <p className="text-sm text-yellow-200 mt-4">
                                Join 10,000+ professionals who receive our featured content
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}