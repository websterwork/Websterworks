'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiSearch, FiChevronLeft, FiCalendar, FiClock, FiVideo, FiUsers, FiTrendingUp, FiUser, FiArrowRight, FiBookmark } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getWebinars, getTypeSpecificFields, getUniqueCategories } from '../../lib/resources-utils';

export default function WebinarsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const webinars = getWebinars();

    // Get categories from all webinars
    const categories = useMemo(() => {
        const allCategories = getUniqueCategories();
        return ['all', ...allCategories.filter(cat =>
            webinars.some(webinar => webinar.category === cat)
        )];
    }, [webinars]);

    // Filter webinars
    const filteredWebinars = useMemo(() => {
        let filtered = webinars;

        // Filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(webinar => {
                const fields = getTypeSpecificFields(webinar);
                return (
                    webinar.title?.toLowerCase().includes(query) ||
                    webinar.description?.toLowerCase().includes(query) ||
                    webinar.author?.toLowerCase().includes(query) ||
                    webinar.category?.toLowerCase().includes(query) ||
                    (webinar.tags && webinar.tags.some(tag =>
                        tag.toLowerCase().includes(query)
                    ))
                );
            });
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(webinar => webinar.category === selectedCategory);
        }

        return filtered;
    }, [webinars, searchQuery, selectedCategory]);

    // Get upcoming webinars (by date comparison - simplified)
    const upcomingWebinars = useMemo(() => {
        return [...webinars]
            .filter(webinar => {
                // Check if date is in the future (simplified logic)
                const webinarDate = webinar.date || '';
                const hasTimeInfo = webinar.time && webinar.time !== 'TBD';
                return hasTimeInfo || webinarDate.includes('2024');
            })
            .slice(0, 5);
    }, [webinars]);

    // Get webinar stats
    const stats = useMemo(() => {
        const filtered = filteredWebinars;
        const totalRegistrations = filtered.reduce((sum, webinar) => {
            const registrations = parseInt(webinar.registrationCount?.replace(/[^0-9]/g, '') || 0);
            return sum + registrations;
        }, 0);

        return {
            total: filtered.length,
            upcoming: upcomingWebinars.length,
            featured: filtered.filter(w => w.featured).length,
            categories: new Set(filtered.map(w => w.category)).size,
            totalRegistrations: totalRegistrations.toLocaleString()
        };
    }, [filteredWebinars, upcomingWebinars]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-red-900 via-orange-900 to-amber-900 dark:from-red-950 dark:via-orange-950 dark:to-amber-950 text-white dark:text-gray-100">
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
                                className="inline-flex items-center gap-2 text-orange-200 hover:text-white mb-6 transition-colors"
                            >
                                <FiChevronLeft className="w-4 h-4" />
                                Back to Resources
                            </Link>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Webinars & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300 dark:from-orange-400 dark:to-yellow-400">Workshops</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-8">
                                Live and recorded sessions with industry experts on the latest technology trends and best practices.
                            </p>

                            <div className="max-w-2xl">
                                <div className="relative">
                                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search webinars..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                                {stats.total}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Webinars
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                                {stats.upcoming}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Upcoming
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                                {stats.featured}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Featured
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-red-50 dark:from-amber-900/20 dark:to-red-900/20 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                                {stats.totalRegistrations}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Registrations
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
                            <FiCalendar className="w-5 h-5" />
                            <span className="font-medium">Filter by Category:</span>
                        </div>

                        <div className="flex items-center overflow-x-auto scrollbar-hide">
                            <div className="flex space-x-2 py-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                            ? 'bg-orange-600 text-white'
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
                        {/* Upcoming Webinars */}
                        {upcomingWebinars.length > 0 && (
                            <section className="mb-16">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                        <FiCalendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                        Upcoming Webinars
                                    </h2>
                                    <div className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-medium rounded-full">
                                        {upcomingWebinars.length} upcoming
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {upcomingWebinars.map((webinar, index) => {
                                        const fields = getTypeSpecificFields(webinar);

                                        return (
                                            <motion.div
                                                key={webinar.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                className="group"
                                            >
                                                <Link href={`/resources/webinars/${webinar.id}`}>
                                                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl border border-orange-200 dark:border-orange-800 overflow-hidden hover:shadow-xl dark:hover:shadow-orange-800/30 transition-all duration-300">
                                                        <div className="p-6">
                                                            <div className="flex items-start gap-6">
                                                                {/* Date Badge */}
                                                                <div className="text-center flex-shrink-0">
                                                                    <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex flex-col items-center justify-center text-white">
                                                                        <div className="text-2xl font-bold">
                                                                            {webinar.date?.split(' ')[1] || '15'}
                                                                        </div>
                                                                        <div className="text-xs uppercase tracking-wide">
                                                                            {webinar.date?.split(' ')[0] || 'Mar'}
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-2 text-xs text-orange-600 dark:text-orange-400 font-medium">
                                                                        {fields.time || '2:00 PM EST'}
                                                                    </div>
                                                                </div>

                                                                {/* Webinar Content */}
                                                                <div className="flex-grow">
                                                                    <div className="flex items-center gap-3 mb-3">
                                                                        {webinar.featured && (
                                                                            <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold rounded">
                                                                                Featured
                                                                            </span>
                                                                        )}
                                                                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-medium rounded-full">
                                                                            {fields.category}
                                                                        </span>
                                                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                            {fields.readTime || '60 minutes'}
                                                                        </span>
                                                                    </div>

                                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                                                                        {fields.title}
                                                                    </h3>

                                                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                                                        {fields.description}
                                                                    </p>

                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                                                <FiUser className="w-4 h-4" />
                                                                                <span>{fields.author}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                                                <FiUsers className="w-4 h-4" />
                                                                                <span>{fields.registrationCount || '0'} registered</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                                                                            <span className="text-sm">Register Now</span>
                                                                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                                                        </div>
                                                                    </div>
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

                        {/* All Webinars */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {selectedCategory === 'all' ? 'All Webinars' : `${selectedCategory} Webinars`}
                                    <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                        ({filteredWebinars.length})
                                    </span>
                                </h2>
                            </div>

                            {filteredWebinars.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-8">
                                    {filteredWebinars.map((webinar, index) => {
                                        const fields = getTypeSpecificFields(webinar);

                                        return (
                                            <motion.div
                                                key={webinar.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                className="group"
                                            >
                                                <Link href={`/resources/webinars/${webinar.id}`}>
                                                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full flex flex-col">
                                                        {/* Webinar Image */}
                                                        <div
                                                            className="h-48 relative overflow-hidden"
                                                            style={{
                                                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${webinar.bgImage || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070'})`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center'
                                                            }}
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                                            {/* Featured Badge */}
                                                            {webinar.featured && (
                                                                <div className="absolute top-4 left-4 z-10">
                                                                    <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold rounded-full">
                                                                        Featured
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {/* Webinar Type Badge */}
                                                            <div className="absolute bottom-4 left-4 z-10">
                                                                <div className="flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                                                    <FiVideo className="w-3 h-3" />
                                                                    <span>Webinar</span>
                                                                </div>
                                                            </div>

                                                            {/* Registration Count */}
                                                            {fields.registrationCount && (
                                                                <div className="absolute bottom-4 right-4 z-10">
                                                                    <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded flex items-center gap-1">
                                                                        <FiUsers className="w-3 h-3" />
                                                                        {fields.registrationCount}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Webinar Content */}
                                                        <div className="p-6 flex-1 flex flex-col">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-medium rounded-full">
                                                                    {fields.category}
                                                                </span>
                                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                    {fields.readTime || '60 minutes'}
                                                                </span>
                                                            </div>

                                                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                                                                {fields.title}
                                                            </h3>

                                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                                                                {fields.description}
                                                            </p>

                                                            {/* Tags */}
                                                            {webinar.tags && webinar.tags.length > 0 && (
                                                                <div className="mb-4">
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {webinar.tags.slice(0, 3).map((tag, idx) => (
                                                                            <span
                                                                                key={idx}
                                                                                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
                                                                            >
                                                                                {tag}
                                                                            </span>
                                                                        ))}
                                                                        {webinar.tags.length > 3 && (
                                                                            <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                                                                                +{webinar.tags.length - 3}
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
                                                                        {fields.author?.split(' ')[0] || 'Speaker'}
                                                                    </span>
                                                                    <span className="flex items-center gap-1">
                                                                        <FiCalendar className="w-3 h-3" />
                                                                        {fields.time || fields.date || 'Date'}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
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
                                        No webinars found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {searchQuery ? `No results for "${searchQuery}"` : 'No webinars in this category'}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedCategory('all');
                                        }}
                                        className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Popular Webinars */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                                <FiTrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                Popular Webinars
                            </h3>
                            <div className="space-y-4">
                                {webinars.slice(0, 5).map((webinar, index) => {
                                    const fields = getTypeSpecificFields(webinar);
                                    return (
                                        <Link
                                            key={webinar.id}
                                            href={`/resources/webinars/${webinar.id}`}
                                            className="block group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-2xl font-bold text-gray-300 dark:text-gray-700">
                                                    {index + 1}
                                                </span>
                                                <div className="flex-grow">
                                                    <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                                                        {fields.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                        <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                                                            {fields.category}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{fields.registrationCount || '0'} attendees</span>
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
                                    const count = webinars.filter(w => w.category === category).length;
                                    return (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`flex items-center justify-between w-full p-3 rounded-lg text-left transition-colors ${selectedCategory === category
                                                ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
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
                        <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-6 text-white">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <FiCalendar className="w-5 h-5" />
                                Stay Updated
                            </h3>
                            <p className="text-orange-100 mb-6">
                                Get notified about upcoming webinars and exclusive events.
                            </p>
                            <button className="w-full px-4 py-3 bg-white text-orange-600 hover:bg-orange-50 font-medium rounded-lg transition-colors">
                                Subscribe to Webinar Alerts
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}