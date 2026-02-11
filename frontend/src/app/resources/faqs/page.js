'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiSearch, FiChevronLeft, FiHelpCircle, FiMessageSquare, FiMail } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const faqCategories = [
  { id: 'general', name: 'General', icon: 'ℹ️' },
  { id: 'technical', name: 'Technical', icon: '⚙️' },
  { id: 'account', name: 'Account', icon: '👤' },
  { id: 'billing', name: 'Billing', icon: '💳' },
  { id: 'resources', name: 'Resources', icon: '📚' },
  { id: 'api', name: 'API', icon: '🔌' },
];

const faqs = [
  {
    id: 1,
    question: 'What types of resources do you offer?',
    answer: 'We offer a wide range of resources including whitepapers, case studies, webinars, tools, guides, and blog posts. These cover topics like web development, AI, cybersecurity, cloud computing, and digital transformation.',
    category: 'general',
    tags: ['resources', 'content']
  },
  {
    id: 2,
    question: 'Are the resources free to access?',
    answer: 'Most of our resources are free to access. Some premium whitepapers and tools may require a subscription or one-time payment. Free resources are clearly marked with a "Free" badge.',
    category: 'general',
    tags: ['pricing', 'access']
  },
  {
    id: 3,
    question: 'How can I download whitepapers?',
    answer: 'Click on any whitepaper to view its details page. You can download it directly by clicking the download button. Some whitepapers may require you to fill out a brief form before downloading.',
    category: 'resources',
    tags: ['download', 'whitepapers']
  },
  {
    id: 4,
    question: 'Do you offer technical support for your tools?',
    answer: 'Yes, we offer technical support for all our tools. Free tools have community support via our forums, while premium tools come with dedicated technical support.',
    category: 'technical',
    tags: ['support', 'tools']
  },
  {
    id: 5,
    question: 'Can I request a specific resource?',
    answer: 'Absolutely! We welcome resource requests. Visit our Contact page or use the "Request a Resource" form in the resources section to submit your request.',
    category: 'resources',
    tags: ['request', 'custom']
  },
  {
    id: 6,
    question: 'How often are new resources added?',
    answer: 'We add new resources weekly. Subscribe to our newsletter to get notified about new whitepapers, webinars, tools, and blog posts.',
    category: 'general',
    tags: ['updates', 'frequency']
  },
  {
    id: 7,
    question: 'Are webinars recorded for later viewing?',
    answer: 'Yes, all webinars are recorded and made available to registered participants within 24 hours after the live session.',
    category: 'resources',
    tags: ['webinars', 'recordings']
  },
  {
    id: 8,
    question: 'Do you offer enterprise solutions?',
    answer: 'Yes, we offer enterprise packages with customized resources, dedicated support, and team training. Contact our sales team for more information.',
    category: 'account',
    tags: ['enterprise', 'business']
  },
  {
    id: 9,
    question: 'How can I contribute to your blog?',
    answer: 'We accept guest posts from industry experts. Please visit our "Write for Us" page to learn about our submission guidelines and process.',
    category: 'resources',
    tags: ['contribute', 'blog']
  },
  {
    id: 10,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.',
    category: 'billing',
    tags: ['payment', 'billing']
  },
  {
    id: 11,
    question: 'Is there a mobile app available?',
    answer: 'Currently, we don\'t have a dedicated mobile app. However, our website is fully responsive and works well on all mobile devices.',
    category: 'technical',
    tags: ['mobile', 'app']
  },
  {
    id: 12,
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription at any time from your account settings. Cancellation takes effect at the end of your current billing period.',
    category: 'account',
    tags: ['subscription', 'cancellation']
  },
  {
    id: 13,
    question: 'Do you offer API access to your resources?',
    answer: 'Yes, we offer API access for enterprise customers. The API allows you to programmatically access our resource library. Contact our sales team for API documentation and pricing.',
    category: 'api',
    tags: ['api', 'integration']
  },
  {
    id: 14,
    question: 'What are the system requirements for your tools?',
    answer: 'System requirements vary by tool. Each tool page includes detailed system requirements in the "Requirements" section.',
    category: 'technical',
    tags: ['requirements', 'compatibility']
  },
  {
    id: 15,
    question: 'How do I report a bug or issue?',
    answer: 'You can report bugs or issues through our support portal or by emailing support@example.com. Please include detailed steps to reproduce the issue.',
    category: 'technical',
    tags: ['bugs', 'support']
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaqs, setExpandedFaqs] = useState([]);

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    let filtered = faqs;

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (id) => {
    setExpandedFaqs(prev =>
      prev.includes(id)
        ? prev.filter(faqId => faqId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 dark:from-gray-950 dark:via-slate-950 dark:to-zinc-950 text-white dark:text-gray-100">
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
                className="inline-flex items-center gap-2 text-gray-200 hover:text-white mb-6 transition-colors"
              >
                <FiChevronLeft className="w-4 h-4" />
                Back to Resources
              </Link>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-slate-300 dark:from-gray-400 dark:to-slate-400">Questions</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-8">
                Find answers to common questions about our resources, tools, and services.
              </p>

              <div className="max-w-2xl">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-6 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 py-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === 'all'
                    ? 'bg-gray-800 text-white dark:bg-gray-700'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                All Questions
              </button>
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${selectedCategory === category.id
                      ? 'bg-gray-800 text-white dark:bg-gray-700'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
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
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedCategory === 'all' ? 'All Questions' : `${faqCategories.find(c => c.id === selectedCategory)?.name} Questions`}
                  <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                    ({filteredFaqs.length})
                  </span>
                </h2>
              </div>

              {filteredFaqs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="group"
                    >
                      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center flex-shrink-0">
                              <FiHelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                {faq.question}
                              </h3>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">
                                  {faqCategories.find(c => c.id === faq.category)?.name}
                                </span>
                                {faq.tags.slice(0, 2).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className={`ml-4 transition-transform ${expandedFaqs.includes(faq.id) ? 'rotate-180' : ''}`}>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>

                        <AnimatePresence>
                          {expandedFaqs.includes(faq.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-800">
                                <div className="pl-14">
                                  <p className="text-gray-600 dark:text-gray-400">
                                    {faq.answer}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    No questions found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {searchQuery ? `No results for "${searchQuery}"` : 'No questions in this category'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-6 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Categories */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Categories
              </h3>
              <div className="space-y-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${selectedCategory === category.id
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="flex-grow">{category.name}</span>
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                      {faqs.filter(f => f.category === category.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Still Have Questions? */}
            <div className="bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FiMessageSquare className="w-5 h-5" />
                Still Have Questions?
              </h3>
              <p className="text-gray-300 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="space-y-4">
                <Link
                  href="/contact"
                  className="block w-full px-4 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center"
                >
                  Contact Support
                </Link>
                <Link
                  href="/resources"
                  className="block w-full px-4 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center"
                >
                  Browse Resources
                </Link>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {['resources', 'support', 'download', 'api', 'billing', 'account', 'tools', 'webinars'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${searchQuery === tag
                        ? 'bg-gray-800 text-white dark:bg-gray-700'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}