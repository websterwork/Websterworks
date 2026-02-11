'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiUser,
  FiClock,
  FiTag,
  FiShare2,
  FiBookmark,
  FiThumbsUp,
  FiMessageCircle,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiLink,
  FiChevronRight,
  FiTrendingUp,
  FiEye,
  FiHeart,
  FiStar
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getBlogPost, getRelatedResources, getBlogPosts, getResource, getTypeSpecificFields } from '../../../lib/resources-utils';

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (params?.id) {
          const resource = getResource(params.id);

          if (resource && resource.type === 'blog') {
            setPost(resource);

            // Get related posts
            try {
              const related = getRelatedResources(resource, 3);
              setRelatedPosts(related);
            } catch (error) {
              console.error('Error getting related posts:', error);
              // Fallback: get other blog posts excluding current one
              const allPosts = getBlogPosts();
              const otherPosts = allPosts.filter(p => p && p.id !== params.id);
              setRelatedPosts(otherPosts.slice(0, 3));
            }
          } else {
            console.error('Resource found but not a blog post:', resource?.type);
          }
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      loadPost();
    }
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 text-white dark:text-gray-100 font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-800 dark:hover:to-pink-800 transition-all duration-300"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Blog Posts
          </Link>
        </div>
      </div>
    );
  }

  // Get type-specific fields with defaults
  const fields = getTypeSpecificFields(post);

  // Format numbers
  const formatViews = (views) => {
    if (!views || views === 0) return '0';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
    return views.toString();
  };

  const formatLikes = (likes) => {
    if (!likes || likes === 0) return '0';
    if (likes >= 1000) return `${(likes / 1000).toFixed(1)}k`;
    return likes.toString();
  };

  // Get resource image
  const getResourceImage = (resource) => {
    return resource.bgImage || resource.image || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069';
  };

  // Share functionality
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = fields.title;
    const text = fields.description;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
    }
  };

  // Format content for display
  const renderContent = () => {
    const content = post.content?.fullContent || post.content || '';

    if (content) {
      // If content is in markdown format or has specific structure
      if (content.includes('#')) {
        return content.split('\n').map((line, index) => {
          if (line.startsWith('# ')) {
            return <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">{line.substring(2)}</h2>;
          } else if (line.startsWith('## ')) {
            return <h3 key={index} className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-6 mb-3">{line.substring(3)}</h3>;
          } else if (line.startsWith('### ')) {
            return <h4 key={index} className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2">{line.substring(4)}</h4>;
          } else if (line.startsWith('- ') || line.startsWith('* ')) {
            return <li key={index} className="ml-6 mb-2 text-gray-700 dark:text-gray-300">{line.substring(2)}</li>;
          } else if (line.trim() === '') {
            return <br key={index} />;
          } else {
            return <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">{line}</p>;
          }
        });
      } else {
        // Simple text content
        return content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
            {paragraph}
          </p>
        ));
      }
    }

    // Fallback content
    return (
      <>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">Introduction</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Welcome to our in-depth exploration of {fields.title.toLowerCase()}. In this comprehensive guide,
          we'll dive deep into the subject matter, providing you with valuable insights and practical
          knowledge that you can apply immediately.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">Main Content</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The core of our discussion revolves around understanding the fundamental principles
          and practical applications. As technology continues to evolve at a rapid pace, staying
          informed about the latest developments is crucial for professionals in the field.
        </p>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border-l-4 border-purple-600 dark:border-purple-500 my-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Key Takeaway
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            The most important insight from this article is that proper understanding and
            implementation can lead to significant improvements in efficiency and results.
          </p>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-6 mb-3">Detailed Analysis</h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Our analysis shows that organizations that adopt these practices see measurable
          improvements in their operations. The data suggests that early adoption gives
          companies a competitive advantage in their respective markets.
        </p>

        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-6 mb-3">Practical Applications</h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Here are some practical ways you can apply these insights in your own work:
        </p>
        <ul className="list-disc ml-6 mb-4 text-gray-700 dark:text-gray-300">
          <li className="mb-2">Implement the core principles in your daily workflow</li>
          <li className="mb-2">Share these insights with your team members</li>
          <li className="mb-2">Track your progress and measure results</li>
          <li className="mb-2">Continuously learn and adapt to new developments</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">Conclusion</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          In conclusion, the information presented here provides a solid foundation for
          understanding and applying these concepts. We encourage you to explore further
          and continue learning about this important topic.
        </p>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/resources/blog"
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-300 font-medium group"
        >
          <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Blog Posts
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-white dark:text-gray-100">
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 text-white text-sm font-bold rounded-full shadow-lg">
                {fields.category}
              </span>
              {fields.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm text-white/90 text-sm font-medium rounded-full border border-white/20 dark:border-gray-700/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {fields.title}
            </h1>

            <p className="text-xl text-gray-200 dark:text-gray-300 mb-8 max-w-3xl leading-relaxed">
              {fields.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-gray-200 dark:text-gray-300">
              <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-xl">
                <FiUser className="w-5 h-5" />
                <span className="font-medium">{fields.author}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-xl">
                <FiCalendar className="w-5 h-5" />
                <span>{fields.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-xl">
                <FiClock className="w-5 h-5" />
                <span>{fields.readTime}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-xl">
                <FiEye className="w-5 h-5" />
                <span>{formatViews(fields.views)} views</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-xl">
                <FiHeart className="w-5 h-5" />
                <span>{formatLikes(fields.likes)} likes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-2xl overflow-hidden mb-8 shadow-lg"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage: `url(${getResourceImage(post)})`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>

            {/* Blog Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <div className="text-gray-700 dark:text-gray-300">
                {renderContent()}
              </div>
            </motion.article>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <FiTag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="font-bold text-gray-900 dark:text-gray-100">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {fields.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/resources/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-between gap-4 py-6 border-t border-b border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${isLiked ? 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 border border-gray-200 dark:border-gray-700'}`}
                >
                  <FiThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="font-semibold">{isLiked ? 'Liked' : 'Like'}</span>
                  <span className="text-sm font-medium">({fields.likes + (isLiked ? 1 : 0)})</span>
                </button>

                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${isBookmarked ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 border border-gray-200 dark:border-gray-700'}`}
                >
                  <FiBookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  <span className="font-semibold">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-900 dark:text-gray-100 font-bold">Share:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FiFacebook className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-3 bg-gradient-to-br from-sky-500 to-sky-600 dark:from-sky-600 dark:to-sky-700 text-white rounded-xl hover:from-sky-600 hover:to-sky-700 dark:hover:from-sky-700 dark:hover:to-sky-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FiTwitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FiLinkedin className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400 rounded-xl hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/40 dark:hover:to-pink-900/40 border border-purple-200 dark:border-purple-800 transition-all duration-300"
                  >
                    <FiLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                About the Author
              </h3>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {fields.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 text-xl">{fields.author}</h4>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mt-1">
                    Senior Developer & Technical Writer
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                    With over 10 years of experience in web development and AI technologies.
                    Specializes in creating comprehensive guides and tutorials.
                  </p>
                </div>
              </div>
              <Link
                href="/resources/blog"
                className="block w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-800 dark:hover:to-pink-800 text-white dark:text-gray-100 font-bold rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-xl"
              >
                View All Posts
              </Link>
            </motion.div>

            {/* Related Posts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Related Posts
              </h3>
              <div className="space-y-4">
                {relatedPosts.length > 0 ? (
                  relatedPosts.map((relatedPost, index) => {
                    const relatedFields = getTypeSpecificFields(relatedPost);
                    return (
                      <motion.div
                        key={relatedPost.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Link
                          href={`/resources/blog/${relatedPost.id}`}
                          className="block group"
                        >
                          <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20">
                            <div
                              className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0 shadow-md"
                              style={{
                                backgroundImage: `url(${getResourceImage(relatedPost)})`
                              }}
                            />
                            <div>
                              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                                {relatedFields.title}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>{relatedFields.readTime}</span>
                                <span>•</span>
                                <span>{relatedFields.date}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No related posts found.
                  </p>
                )}
              </div>
            </motion.div>

            {/* Popular Posts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                <FiTrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                Popular Posts
              </h3>
              <div className="space-y-4">
                {getBlogPosts()
                  .sort((a, b) => (b.views || 0) - (a.views || 0))
                  .slice(0, 3)
                  .filter(p => p.id !== post.id)
                  .map((popularPost, index) => {
                    const popularFields = getTypeSpecificFields(popularPost);
                    return (
                      <motion.div
                        key={popularPost.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Link
                          href={`/resources/blog/${popularPost.id}`}
                          className="block group"
                        >
                          <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 transition-all duration-300">
                            <span className="text-xl font-bold text-purple-600 dark:text-purple-400 w-8">
                              {index + 1}
                            </span>
                            <div className="flex-grow">
                              <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 line-clamp-2">
                                {popularFields.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <FiEye className="w-3 h-3" />
                                <span>{formatViews(popularFields.views)} views</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
              </div>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 rounded-2xl p-6 text-white shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-purple-200 dark:text-purple-300 mb-6">
                Get the latest blog posts delivered directly to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 dark:placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent backdrop-blur-sm"
                />
                <button className="w-full px-4 py-3 bg-white text-purple-600 hover:bg-gray-100 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                  Subscribe Now
                </button>
                <p className="text-xs text-purple-200 dark:text-purple-300 text-center mt-2">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* More Posts Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              More from the Blog
            </h2>
            <Link
              href="/resources/blog"
              className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-lg hover:gap-4 transition-all"
            >
              View all posts
              <FiArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {getBlogPosts()
              .filter(p => p && p.id !== post.id)
              .slice(0, 3)
              .map((blogPost, index) => {
                const blogFields = getTypeSpecificFields(blogPost);
                return (
                  <motion.div
                    key={blogPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/resources/blog/${blogPost.id}`}
                      className="group"
                    >
                      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-800/30 transition-all duration-500 border border-gray-200 dark:border-gray-800">
                        <div
                          className="h-48 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                          style={{
                            backgroundImage: `url(${getResourceImage(blogPost)})`
                          }}
                        >
                          <div className="h-full bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold rounded-full">
                              {blogFields.category}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {blogFields.readTime}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                            {blogFields.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                            {blogFields.description}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-medium">{blogFields.author}</span>
                            <span>{blogFields.date}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}