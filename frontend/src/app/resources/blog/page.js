'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiSearch, FiCalendar, FiUser, FiTag, FiChevronLeft, FiTrendingUp, FiHeart, FiEye, FiShare2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getBlogPosts, getUniqueCategories, getTypeSpecificFields } from '../../lib/resources-utils';

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const blogPosts = getBlogPosts();

    // Extract unique categories from blog posts only
    const categories = useMemo(() => {
        const cats = blogPosts.map(post => post.category).filter(Boolean);
        return ['all', ...Array.from(new Set(cats))];
    }, [blogPosts]);

    // Filter blog posts
    const filteredPosts = useMemo(() => {
        let filtered = blogPosts;

        // Filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(post => {
                const fields = getTypeSpecificFields(post);
                return (
                    fields.title?.toLowerCase().includes(query) ||
                    fields.description?.toLowerCase().includes(query) ||
                    fields.author?.toLowerCase().includes(query) ||
                    fields.tags?.some(tag => tag.toLowerCase().includes(query))
                );
            });
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(post => post.category === selectedCategory);
        }

        return filtered;
    }, [blogPosts, searchQuery, selectedCategory]);

    // Get featured posts
    const featuredPosts = useMemo(() => {
        return blogPosts.filter(post => post.featured).slice(0, 3);
    }, [blogPosts]);

    // Get trending posts (by views - blog specific field)
    const trendingPosts = useMemo(() => {
        return [...blogPosts]
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 5);
    }, [blogPosts]);

    // Get resource image
    const getResourceImage = (resource) => {
        return resource.bgImage || resource.image || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069';
    };

    // Get resource link
    const getResourceLink = (resource) => {
        return `/resources/blog/${resource.id}`;
    };

    // Format views count
    const formatViews = (views) => {
        if (!views || views === 0) return '0';
        if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
        if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
        return views.toString();
    };

    // Format likes count
    const formatLikes = (likes) => {
        if (!likes || likes === 0) return '0';
        if (likes >= 1000) return `${(likes / 1000).toFixed(1)}k`;
        return likes.toString();
    };

    // Clear filters
    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950 text-white dark:text-gray-100">
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
                                className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors group"
                            >
                                <FiChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to Resources
                            </Link>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 dark:from-blue-400 dark:to-cyan-400">Blog</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-8">
                                Insights, tutorials, and thought leadership on web development, AI, cybersecurity, and emerging technologies.
                            </p>

                            <div className="max-w-2xl">
                                <div className="relative">
                                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search blog posts..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                    />
                                    {(searchQuery || selectedCategory !== 'all') && (
                                        <button
                                            onClick={clearFilters}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-300 hover:text-white transition-colors"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Filter */}
            <section className="py-6 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-40 backdrop-blur-sm bg-white/95 dark:bg-gray-950/95">
                <div className="container mx-auto px-4">
                    <div className="flex items-center overflow-x-auto scrollbar-hide">
                        <div className="flex space-x-2 py-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 hover:scale-105 ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {category === 'all' ? 'All Categories' : category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Featured Posts */}
                        {featuredPosts.length > 0 && (
                            <section className="mb-16">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        Featured Posts
                                    </h2>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></span>
                                        Popular Now
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {featuredPosts.map((post, index) => {
                                        const fields = getTypeSpecificFields(post);
                                        return (
                                            <motion.div
                                                key={post.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                className="group"
                                            >
                                                <Link href={getResourceLink(post)}>
                                                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full hover:-translate-y-1">
                                                        <div
                                                            className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                                            style={{ backgroundImage: `url(${getResourceImage(post)})` }}
                                                        />
                                                        <div className="p-6">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="px-2.5 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full border border-blue-100 dark:border-blue-800/30">
                                                                        {fields.category}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">{fields.readTime}</span>
                                                                </div>
                                                                {/* Blog-specific engagement metrics */}
                                                                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                                                    <div className="flex items-center gap-1">
                                                                        <FiHeart className="w-3 h-3" />
                                                                        {formatLikes(fields.likes)}
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <FiEye className="w-3 h-3" />
                                                                        {formatViews(fields.views)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                                                {fields.title}
                                                            </h3>
                                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                                                {fields.description}
                                                            </p>
                                                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                                                <div className="flex items-center gap-2">
                                                                    <FiUser className="w-3 h-3" />
                                                                    {fields.author ? fields.author.split(' ')[0] : 'Unknown'}
                                                                </div>
                                                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm">
                                                                    <span>Read more</span>
                                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* All Posts */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {selectedCategory === 'all' ? 'All Blog Posts' : `${selectedCategory} Posts`}
                                    <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                        ({filteredPosts.length})
                                    </span>
                                </h2>
                                {(searchQuery || selectedCategory !== 'all') && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            </div>

                            {filteredPosts.length > 0 ? (
                                <div className="space-y-8">
                                    {filteredPosts.map((post, index) => {
                                        const fields = getTypeSpecificFields(post);
                                        return (
                                            <motion.div
                                                key={post.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                                className="group"
                                            >
                                                <Link href={getResourceLink(post)}>
                                                    <div className="flex flex-col md:flex-row gap-6 p-6 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                                        {/* Post Image */}
                                                        <div className="md:w-48 md:h-48 w-full h-64 rounded-xl overflow-hidden flex-shrink-0">
                                                            <div
                                                                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                                                style={{ backgroundImage: `url(${getResourceImage(post)})` }}
                                                            />
                                                        </div>

                                                        {/* Post Content */}
                                                        <div className="flex-grow">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="px-2.5 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                                                                        {fields.category}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">{fields.readTime}</span>
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">{fields.date}</span>
                                                                </div>
                                                                {/* Blog-specific engagement metrics */}
                                                                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                                                    <div className="flex items-center gap-1">
                                                                        <FiHeart className="w-3 h-3" />
                                                                        {formatLikes(fields.likes)}
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <FiEye className="w-3 h-3" />
                                                                        {formatViews(fields.views)}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                                {fields.title}
                                                            </h3>

                                                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                                {fields.description}
                                                            </p>

                                                            <div className="flex flex-wrap items-center justify-between gap-4">
                                                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                                    <div className="flex items-center gap-2">
                                                                        <FiUser className="w-3 h-3" />
                                                                        {fields.author || 'Unknown Author'}
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center gap-2">
                                                                    {fields.tags?.slice(0, 3).map((tag, idx) => (
                                                                        <span
                                                                            key={idx}
                                                                            className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                                                        >
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                    {fields.tags && fields.tags.length > 3 && (
                                                                        <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                                                                            +{fields.tags.length - 3}
                                                                        </span>
                                                                    )}
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
                                        No blog posts found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {searchQuery ? `No results for "${searchQuery}"` : 'No posts in this category'}
                                    </p>
                                    <button
                                        onClick={clearFilters}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Trending Posts */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                                <FiTrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                Trending Now
                            </h3>
                            <div className="space-y-4">
                                {trendingPosts.map((post, index) => {
                                    const fields = getTypeSpecificFields(post);
                                    return (
                                        <Link
                                            key={post.id}
                                            href={getResourceLink(post)}
                                            className="block group"
                                        >
                                            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                                                <span className="text-2xl font-bold text-gray-300 dark:text-gray-700">
                                                    {index + 1}
                                                </span>
                                                <div className="flex-grow">
                                                    <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                                                        {fields.title}
                                                    </h4>
                                                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
                                                            {fields.category}
                                                        </span>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center gap-1">
                                                                <FiEye className="w-3 h-3" />
                                                                {formatViews(fields.views)}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <FiHeart className="w-3 h-3" />
                                                                {formatLikes(fields.likes)}
                                                            </div>
                                                        </div>
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
                                    const count = blogPosts.filter(p => p.category === category).length;
                                    const percentage = Math.round((count / blogPosts.length) * 100);

                                    return (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`flex items-center justify-between w-full p-3 rounded-lg text-left transition-all duration-300 hover:scale-[1.02] ${selectedCategory === category
                                                ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                                <span>{category}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                                        style={{ width: `${Math.min(percentage, 100)}%` }}
                                                    ></div>
                                                </div>
                                                <span className={`px-2.5 py-1 text-xs rounded-full ${selectedCategory === category
                                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                                    }`}>
                                                    {count}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Blog Stats */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Blog Stats
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                        {blogPosts.length}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Total Posts</div>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30">
                                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                                        {formatViews(blogPosts.reduce((sum, post) => sum + (post.views || 0), 0))}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Total Views</div>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl border border-pink-100 dark:border-pink-800/30">
                                    <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-1">
                                        {formatLikes(blogPosts.reduce((sum, post) => sum + (post.likes || 0), 0))}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Total Likes</div>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-100 dark:border-green-800/30">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                                        {categories.length - 1}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Categories</div>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl p-6 text-white">
                            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                            <h3 className="text-xl font-bold mb-4 relative z-10">Stay Updated</h3>
                            <p className="text-gray-200 mb-4 relative z-10">
                                Get the latest tech insights delivered to your inbox.
                            </p>
                            <div className="space-y-3 relative z-10">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                                />
                                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}