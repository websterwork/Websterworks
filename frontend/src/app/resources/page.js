'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiSearch, FiFilter, FiBook, FiFileText, FiTool, FiVideo, FiDownload, FiCalendar, FiUser, FiTag, FiChevronRight, FiTrendingUp, FiUsers, FiDollarSign, FiClock, FiEye, FiHeart, FiMessageCircle, FiBookOpen } from 'react-icons/fi';
import { motion } from 'framer-motion';
import {
  getAllResources,
  getFeaturedResources,
  getTrendingTopics,
  getResourceStats,
  getLatestResources,
  getPopularResources,
  getTypeSpecificFields,
  typeDisplayNames,
  typeIcons,
  getResourcesByType
} from '../lib/resources-utils';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState(null);
  const [latestResources, setLatestResources] = useState([]);
  const [popularResources, setPopularResources] = useState([]);

  // Get data from utils
  const allResources = getAllResources();
  const featuredResources = getFeaturedResources();
  const trendingTopics = getTrendingTopics();

  // Get stats and other data on mount
  useEffect(() => {
    const statsData = getResourceStats();
    setStats(statsData);
    setLatestResources(getLatestResources(3));
    setPopularResources(getPopularResources(5));
  }, []);

  // Get the correct link based on resource type
  const getResourceLink = (resource) => {
    const type = resource.type || '';
    const typeMap = {
      'whitepaper': 'whitepapers',
      'case-study': 'case-studies',
      'webinar': 'webinars',
      'tool': 'tools',
      'guide': 'guides',
      'blog': 'blog'
    };

    const urlType = typeMap[type] || type;
    return `/resources/${urlType}/${resource.id}`;
  };

  // Main filtered resources
  const filteredResources = useMemo(() => {
    let filtered = allResources;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.type === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource => {
        const fields = getTypeSpecificFields(resource);
        return (
          fields.title?.toLowerCase().includes(query) ||
          fields.description?.toLowerCase().includes(query) ||
          fields.author?.toLowerCase().includes(query) ||
          resource.category?.toLowerCase().includes(query) ||
          resource.tags?.some(tag => tag.toLowerCase().includes(query))
        );
      });
    }

    return filtered;
  }, [selectedCategory, searchQuery, allResources]);

  // Filter resources by type for specific sections
  const filteredBlogPosts = useMemo(() =>
    filteredResources.filter(resource => resource.type === 'blog'),
    [filteredResources]
  );

  const filteredCaseStudies = useMemo(() =>
    filteredResources.filter(resource => resource.type === 'case-study'),
    [filteredResources]
  );

  const filteredWhitepapers = useMemo(() =>
    filteredResources.filter(resource => resource.type === 'whitepaper'),
    [filteredResources]
  );

  const filteredWebinars = useMemo(() =>
    filteredResources.filter(resource => resource.type === 'webinar'),
    [filteredResources]
  );

  const filteredGuides = useMemo(() =>
    filteredResources.filter(resource => resource.type === 'guide'),
    [filteredResources]
  );

  const filteredTools = useMemo(() =>
    filteredResources.filter(resource => resource.type === 'tool'),
    [filteredResources]
  );

  const filteredFeaturedResources = useMemo(() =>
    filteredResources.filter(resource => resource.featured === true),
    [filteredResources]
  );

  // Calculate category counts with updated types
  const resourceCategories = useMemo(() => [
    { id: 'all', name: 'All Resources', icon: FiBook, count: filteredResources.length },
    { id: 'blog', name: 'Blog Posts', icon: FiMessageCircle, count: filteredBlogPosts.length },
    { id: 'case-study', name: 'Case Studies', icon: FiTrendingUp, count: filteredCaseStudies.length },
    { id: 'whitepaper', name: 'Whitepapers', icon: FiFileText, count: filteredWhitepapers.length },
    { id: 'guide', name: 'Guides', icon: FiBookOpen, count: filteredGuides.length },
    { id: 'webinar', name: 'Webinars', icon: FiVideo, count: filteredWebinars.length },
    { id: 'tool', name: 'Tools', icon: FiTool, count: filteredTools.length }
  ], [filteredResources, filteredBlogPosts, filteredCaseStudies, filteredWhitepapers, filteredGuides, filteredWebinars, filteredTools]);

  // Clear filters function
  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  // Get resource type display name
  const getResourceTypeName = (type) => {
    return typeDisplayNames[type] || type;
  };

  // Get resource type icon
  const getResourceTypeIcon = (type) => {
    const IconComponent = typeIcons[type] || FiFileText;
    return <IconComponent className="w-4 h-4" />;
  };

  // Get resource image URL
  const getResourceImage = (resource) => {
    return resource.bgImage || resource.image || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069';
  };

  // Format numbers for display
  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  // Render case study specific info
  const renderCaseStudyInfo = (study) => {
    const fields = getTypeSpecificFields(study);
    return (
      <div className="mt-3 space-y-2">
        {fields.timeline && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FiClock className="w-3 h-3" />
            <span>{fields.timeline}</span>
          </div>
        )}
        {fields.budget && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FiDollarSign className="w-3 h-3" />
            <span>{fields.budget}</span>
          </div>
        )}
        {fields.teamSize && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FiUsers className="w-3 h-3" />
            <span>Team: {fields.teamSize}</span>
          </div>
        )}
      </div>
    );
  };

  // Render blog specific info
  const renderBlogInfo = (post) => {
    const fields = getTypeSpecificFields(post);
    return (
      <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <FiCalendar className="w-3 h-3" />
          {fields.date}
        </div>
        <div className="flex items-center gap-1">
          <FiUser className="w-3 h-3" />
          {fields.author?.split(' ')[0] || 'Author'}
        </div>
        {fields.views > 0 && (
          <div className="flex items-center gap-1">
            <FiEye className="w-3 h-3" />
            {formatNumber(fields.views)} views
          </div>
        )}
      </div>
    );
  };

  // Render webinar specific info
  const renderWebinarInfo = (webinar) => {
    return (
      <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        {webinar.date && (
          <div className="flex items-center gap-1">
            <FiCalendar className="w-3 h-3" />
            {webinar.date}
          </div>
        )}
        {webinar.time && (
          <div className="flex items-center gap-1">
            <FiClock className="w-3 h-3" />
            {webinar.time}
          </div>
        )}
        {webinar.registrationCount && (
          <div className="flex items-center gap-1">
            <FiUsers className="w-3 h-3" />
            {webinar.registrationCount} registered
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-white dark:text-gray-100">
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0" />

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 dark:from-purple-400 dark:to-blue-400">Resources</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-8">
                Expert insights, guides, case studies, and tools to accelerate your digital transformation
              </p>

              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                  {(selectedCategory !== 'all' || searchQuery) && (
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

      {/* Statistics */}
      {stats && (
        <section className="py-12 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-2xl text-center border border-purple-100 dark:border-purple-800/30">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{stats.total}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Resources</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl text-center border border-blue-100 dark:border-blue-800/30">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stats.featured}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Featured</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl text-center border border-green-100 dark:border-green-800/30">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{stats.categories}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Categories</div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-6 rounded-2xl text-center border border-pink-100 dark:border-pink-800/30">
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">{stats.blogPosts}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Blog Posts</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-2xl text-center border border-orange-100 dark:border-orange-800/30">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">{stats.caseStudies}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Case Studies</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 p-6 rounded-2xl text-center border border-indigo-100 dark:border-indigo-800/30">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{stats.webinars}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Webinars</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-8 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-40 backdrop-blur-sm bg-white/95 dark:bg-gray-950/95">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FiFilter className="w-5 h-5" />
              <span className="font-medium">Filter by type:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {resourceCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                    <span className={`text-xs ${selectedCategory === category.id ? 'text-blue-200' : 'opacity-75'}`}>
                      ({category.count})
                    </span>
                  </button>
                );
              })}
              {(selectedCategory !== 'all' || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - All Sections */}
          <div className="lg:col-span-2 space-y-16">
            {/* Featured Resources */}
            <section>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Featured Resources
                </h2>
                {featuredResources.length > 0 && (
                  <Link
                    href="/resources/featured"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
                  >
                    View all
                    <FiChevronRight className="w-5 h-5" />
                  </Link>
                )}
              </div>

              {filteredFeaturedResources.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredFeaturedResources.map((resource, index) => {
                    const fields = getTypeSpecificFields(resource);
                    const TypeIcon = typeIcons[resource.type] || FiFileText;

                    return (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group"
                      >
                        <Link href={getResourceLink(resource)}>
                          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full hover:-translate-y-1">
                            {/* Resource Image */}
                            <div
                              className="h-48 relative overflow-hidden"
                              style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${getResourceImage(resource)})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                              {/* Type Badge */}
                              <div className="absolute top-4 left-4 z-10">
                                <span className={`px-3 py-1.5 text-white text-xs font-semibold rounded-full flex items-center gap-1 backdrop-blur-sm ${resource.type === 'whitepaper'
                                  ? 'bg-blue-600/90'
                                  : resource.type === 'case-study'
                                    ? 'bg-green-600/90'
                                    : resource.type === 'guide'
                                      ? 'bg-purple-600/90'
                                      : resource.type === 'webinar'
                                        ? 'bg-orange-600/90'
                                        : resource.type === 'blog'
                                          ? 'bg-pink-600/90'
                                          : 'bg-gray-600/90'
                                  }`}>
                                  <TypeIcon className="w-3 h-3" />
                                  {getResourceTypeName(resource.type)}
                                </span>
                              </div>

                              {/* Premium Badge */}
                              {resource.premium && (
                                <div className="absolute top-4 right-4 z-10">
                                  <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                    Premium
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Resource Content */}
                            <div className="p-6">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                                  {resource.category || 'General'}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {resource.readTime || '10 min read'}
                                </span>
                              </div>

                              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {fields.title}
                              </h3>

                              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                {fields.description}
                              </p>

                              {/* Resource-specific info */}
                              {resource.type === 'case-study' && renderCaseStudyInfo(resource)}
                              {resource.type === 'blog' && renderBlogInfo(resource)}
                              {resource.type === 'webinar' && renderWebinarInfo(resource)}

                              {/* Meta Info */}
                              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-1">
                                  <FiUser className="w-3 h-3" />
                                  {fields.author || 'Unknown Author'}
                                </div>
                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                  <span>Read more</span>
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
                    No featured resources found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try changing your filters or search query
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </section>

            {/* Latest Resources */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Latest Resources
                </h2>
                <Link
                  href="#latest"
                  className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
                >
                  View all
                  <FiChevronRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="space-y-6">
                {latestResources.map((resource, index) => {
                  const fields = getTypeSpecificFields(resource);
                  const TypeIcon = typeIcons[resource.type] || FiFileText;

                  return (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group"
                    >
                      <Link href={getResourceLink(resource)}>
                        <div className="flex flex-col md:flex-row gap-6 p-6 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                          {/* Resource Image */}
                          <div className="md:w-48 md:h-48 w-full h-64 rounded-xl overflow-hidden flex-shrink-0">
                            <div
                              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                              style={{ backgroundImage: `url(${getResourceImage(resource)})` }}
                            />
                          </div>

                          {/* Resource Content */}
                          <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-3">
                              <span className={`px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 ${resource.type === 'whitepaper'
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                : resource.type === 'case-study'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                  : resource.type === 'guide'
                                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                                    : resource.type === 'webinar'
                                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                                      : resource.type === 'blog'
                                        ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
                                        : 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
                                }`}>
                                <TypeIcon className="w-3 h-3" />
                                {getResourceTypeName(resource.type)}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{resource.readTime}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{resource.date}</span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {fields.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              {fields.description}
                            </p>

                            {/* Resource-specific info */}
                            {resource.type === 'case-study' && (
                              <div className="flex flex-wrap gap-3 mb-4">
                                {fields.metrics?.slice(0, 3).map((metric, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                                  >
                                    {metric}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex flex-wrap items-center justify-between gap-4">
                              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                  <FiUser className="w-3 h-3" />
                                  {fields.author || 'Unknown Author'}
                                </div>
                                {resource.type === 'blog' && fields.views > 0 && (
                                  <div className="flex items-center gap-2">
                                    <FiEye className="w-3 h-3" />
                                    {formatNumber(fields.views)} views
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                {resource.tags?.slice(0, 3).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                                  >
                                    {tag}
                                  </span>
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
            </section>

            {/* Blog Posts Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Latest Blog Posts
                </h2>
                {filteredBlogPosts.length > 0 && (
                  <Link
                    href="/resources/blog"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
                  >
                    View all posts
                    <FiChevronRight className="w-5 h-5" />
                  </Link>
                )}
              </div>

              {filteredBlogPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredBlogPosts.map((post, index) => {
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
                          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-800/30 transition-all duration-300 h-full hover:-translate-y-1">
                            {/* Post Image */}
                            <div
                              className="h-48 bg-cover bg-center"
                              style={{ backgroundImage: `url(${getResourceImage(post)})` }}
                            />

                            {/* Post Content */}
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <span className="px-2.5 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-medium rounded-full">
                                    {post.category}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{post.readTime}</span>
                                </div>
                                {fields.likes > 0 && (
                                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                    <FiHeart className="w-3 h-3" />
                                    {formatNumber(fields.likes)}
                                  </div>
                                )}
                              </div>

                              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {fields.title}
                              </h3>

                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                {fields.description}
                              </p>

                              {renderBlogInfo(post)}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                selectedCategory === 'all' || selectedCategory === 'blog' ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No blog posts match your filters
                    </p>
                  </div>
                ) : null
              )}
            </section>

            {/* Case Studies Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Case Studies
                </h2>
                {filteredCaseStudies.length > 0 && (
                  <Link
                    href="/resources/case-studies"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
                  >
                    View all case studies
                    <FiChevronRight className="w-5 h-5" />
                  </Link>
                )}
              </div>

              {filteredCaseStudies.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredCaseStudies.map((study, index) => {
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
                          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-800/30 transition-all duration-300 h-full hover:-translate-y-1">
                            {/* Study Image */}
                            <div
                              className="h-48 bg-cover bg-center"
                              style={{ backgroundImage: `url(${getResourceImage(study)})` }}
                            />

                            {/* Study Content */}
                            <div className="p-6">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium rounded-full">
                                  Case Study
                                </span>
                                <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                                  {study.industry || study.category}
                                </span>
                              </div>

                              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {fields.title}
                              </h3>

                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                {fields.description}
                              </p>

                              {/* Case Study Metrics */}
                              {fields.metrics && fields.metrics.length > 0 && (
                                <div className="space-y-2 mb-4">
                                  {fields.metrics.slice(0, 2).map((metric, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                                    >
                                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                                      <span>{metric}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Case Study Details */}
                              <div className="grid grid-cols-2 gap-3 text-sm text-gray-500 dark:text-gray-400">
                                {fields.timeline && (
                                  <div className="flex items-center gap-2">
                                    <FiClock className="w-3 h-3" />
                                    <span>{fields.timeline}</span>
                                  </div>
                                )}
                                {fields.client && (
                                  <div className="flex items-center gap-2">
                                    <FiUsers className="w-3 h-3" />
                                    <span>{fields.client}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                selectedCategory === 'all' || selectedCategory === 'case-study' ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No case studies match your filters
                    </p>
                  </div>
                ) : null
              )}
            </section>

            {/* Whitepapers Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Whitepapers & Reports
                </h2>
                {filteredWhitepapers.length > 0 && (
                  <Link
                    href="/resources/whitepapers"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
                  >
                    View all whitepapers
                    <FiChevronRight className="w-5 h-5" />
                  </Link>
                )}
              </div>

              {filteredWhitepapers.length > 0 ? (
                <div className="space-y-6">
                  {filteredWhitepapers.map((paper, index) => {
                    const fields = getTypeSpecificFields(paper);

                    return (
                      <motion.div
                        key={paper.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="group"
                      >
                        <Link href={getResourceLink(paper)}>
                          <div className="flex flex-col md:flex-row gap-6 p-6 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            {/* Paper Image */}
                            <div className="md:w-48 md:h-48 w-full h-64 rounded-xl overflow-hidden flex-shrink-0">
                              <div
                                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                                style={{ backgroundImage: `url(${getResourceImage(paper)})` }}
                              />
                            </div>

                            {/* Paper Content */}
                            <div className="flex-grow">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                                    {paper.category}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{paper.readTime}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                  <FiDownload className="w-3 h-3" />
                                  {paper.downloadCount || '0'} downloads
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
                                  <div className="flex items-center gap-2">
                                    <FiCalendar className="w-3 h-3" />
                                    {fields.date}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  {paper.tags?.slice(0, 3).map((tag, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                                    >
                                      {tag}
                                    </span>
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
                selectedCategory === 'all' || selectedCategory === 'whitepaper' ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No whitepapers match your filters
                    </p>
                  </div>
                ) : null
              )}
            </section>

            {/* Webinars Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Upcoming Webinars
                </h2>
                {filteredWebinars.length > 0 && (
                  <Link
                    href="/resources/webinars"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
                  >
                    View all webinars
                    <FiChevronRight className="w-5 h-5" />
                  </Link>
                )}
              </div>

              {filteredWebinars.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
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
                        <Link href={getResourceLink(webinar)}>
                          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-800/30 transition-all duration-300 h-full hover:-translate-y-1">
                            {/* Webinar Image */}
                            <div
                              className="h-48 bg-cover bg-center"
                              style={{ backgroundImage: `url(${getResourceImage(webinar)})` }}
                            />

                            {/* Webinar Content */}
                            <div className="p-6">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="px-2.5 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-medium rounded-full">
                                  Webinar
                                </span>
                                <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                                  {webinar.category}
                                </span>
                              </div>

                              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {fields.title}
                              </h3>

                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                {fields.description}
                              </p>

                              {renderWebinarInfo(webinar)}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                selectedCategory === 'all' || selectedCategory === 'webinar' ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No webinars match your filters
                    </p>
                  </div>
                ) : null
              )}
            </section>

            {/* Guides Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Guides & Tutorials
                </h2>
                {filteredGuides.length > 0 && (
                  <Link
                    href="/resources/guides"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
                  >
                    View all guides
                    <FiChevronRight className="w-5 h-5" />
                  </Link>
                )}
              </div>

              {filteredGuides.length > 0 ? (
                <div className="space-y-6">
                  {filteredGuides.map((guide, index) => {
                    const fields = getTypeSpecificFields(guide);

                    return (
                      <motion.div
                        key={guide.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="group"
                      >
                        <Link href={getResourceLink(guide)}>
                          <div className="flex flex-col md:flex-row gap-6 p-6 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            {/* Guide Image */}
                            <div className="md:w-48 md:h-48 w-full h-64 rounded-xl overflow-hidden flex-shrink-0">
                              <div
                                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                                style={{ backgroundImage: `url(${getResourceImage(guide)})` }}
                              />
                            </div>

                            {/* Guide Content */}
                            <div className="flex-grow">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full">
                                  {guide.category}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{guide.readTime}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{guide.date}</span>
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
                                  {guide.premium && (
                                    <span className="px-2.5 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs rounded-full">
                                      Premium
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  {guide.tags?.slice(0, 3).map((tag, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                                    >
                                      {tag}
                                    </span>
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
                selectedCategory === 'all' || selectedCategory === 'guide' ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No guides match your filters
                    </p>
                  </div>
                ) : null
              )}
            </section>

            {/* Tools Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Tools & Templates
                </h2>
                {filteredTools.length > 0 && (
                  <Link
                    href="/resources/tools"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
                  >
                    View all tools
                    <FiChevronRight className="w-5 h-5" />
                  </Link>
                )}
              </div>

              {filteredTools.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
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
                        <Link href={getResourceLink(tool)}>
                          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg dark:hover:shadow-gray-800/30 transition-all duration-300 h-full hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0 border border-blue-200 dark:border-blue-800/30">
                                <FiTool className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                                    {tool.category}
                                  </span>
                                  {tool.downloadCount && (
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                      <FiDownload className="w-3 h-3" />
                                      {tool.downloadCount} downloads
                                    </div>
                                  )}
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {fields.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                  {fields.description}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                  <div className="flex items-center gap-2">
                                    <FiUser className="w-3 h-3" />
                                    {fields.author || 'Unknown Author'}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <FiCalendar className="w-3 h-3" />
                                    {fields.date}
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
              ) : (
                selectedCategory === 'all' || selectedCategory === 'tool' ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No tools match your filters
                    </p>
                  </div>
                ) : null
              )}
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Trending Topics */}
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                <FiTag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {trendingTopics.slice(0, 8).map((topic, index) => (
                  <Link
                    key={topic.name}
                    href={`/resources/topics/${topic.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 group hover:-translate-x-1"
                  >
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {topic.name}
                    </span>
                    <span className="px-2.5 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
                      {topic.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Resources */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                <FiTrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Popular Resources
              </h3>
              <div className="space-y-4">
                {popularResources.map((resource, index) => {
                  const TypeIcon = typeIcons[resource.type] || FiFileText;

                  return (
                    <Link
                      key={resource.id}
                      href={getResourceLink(resource)}
                      className="block group"
                    >
                      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                        <span className="text-2xl font-bold text-gray-300 dark:text-gray-700 w-8 text-center">
                          {index + 1}
                        </span>
                        <div className="flex-grow">
                          <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                            {resource.title}
                          </h4>
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <TypeIcon className="w-3 h-3" />
                              {getResourceTypeName(resource.type)}
                            </span>
                            {resource.views > 0 && (
                              <span>{formatNumber(resource.views)} views</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Resource Types */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Resource Types
              </h3>
              <div className="space-y-2">
                {resourceCategories.slice(1).map((category) => {
                  const Icon = category.icon;

                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center justify-between w-full p-3 rounded-lg text-left transition-all duration-300 ${selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{category.name}</span>
                      </div>
                      <span className={`px-2.5 py-1 text-xs rounded-full ${selectedCategory === category.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Summary */}
            {(selectedCategory !== 'all' || searchQuery) && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800/30">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Filter Summary
                </h3>
                <div className="space-y-3">
                  {selectedCategory !== 'all' && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Category:</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {resourceCategories.find(c => c.id === selectedCategory)?.name || selectedCategory}
                      </span>
                    </div>
                  )}
                  {searchQuery && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Search:</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">"{searchQuery}"</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Results:</span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">{filteredResources.length}</span>
                  </div>
                </div>
                <button
                  onClick={clearFilters}
                  className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-white dark:text-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-xl text-gray-200 dark:text-gray-300 mb-8">
                Suggest new resources or request specific content to help with your projects
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                >
                  Request a Resource
                </Link>
                <Link
                  href="/subscribe"
                  className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Subscribe for Updates
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}