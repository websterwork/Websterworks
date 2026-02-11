'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiSearch, FiChevronLeft, FiTool, FiClock, FiBook, FiTrendingUp, FiDownload, FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getGuides, getTypeSpecificFields, getUniqueCategories } from '../../lib/resources-utils';

export default function GuidesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const guides = getGuides();

    // Get categories from all guides
    const categories = useMemo(() => {
        const allCategories = getUniqueCategories();
        return ['all', ...allCategories.filter(cat =>
            guides.some(guide => guide.category === cat)
        )];
    }, [guides]);

    // Filter guides
    const filteredGuides = useMemo(() => {
        let filtered = guides;

        // Filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(guide => {
                const fields = getTypeSpecificFields(guide);
                return (
                    guide.title?.toLowerCase().includes(query) ||
                    guide.description?.toLowerCase().includes(query) ||
                    guide.author?.toLowerCase().includes(query) ||
                    guide.category?.toLowerCase().includes(query) ||
                    (guide.tags && guide.tags.some(tag =>
                        tag.toLowerCase().includes(query)
                    ))
                );
            });
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(guide => guide.category === selectedCategory);
        }

        return filtered;
    }, [guides, searchQuery, selectedCategory]);

    // Get popular guides (premium and featured first)
    const popularGuides = useMemo(() => {
        return [...guides]
            .sort((a, b) => {
                // Premium first
                if (a.premium && !b.premium) return -1;
                if (!a.premium && b.premium) return 1;

                // Featured next
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;

                return 0;
            })
            .slice(0, 5);
    }, [guides]);

    // Get guide stats
    const stats = useMemo(() => {
        const filtered = filteredGuides;
        return {
            total: filtered.length,
            premium: filtered.filter(g => g.premium).length,
            featured: filtered.filter(g => g.featured).length,
            categories: new Set(filtered.map(g => g.category)).size,
            totalReadTime: filtered.reduce((total, guide) => {
                const time = guide.readTime || '0 min read';
                const minutes = parseInt(time) || 0;
                return total + minutes;
            }, 0)
        };
    }, [filteredGuides]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 text-white dark:text-gray-100">
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
                                className="inline-flex items-center gap-2 text-purple-200 hover:text-white mb-6 transition-colors"
                            >
                                <FiChevronLeft className="w-4 h-4" />
                                Back to Resources
                            </Link>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Guides & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-400 dark:to-pink-400">Tutorials</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-8">
                                Step-by-step tutorials and comprehensive guides to help you master new technologies and skills.
                            </p>

                            <div className="max-w-2xl">
                                <div className="relative">
                                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search guides..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                {stats.total}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Guides
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                                {stats.premium}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Premium Guides
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                {stats.featured}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Featured
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-2">
                                {stats.totalReadTime}+
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Read Time (min)
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
                            <FiTool className="w-5 h-5" />
                            <span className="font-medium">Filter by Category:</span>
                        </div>

                        <div className="flex items-center overflow-x-auto scrollbar-hide">
                            <div className="flex space-x-2 py-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                            ? 'bg-purple-600 text-white'
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
                                    {selectedCategory === 'all' ? 'All Guides' : `${selectedCategory} Guides`}
                                    <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                        ({filteredGuides.length})
                                    </span>
                                </h2>
                            </div>

                            {filteredGuides.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-8">
                                    {filteredGuides.map((guide, index) => {
                                        const fields = getTypeSpecificFields(guide);

                                        return (
                                            <motion.div
                                                key={guide.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                className="group"
                                            >
                                                <Link href={`/resources/guides/${guide.id}`}>
                                                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full flex flex-col">
                                                        {/* Guide Image */}
                                                        <div
                                                            className="h-48 relative overflow-hidden"
                                                            style={{
                                                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${guide.bgImage || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074'})`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center'
                                                            }}
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                                            {/* Premium Badge */}
                                                            {guide.premium && (
                                                                <div className="absolute top-4 left-4 z-10">
                                                                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-semibold rounded-full">
                                                                        Premium
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {/* Featured Badge */}
                                                            {guide.featured && (
                                                                <div className="absolute top-4 right-4 z-10">
                                                                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full">
                                                                        Featured
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {/* Guide Type Badge */}
                                                            <div className="absolute bottom-4 left-4 z-10">
                                                                <div className="flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                                                    <FiBook className="w-3 h-3" />
                                                                    <span>Guide</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Guide Content */}
                                                        <div className="p-6 flex-1 flex flex-col">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium rounded-full">
                                                                    {fields.category}
                                                                </span>
                                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                    {fields.readTime || '10 min read'}
                                                                </span>
                                                            </div>

                                                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                                                                {fields.title}
                                                            </h3>

                                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                                                                {fields.description}
                                                            </p>

                                                            {/* Tags */}
                                                            {guide.tags && guide.tags.length > 0 && (
                                                                <div className="mb-4">
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {guide.tags.slice(0, 3).map((tag, idx) => (
                                                                            <span
                                                                                key={idx}
                                                                                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
                                                                            >
                                                                                {tag}
                                                                            </span>
                                                                        ))}
                                                                        {guide.tags.length > 3 && (
                                                                            <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                                                                                +{guide.tags.length - 3}
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
                                                                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                                                                    <span className="text-sm">View Guide</span>
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
                                        No guides found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {searchQuery ? `No results for "${searchQuery}"` : 'No guides match your filters'}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedCategory('all');
                                        }}
                                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Popular Guides */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                                <FiTrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                Popular Guides
                            </h3>
                            <div className="space-y-4">
                                {popularGuides.map((guide, index) => {
                                    const fields = getTypeSpecificFields(guide);
                                    return (
                                        <Link
                                            key={guide.id}
                                            href={`/resources/guides/${guide.id}`}
                                            className="block group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-2xl font-bold text-gray-300 dark:text-gray-700">
                                                    {index + 1}
                                                </span>
                                                <div className="flex-grow">
                                                    <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                                                        {fields.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                        <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                                                            {fields.category}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{fields.readTime || '10 min'}</span>
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
                                    const count = guides.filter(g => g.category === category).length;
                                    return (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`flex items-center justify-between w-full p-3 rounded-lg text-left transition-colors ${selectedCategory === category
                                                ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
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
                        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
                            <h3 className="text-xl font-bold mb-4">Missing a Guide?</h3>
                            <p className="text-purple-100 mb-6">
                                Suggest topics you'd like us to cover in future guides.
                            </p>
                            <Link
                                href="/contact"
                                className="block w-full text-center py-3 bg-white text-purple-600 hover:bg-gray-100 font-medium rounded-lg transition-colors"
                            >
                                Suggest a Topic
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}