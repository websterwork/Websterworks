'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiSearch, FiChevronLeft, FiTool, FiDownload, FiStar, FiCode, FiFilter, FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getTools, getTypeSpecificFields, getUniqueCategories } from '../../lib/resources-utils';

export default function ToolsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const tools = getTools();

    // Get categories from all tools
    const categories = useMemo(() => {
        const allCategories = getUniqueCategories();
        return ['all', ...allCategories.filter(cat =>
            tools.some(tool => tool.category === cat)
        )];
    }, [tools]);

    // Filter tools
    const filteredTools = useMemo(() => {
        let filtered = tools;

        // Filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(tool => {
                const fields = getTypeSpecificFields(tool);
                return (
                    tool.title?.toLowerCase().includes(query) ||
                    tool.description?.toLowerCase().includes(query) ||
                    tool.author?.toLowerCase().includes(query) ||
                    tool.category?.toLowerCase().includes(query) ||
                    (tool.tags && tool.tags.some(tag =>
                        tag.toLowerCase().includes(query)
                    ))
                );
            });
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(tool => tool.category === selectedCategory);
        }

        return filtered;
    }, [tools, searchQuery, selectedCategory]);

    // Get popular tools (premium and featured first, then by downloads)
    const popularTools = useMemo(() => {
        return [...tools]
            .sort((a, b) => {
                // Premium first
                if (a.premium && !b.premium) return -1;
                if (!a.premium && b.premium) return 1;

                // Featured next
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;

                // Then by downloads
                const aDownloads = parseInt(a.downloadCount?.replace(/[^0-9]/g, '') || 0);
                const bDownloads = parseInt(b.downloadCount?.replace(/[^0-9]/g, '') || 0);
                return bDownloads - aDownloads;
            })
            .slice(0, 5);
    }, [tools]);

    // Get tool stats
    const stats = useMemo(() => {
        const filtered = filteredTools;
        const totalDownloads = filtered.reduce((sum, tool) => {
            const downloads = parseInt(tool.downloadCount?.replace(/[^0-9]/g, '') || 0);
            return sum + downloads;
        }, 0);

        return {
            total: filtered.length,
            premium: filtered.filter(t => t.premium).length,
            featured: filtered.filter(t => t.featured).length,
            categories: new Set(filtered.map(t => t.category)).size,
            totalDownloads: totalDownloads.toLocaleString()
        };
    }, [filteredTools]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 dark:from-teal-950 dark:via-cyan-950 dark:to-blue-950 text-white dark:text-gray-100">
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
                                className="inline-flex items-center gap-2 text-cyan-200 hover:text-white mb-6 transition-colors"
                            >
                                <FiChevronLeft className="w-4 h-4" />
                                Back to Resources
                            </Link>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 dark:from-cyan-400 dark:to-teal-400">Tools</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-8">
                                Free and premium tools, templates, and resources to boost your productivity and development workflow.
                            </p>

                            <div className="max-w-2xl">
                                <div className="relative">
                                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search tools..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                        <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                                {stats.total}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Tools
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                {stats.premium}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Premium Tools
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                                {stats.featured}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Featured
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-2">
                                {stats.totalDownloads}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Downloads
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-6 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <FiFilter className="w-5 h-5" />
                            <span className="font-medium">Filter by Category:</span>
                        </div>

                        <div className="flex items-center overflow-x-auto scrollbar-hide">
                            <div className="flex space-x-2 py-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                            ? 'bg-cyan-600 text-white'
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
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {selectedCategory === 'all' ? 'All Tools' : `${selectedCategory} Tools`}
                                    <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                        ({filteredTools.length})
                                    </span>
                                </h2>
                            </div>

                            {filteredTools.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-8">
                                    {filteredTools.map((tool, index) => {
                                        const fields = getTypeSpecificFields(tool);

                                        return (
                                            <motion.div
                                                key={tool.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                className="group"
                                            >
                                                <Link href={`/resources/tools/${tool.id}`}>
                                                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full flex flex-col">
                                                        {/* Tool Image */}
                                                        <div
                                                            className="h-48 relative overflow-hidden"
                                                            style={{
                                                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${tool.bgImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'})`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center'
                                                            }}
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                                            {/* Premium Badge */}
                                                            {tool.premium && (
                                                                <div className="absolute top-4 left-4 z-10">
                                                                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-semibold rounded-full">
                                                                        Premium
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {/* Featured Badge */}
                                                            {tool.featured && (
                                                                <div className="absolute top-4 right-4 z-10">
                                                                    <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-semibold rounded-full">
                                                                        Featured
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {/* Tool Type Badge */}
                                                            <div className="absolute bottom-4 left-4 z-10">
                                                                <div className="flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                                                    <FiTool className="w-3 h-3" />
                                                                    <span>Tool</span>
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

                                                        {/* Tool Content */}
                                                        <div className="p-6 flex-1 flex flex-col">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-sm font-medium rounded-full">
                                                                    {fields.category}
                                                                </span>
                                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                    {fields.readTime || '5 min read'}
                                                                </span>
                                                            </div>

                                                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                                                                {fields.title}
                                                            </h3>

                                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                                                                {fields.description}
                                                            </p>

                                                            {/* Tags */}
                                                            {tool.tags && tool.tags.length > 0 && (
                                                                <div className="mb-4">
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {tool.tags.slice(0, 3).map((tag, idx) => (
                                                                            <span
                                                                                key={idx}
                                                                                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
                                                                            >
                                                                                {tag}
                                                                            </span>
                                                                        ))}
                                                                        {tool.tags.length > 3 && (
                                                                            <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                                                                                +{tool.tags.length - 3}
                                                                            </span>
                                                                        )}
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
                                                                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                                                                    <span className="text-sm">View Tool</span>
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
                                        No tools found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {searchQuery ? `No results for "${searchQuery}"` : 'No tools match your filters'}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedCategory('all');
                                        }}
                                        className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Popular Tools */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                                <FiStar className="w-5 h-5 text-yellow-500" />
                                Top Tools
                            </h3>
                            <div className="space-y-4">
                                {popularTools.map((tool, index) => {
                                    const fields = getTypeSpecificFields(tool);
                                    return (
                                        <Link
                                            key={tool.id}
                                            href={`/resources/tools/${tool.id}`}
                                            className="block group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-2xl font-bold text-gray-300 dark:text-gray-700">
                                                    {index + 1}
                                                </span>
                                                <div className="flex-grow">
                                                    <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                                                        {fields.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                        <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                                                            {fields.category}
                                                        </span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1">
                                                            <FiDownload className="w-3 h-3" />
                                                            {fields.downloadCount || '0'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Categories
                            </h3>
                            <div className="space-y-2">
                                {categories.slice(1).map((category) => {
                                    const count = tools.filter(t => t.category === category).length;
                                    return (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`flex items-center justify-between w-full p-3 rounded-lg text-left transition-colors ${selectedCategory === category
                                                ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            <span>{category}</span>
                                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-cyan-600 to-teal-600 rounded-2xl p-6 text-white">
                            <h3 className="text-xl font-bold mb-4">Need a Custom Tool?</h3>
                            <p className="text-cyan-100 mb-6">
                                We can develop custom tools tailored to your specific needs.
                            </p>
                            <Link
                                href="/contact"
                                className="block w-full text-center py-3 bg-white text-cyan-600 hover:bg-gray-100 font-medium rounded-lg transition-colors"
                            >
                                Request a Tool
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}