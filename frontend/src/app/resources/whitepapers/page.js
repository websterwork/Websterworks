'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiSearch, FiChevronLeft, FiDownload, FiFileText, FiBook, FiCalendar, FiUser, FiTrendingUp, FiArrowRight, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getWhitepapers, getTypeSpecificFields, getUniqueCategories } from '../../lib/resources-utils';

export default function WhitepapersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const whitepapers = getWhitepapers();

    // Get categories from all whitepapers
    const categories = useMemo(() => {
        const allCategories = getUniqueCategories();
        return ['all', ...allCategories.filter(cat =>
            whitepapers.some(paper => paper.category === cat)
        )];
    }, [whitepapers]);

    // Filter whitepapers
    const filteredPapers = useMemo(() => {
        let filtered = whitepapers;

        // Filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(paper => {
                const fields = getTypeSpecificFields(paper);
                return (
                    paper.title?.toLowerCase().includes(query) ||
                    paper.description?.toLowerCase().includes(query) ||
                    paper.author?.toLowerCase().includes(query) ||
                    paper.category?.toLowerCase().includes(query) ||
                    (paper.tags && paper.tags.some(tag =>
                        tag.toLowerCase().includes(query)
                    ))
                );
            });
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(paper => paper.category === selectedCategory);
        }

        return filtered;
    }, [whitepapers, searchQuery, selectedCategory]);

    // Get popular whitepapers (premium and featured first, then by downloads)
    const popularPapers = useMemo(() => {
        return [...whitepapers]
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
    }, [whitepapers]);

    // Get whitepaper stats
    const stats = useMemo(() => {
        const filtered = filteredPapers;
        const totalDownloads = filtered.reduce((sum, paper) => {
            const downloads = parseInt(paper.downloadCount?.replace(/[^0-9]/g, '') || 0);
            return sum + downloads;
        }, 0);

        return {
            total: filtered.length,
            premium: filtered.filter(p => p.premium).length,
            featured: filtered.filter(p => p.featured).length,
            categories: new Set(filtered.map(p => p.category)).size,
            totalDownloads: totalDownloads.toLocaleString()
        };
    }, [filteredPapers]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 text-white dark:text-gray-100">
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
                                className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors"
                            >
                                <FiChevronLeft className="w-4 h-4" />
                                Back to Resources
                            </Link>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Whitepapers & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 dark:from-blue-400 dark:to-cyan-400">Reports</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-8">
                                In-depth research, analysis, and insights on technology trends and business strategies.
                            </p>

                            <div className="max-w-2xl">
                                <div className="relative">
                                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search whitepapers..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                {stats.total}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Whitepapers
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                {stats.premium}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Premium
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-violet-50 to-pink-50 dark:from-violet-900/20 dark:to-pink-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-2">
                                {stats.featured}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Featured
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
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
                            <FiFileText className="w-5 h-5" />
                            <span className="font-medium">Filter by Category:</span>
                        </div>

                        <div className="flex items-center overflow-x-auto scrollbar-hide">
                            <div className="flex space-x-2 py-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                            ? 'bg-blue-600 text-white'
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
                                    {selectedCategory === 'all' ? 'All Whitepapers' : `${selectedCategory} Whitepapers`}
                                    <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                        ({filteredPapers.length})
                                    </span>
                                </h2>
                            </div>

                            {filteredPapers.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-8">
                                    {filteredPapers.map((paper, index) => {
                                        const fields = getTypeSpecificFields(paper);

                                        return (
                                            <motion.div
                                                key={paper.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                className="group"
                                            >
                                                <Link href={`/resources/whitepapers/${paper.id}`}>
                                                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full flex flex-col">
                                                        {/* Whitepaper Image */}
                                                        <div
                                                            className="h-48 relative overflow-hidden"
                                                            style={{
                                                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${paper.bgImage || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069'})`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center'
                                                            }}
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                                            {/* Premium Badge */}
                                                            {paper.premium && (
                                                                <div className="absolute top-4 left-4 z-10">
                                                                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-semibold rounded-full">
                                                                        Premium
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {/* Featured Badge */}
                                                            {paper.featured && (
                                                                <div className="absolute top-4 right-4 z-10">
                                                                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full">
                                                                        Featured
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {/* Whitepaper Type Badge */}
                                                            <div className="absolute bottom-4 left-4 z-10">
                                                                <div className="flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                                                    <FiFileText className="w-3 h-3" />
                                                                    <span>Whitepaper</span>
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

                                                        {/* Whitepaper Content */}
                                                        <div className="p-6 flex-1 flex flex-col">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full">
                                                                    {fields.category}
                                                                </span>
                                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                    {fields.readTime || '15 min read'}
                                                                </span>
                                                            </div>

                                                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                                                {fields.title}
                                                            </h3>

                                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                                                                {fields.description}
                                                            </p>

                                                            {/* Key Findings Preview */}
                                                            {paper.content?.keyFindings && (
                                                                <div className="mb-4">
                                                                    <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                        <FiStar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                                        Key Findings:
                                                                    </div>
                                                                    <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                                                                        {paper.content.keyFindings.slice(0, 2).map((finding, idx) => (
                                                                            <li key={idx} className="flex items-start gap-2">
                                                                                <span className="text-blue-500 mt-1">•</span>
                                                                                <span className="line-clamp-1">{finding}</span>
                                                                            </li>
                                                                        ))}
                                                                        {paper.content.keyFindings.length > 2 && (
                                                                            <li className="text-gray-500 dark:text-gray-500 text-xs">
                                                                                +{paper.content.keyFindings.length - 2} more findings
                                                                            </li>
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {/* Tags */}
                                                            {paper.tags && paper.tags.length > 0 && (
                                                                <div className="mb-4">
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {paper.tags.slice(0, 3).map((tag, idx) => (
                                                                            <span
                                                                                key={idx}
                                                                                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
                                                                            >
                                                                                {tag}
                                                                            </span>
                                                                        ))}
                                                                        {paper.tags.length > 3 && (
                                                                            <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                                                                                +{paper.tags.length - 3}
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
                                                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                                                    <span className="text-sm">View Details</span>
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
                                        No whitepapers found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {searchQuery ? `No results for "${searchQuery}"` : 'No whitepapers in this category'}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedCategory('all');
                                        }}
                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Popular Whitepapers */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                                <FiTrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                Top Whitepapers
                            </h3>
                            <div className="space-y-4">
                                {popularPapers.map((paper, index) => {
                                    const fields = getTypeSpecificFields(paper);
                                    return (
                                        <Link
                                            key={paper.id}
                                            href={`/resources/whitepapers/${paper.id}`}
                                            className="block group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-2xl font-bold text-gray-300 dark:text-gray-700">
                                                    {index + 1}
                                                </span>
                                                <div className="flex-grow">
                                                    <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
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
                                    const count = whitepapers.filter(p => p.category === category).length;
                                    return (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`flex items-center justify-between w-full p-3 rounded-lg text-left transition-colors ${selectedCategory === category
                                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
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
                        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
                            <h3 className="text-xl font-bold mb-4">Research Partnerships</h3>
                            <p className="text-blue-100 mb-6">
                                Interested in collaborating on research or commissioning a custom whitepaper?
                            </p>
                            <Link
                                href="/contact"
                                className="block w-full text-center py-3 bg-white text-blue-600 hover:bg-gray-100 font-medium rounded-lg transition-colors"
                            >
                                Discuss Research
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}