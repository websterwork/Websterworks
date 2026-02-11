'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiSearch, FiChevronLeft, FiTrendingUp, FiDollarSign, FiUsers, FiClock, FiBriefcase, FiTarget, FiShare2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getCaseStudies, getTypeSpecificFields, getUniqueIndustries } from '../../lib/resources-utils';

export default function CaseStudiesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('all');

    const caseStudies = getCaseStudies();
    const industries = getUniqueIndustries();

    // Add 'all' option to industries
    const allIndustries = ['all', ...industries];

    // Filter case studies
    const filteredStudies = useMemo(() => {
        let filtered = caseStudies;

        // Filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(study => {
                const fields = getTypeSpecificFields(study);
                return (
                    fields.title?.toLowerCase().includes(query) ||
                    fields.description?.toLowerCase().includes(query) ||
                    fields.author?.toLowerCase().includes(query) ||
                    study.category?.toLowerCase().includes(query) ||
                    study.industry?.toLowerCase().includes(query) ||
                    study.tags?.some(tag => tag.toLowerCase().includes(query))
                );
            });
        }

        // Filter by industry
        if (selectedIndustry !== 'all') {
            filtered = filtered.filter(study => study.industry === selectedIndustry);
        }

        return filtered;
    }, [caseStudies, searchQuery, selectedIndustry]);

    // Get featured case studies
    const featuredStudies = useMemo(() => {
        return caseStudies.filter(study => study.featured).slice(0, 2);
    }, [caseStudies]);

    // Get resource image
    const getResourceImage = (resource) => {
        return resource.bgImage || resource.image || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069';
    };

    // Get resource link
    const getResourceLink = (resource) => {
        return `/resources/case-studies/${resource.id}`;
    };

    // Format budget
    const formatBudget = (budget) => {
        if (!budget || budget === 'N/A') return 'N/A';
        return budget;
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950 text-white dark:text-gray-100">
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
                                Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 dark:from-emerald-400 dark:to-cyan-400">Studies</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-8">
                                Real-world examples of how we've helped businesses achieve remarkable results through technology.
                            </p>

                            <div className="max-w-2xl">
                                <div className="relative">
                                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search case studies..."
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

            {/* Industries Filter */}
            <section className="py-6 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4">
                    <div className="flex items-center overflow-x-auto scrollbar-hide">
                        <div className="flex space-x-2 py-2">
                            {allIndustries.map((industry) => (
                                <button
                                    key={industry}
                                    onClick={() => setSelectedIndustry(industry)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedIndustry === industry
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {industry === 'all' ? 'All Industries' : industry}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                {/* Featured Case Studies */}
                {featuredStudies.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                            Featured Case Studies
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {featuredStudies.map((study, index) => {
                                const fields = getTypeSpecificFields(study);

                                return (
                                    <motion.div
                                        key={study.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group"
                                    >
                                        <Link href={getResourceLink(study)}>
                                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full">
                                                <div
                                                    className="h-64 bg-cover bg-center"
                                                    style={{ backgroundImage: `url(${getResourceImage(study)})` }}
                                                />
                                                <div className="p-8">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium rounded-full">
                                                            {fields.industry || fields.category}
                                                        </span>
                                                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full">
                                                            Case Study
                                                        </span>
                                                    </div>

                                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                        {fields.title}
                                                    </h3>

                                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                                        {fields.description}
                                                    </p>

                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                                        <div className="text-center">
                                                            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                                                                {fields.timeline}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">Timeline</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                                                                {fields.teamSize}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">Team Size</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                                                                {formatBudget(fields.budget)}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">Budget</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                                                                {fields.client?.split(' ')[0] || 'Client'}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">Client</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2">
                                                        {fields.metrics.slice(0, 3).map((metric, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                                            >
                                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                    {metric}
                                                                </div>
                                                            </div>
                                                        ))}
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

                {/* All Case Studies */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {selectedIndustry === 'all' ? 'All Case Studies' : `${selectedIndustry} Case Studies`}
                            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                ({filteredStudies.length})
                            </span>
                        </h2>
                    </div>

                    {filteredStudies.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredStudies.map((study, index) => {
                                const fields = getTypeSpecificFields(study);

                                return (
                                    <motion.div
                                        key={study.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group"
                                    >
                                        <Link href={getResourceLink(study)}>
                                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-800/30 transition-all duration-300 h-full">
                                                <div
                                                    className="h-48 bg-cover bg-center"
                                                    style={{ backgroundImage: `url(${getResourceImage(study)})` }}
                                                />
                                                <div className="p-6">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium rounded">
                                                            {fields.industry || fields.category}
                                                        </span>
                                                        {study.premium && (
                                                            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-xs font-medium rounded">
                                                                Premium
                                                            </span>
                                                        )}
                                                    </div>

                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                                                        {fields.title}
                                                    </h3>

                                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                                        {fields.description}
                                                    </p>

                                                    <div className="space-y-3">
                                                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                            <div className="flex items-center gap-2">
                                                                <FiClock className="w-3 h-3" />
                                                                {fields.timeline}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <FiUsers className="w-3 h-3" />
                                                                {fields.teamSize}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            {fields.metrics.slice(0, 2).map((metric, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
                                                                >
                                                                    {metric}
                                                                </div>
                                                            ))}
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
                                No case studies found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {searchQuery ? `No results for "${searchQuery}"` : 'No case studies in this industry'}
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedIndustry('all');
                                }}
                                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}