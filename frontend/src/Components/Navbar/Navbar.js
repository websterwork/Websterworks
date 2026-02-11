'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import ThemeToggle from "../ThemeSwitcher/themetoggle";
import { useAuth } from "../../contexts/AuthContext";
import {
  FiSearch, FiMenu, FiX, FiUser, FiMessageSquare, FiGrid,
  FiSettings, FiLogOut, FiChevronDown, FiFileText, FiVideo,
  FiTool, FiBookOpen, FiTrendingUp, FiArrowRight, FiStar,
  FiHome, FiInfo, FiBriefcase, FiGlobe, FiBook, FiCpu,
  FiMail, FiChevronRight
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { getAllResources, getTypeSpecificFields, typeIcons } from "../../app/lib/resources-utils";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const moreMenuRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (query) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get all resources for search
  const allResources = getAllResources();

  // Search function
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const queryLower = query.toLowerCase();
    const results = allResources
      .map(resource => {
        const fields = getTypeSpecificFields(resource);
        const title = fields.title || "";
        const description = fields.description || "";
        const author = fields.author || "";
        const tags = resource.tags || [];

        let score = 0;
        if (title.toLowerCase().includes(queryLower)) score += 10;
        if (description.toLowerCase().includes(queryLower)) score += 5;
        if (author.toLowerCase().includes(queryLower)) score += 3;
        if (tags.some(tag => tag.toLowerCase().includes(queryLower))) score += 2;

        return {
          ...resource,
          fields,
          score,
          titleMatch: title.toLowerCase().includes(queryLower),
          descriptionMatch: description.toLowerCase().includes(queryLower)
        };
      })
      .filter(resource => resource.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    setSearchResults(results);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
    setShowSuggestions(true);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      setShowSuggestions(false);
      setShowMobileSearch(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (resource) => {
    saveRecentSearch(resource.fields.title);
    setShowSuggestions(false);
    setSearchQuery("");
    setShowMobileSearch(false);

    const typeMap = {
      'whitepaper': 'whitepapers',
      'case-study': 'case-studies',
      'webinar': 'webinars',
      'tool': 'tools',
      'guide': 'guides',
      'blog': 'blog'
    };
    const urlType = typeMap[resource.type] || resource.type;
    router.push(`/resources/${urlType}/${resource.id}`);
  };

  // Handle recent search click
  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    performSearch(query);
    saveRecentSearch(query);
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setShowSuggestions(false);
    setShowMobileSearch(false);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  // Get resource type icon
  const getResourceTypeIcon = (type) => {
    const IconComponent = typeIcons[type] || FiFileText;
    return <IconComponent className="w-4 h-4" />;
  };

  // Get resource type name
  const getResourceTypeName = (type) => {
    const typeNames = {
      'whitepaper': 'Whitepaper',
      'case-study': 'Case Study',
      'webinar': 'Webinar',
      'tool': 'Tool',
      'guide': 'Guide',
      'blog': 'Blog Post'
    };
    return typeNames[type] || type;
  };

  // Format views count
  const formatViews = (views) => {
    if (!views) return '0';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
    return views.toString();
  };

  // Navigation links with icons
  const publicLinks = [
    { name: "Home", href: "/", icon: FiHome },
    { name: "About", href: "/about", icon: FiInfo },
    { name: "Services", href: "/services", icon: FiBriefcase },
    { name: "Industries", href: "/industry", icon: FiGlobe },
    { name: "Resources", href: "/resources", icon: FiBook },
    { name: "Process", href: "/process", icon: FiCpu },
    { name: "Contact", href: "/contacts", icon: FiMail },
  ];

  // Split links for desktop - show first 5, rest in "More" dropdown
  const visibleLinks = publicLinks.slice(0, 5);
  const moreLinks = publicLinks.slice(5);

  const privateLinks = [
    { name: "Dashboard", href: "/dashboard", icon: MdDashboard },
    { name: "Projects", href: "/projects", icon: FiGrid },
    { name: "Messages", href: "/chat", icon: FiMessageSquare },
    { name: "Team", href: "/team", icon: FiUser },
    { name: "Billing", href: "/billing", icon: FiSettings },
  ];

  const linksToShow = user ? privateLinks : publicLinks;

  // Check if link is active
  const isActive = (href) => {
    if (href === '/') return pathname === href;
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Websterwork
              </span>
            </Link>

            {/* Desktop Navigation - Centered */}
            {!user && (
              <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
                <div className="flex items-center gap-1">
                  {visibleLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${active
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}

                  {/* More Dropdown */}
                  {moreLinks.length > 0 && (
                    <div className="relative" ref={moreMenuRef}>
                      <button
                        onClick={() => setShowMoreMenu(!showMoreMenu)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${showMoreMenu
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                      >
                        <span>More</span>
                        <FiChevronDown className={`w-4 h-4 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {showMoreMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50"
                          >
                            <div className="py-2">
                              {moreLinks.map((link) => {
                                const Icon = link.icon;
                                const active = isActive(link.href);
                                return (
                                  <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setShowMoreMenu(false)}
                                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${active
                                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                      }`}
                                  >
                                    <Icon className="w-4 h-4" />
                                    <span>{link.name}</span>
                                    <FiChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </nav>
            )}

            {/* Private Navigation for Logged-in Users */}
            {user && (
              <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
                <div className="flex items-center gap-1">
                  {privateLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${active
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </nav>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
              {/* Search Button (Mobile/Tablet) */}
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="lg:hidden p-2.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <FiSearch className="w-5 h-5" />
              </button>

              {/* Desktop Search Bar - Compact */}
              <div className="hidden lg:block relative w-64" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full pl-9 pr-8 py-2 bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </form>

                {/* Search Suggestions Dropdown */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                      {/* Search Results */}
                      {searchQuery ? (
                        searchResults.length > 0 ? (
                          <div className="max-h-96 overflow-y-auto">
                            {searchResults.slice(0, 5).map((result) => {
                              const Icon = typeIcons[result.type] || FiFileText;
                              return (
                                <button
                                  key={result.id}
                                  onClick={() => handleSuggestionClick(result)}
                                  className="flex items-start gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0 group"
                                >
                                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${result.type === 'whitepaper' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                                      result.type === 'case-study' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
                                        result.type === 'guide' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' :
                                          result.type === 'webinar' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' :
                                            result.type === 'blog' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600' :
                                              'bg-gray-100 dark:bg-gray-800 text-gray-600'
                                    }`}>
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-grow min-w-0">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                                      {result.fields.title}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {getResourceTypeName(result.type)}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                            <div className="p-2 border-t border-gray-100 dark:border-gray-800">
                              <button
                                onClick={handleSearchSubmit}
                                className="w-full px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors text-center"
                              >
                                View all results ({searchResults.length})
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              No results found
                            </p>
                          </div>
                        )
                      ) : recentSearches.length > 0 ? (
                        <div className="p-2">
                          <div className="flex items-center justify-between px-2 py-1">
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                              Recent
                            </span>
                            <button
                              onClick={clearRecentSearches}
                              className="text-xs text-red-500 hover:text-red-600"
                            >
                              Clear
                            </button>
                          </div>
                          {recentSearches.map((query, index) => (
                            <button
                              key={index}
                              onClick={() => handleRecentSearchClick(query)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                            >
                              <FiSearch className="w-3 h-3 text-gray-400" />
                              <span>{query}</span>
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {!user ? (
                // Public User Actions
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/portal/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/portal/signup"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Sign up
                  </Link>
                </div>
              ) : (
                // Logged-in User Actions
                <div className="flex items-center gap-2">
                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="hidden lg:block text-left">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user?.name?.split(' ')[0] || "User"}
                        </p>
                      </div>
                      <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50"
                        >
                          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {user?.name || "User"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {user?.email || "user@example.com"}
                            </p>
                          </div>
                          <div className="py-1">
                            <Link
                              href="/profile"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              <FiUser className="w-4 h-4" />
                              Profile
                            </Link>
                            <Link
                              href="/dashboard"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              <MdDashboard className="w-4 h-4" />
                              Dashboard
                            </Link>
                            <Link
                              href="/billing"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              <FiSettings className="w-4 h-4" />
                              Billing
                            </Link>
                          </div>
                          <div className="border-t border-gray-100 dark:border-gray-700 pt-1">
                            <button
                              onClick={() => {
                                logout();
                                setUserMenuOpen(false);
                              }}
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                              <FiLogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <AnimatePresence>
            {showMobileSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden py-3 border-t border-gray-200 dark:border-gray-800"
              >
                <form onSubmit={handleSearchSubmit} className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search resources, guides, tools..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-10 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 bottom-0 z-40 lg:hidden bg-white dark:bg-gray-950 overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                {publicLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 text-base font-medium rounded-xl transition-all ${active
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.name}</span>
                      {active && (
                        <span className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Auth Section */}
              {!user ? (
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/portal/login"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3.5 text-center text-gray-700 dark:text-gray-300 font-medium border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/portal/signup"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3.5 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {user.name || "User"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <MdDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/chat"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <FiMessageSquare className="w-5 h-5" />
                        <span>Messages</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <FiLogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Theme Toggle */}
              <div className="mt-6 flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dark Mode
                </span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Navbar;