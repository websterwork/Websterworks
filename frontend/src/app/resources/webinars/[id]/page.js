'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    FiArrowLeft,
    FiCalendar,
    FiClock,
    FiVideo,
    FiUser,
    FiDownload,
    FiShare2,
    FiMessageCircle,
    FiThumbsUp,
    FiBookmark,
    FiChevronRight,
    FiPlayCircle,
    FiUsers,
    FiTag,
    FiBookOpen
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getWebinar, getRelatedResources, getWebinars, getTypeSpecificFields } from '../../../lib/resources-utils';

export default function WebinarPage() {
    const params = useParams();
    const [webinar, setWebinar] = useState(null);
    const [relatedWebinars, setRelatedWebinars] = useState([]);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWebinar = async () => {
            try {
                if (params?.id) {
                    const webinarData = getWebinar(params.id);

                    if (webinarData) {
                        setWebinar(webinarData);

                        // Get related webinars
                        try {
                            const related = getRelatedResources(webinarData, 3);
                            setRelatedWebinars(related);
                        } catch (error) {
                            console.error('Error getting related webinars:', error);
                            const allWebinars = getWebinars();
                            const otherWebinars = allWebinars.filter(w => w && w.id !== params.id);
                            setRelatedWebinars(otherWebinars.slice(0, 3));
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading webinar:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params?.id) {
            loadWebinar();
        }
    }, [params]);

    // Check if webinar is upcoming
    const isUpcoming = () => {
        if (!webinar?.date) return false;
        // Simple check for upcoming status
        return webinar.date.includes('Mar') || webinar.date.includes('2024');
    };

    // Get webinar agenda
    const getAgenda = () => {
        if (!webinar?.content) return [
            'Introduction & Welcome (10 minutes)',
            'Industry Trends & Analysis (30 minutes)',
            'Case Study Presentation (25 minutes)',
            'Interactive Q&A Session (15 minutes)',
            'Conclusion & Next Steps (10 minutes)'
        ];

        if (webinar.content.agenda) {
            return webinar.content.agenda;
        }

        return [
            'Introduction & Welcome (10 minutes)',
            'Main Presentation (40 minutes)',
            'Q&A Session (10 minutes)'
        ];
    };

    const agenda = getAgenda();
    const isWebinarUpcoming = isUpcoming();

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading webinar...</p>
                </div>
            </div>
        );
    }

    if (!webinar) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🎥</div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Webinar Not Found</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        The webinar you're looking for doesn't exist or has been moved.
                    </p>
                    <Link
                        href="/resources/webinars"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Back to Webinars
                    </Link>
                </div>
            </div>
        );
    }

    const fields = getTypeSpecificFields(webinar);
    const registrationCount = fields.registrationCount || '0';
    const isFeatured = webinar.featured || false;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-8">
                <Link
                    href="/resources/webinars"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    Back to Webinars
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-red-900 via-orange-900 to-amber-900 dark:from-red-950 dark:via-orange-950 dark:to-amber-950 text-white dark:text-gray-100">
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0" />

                <div className="container mx-auto px-4 py-16 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full">
                                <FiVideo className="inline w-3 h-3 mr-1" />
                                Webinar
                            </span>
                            <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                                {fields.category}
                            </span>
                            {isFeatured && (
                                <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-medium rounded-full">
                                    Featured
                                </span>
                            )}
                            {isWebinarUpcoming && (
                                <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                                    {isRegistered ? 'Registered' : 'Registration Open'}
                                </span>
                            )}
                            <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full flex items-center gap-1">
                                <FiClock className="w-3 h-3" />
                                {fields.readTime || '60 minutes'}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {fields.title}
                        </h1>

                        <p className="text-xl text-gray-200 dark:text-gray-300 mb-8 max-w-3xl">
                            {fields.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-gray-200 dark:text-gray-300">
                            <div className="flex items-center gap-2">
                                <FiUser className="w-5 h-5" />
                                <span className="font-medium">{fields.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCalendar className="w-5 h-5" />
                                <span>{fields.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiClock className="w-5 h-5" />
                                <span>{fields.time || '2:00 PM EST'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiUsers className="w-5 h-5" />
                                <span>{registrationCount} registered</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration CTA */}
            <section className="py-8 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl">
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    {isWebinarUpcoming
                                        ? (isRegistered ? 'You Are Registered!' : 'Register for This Webinar')
                                        : 'Watch Recording'
                                    }
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {isWebinarUpcoming
                                        ? (isRegistered
                                            ? 'Your spot is confirmed. We will send you reminder emails with joining details.'
                                            : 'Register now to secure your spot and get access to the recording.'
                                        )
                                        : 'Access the full recording and presentation materials.'
                                    }
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => {
                                        if (isWebinarUpcoming) {
                                            setIsRegistered(!isRegistered);
                                            if (!isRegistered) {
                                                alert('Registration successful! Check your email for confirmation.');
                                            } else {
                                                alert('Registration cancelled.');
                                            }
                                        } else {
                                            // For recorded webinars, play the video
                                            alert('Playing webinar recording...');
                                        }
                                    }}
                                    className={`px-8 py-3 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${isRegistered
                                        ? 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                                        : 'bg-red-600 hover:bg-red-700 text-white'
                                        }`}
                                >
                                    {isWebinarUpcoming
                                        ? (isRegistered ? 'Cancel Registration' : 'Register Now')
                                        : 'Watch Recording'
                                    }
                                </button>
                                <button
                                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                                    className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <FiShare2 className="w-5 h-5" />
                                    Share
                                </button>
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
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                            {/* Video Player Area */}
                            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden mb-8">
                                <div className="aspect-video flex items-center justify-center p-8">
                                    <div className="text-center">
                                        <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                                            <FiVideo className="w-16 h-16 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {isWebinarUpcoming ? 'Live Webinar Starting Soon' : 'Webinar Recording'}
                                        </h3>
                                        <p className="text-gray-400 max-w-md mx-auto">
                                            {isWebinarUpcoming
                                                ? `Starts ${fields.date} at ${fields.time || '2:00 PM EST'}`
                                                : 'Click play to watch the recording'
                                            }
                                        </p>
                                    </div>
                                </div>

                                {!isWebinarUpcoming && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button
                                            onClick={() => alert('Playing webinar recording...')}
                                            className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transform hover:scale-110 transition-all"
                                        >
                                            <FiPlayCircle className="w-10 h-10 text-white" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <article className="prose prose-lg dark:prose-invert max-w-none">
                                <h2>About This Webinar</h2>
                                <p>
                                    {fields.title} brings together industry experts to discuss the latest trends,
                                    challenges, and opportunities in the field. This comprehensive webinar provides
                                    valuable insights and practical knowledge that you can immediately apply to your
                                    projects and organization.
                                </p>

                                <h3>What You'll Learn</h3>
                                <ul>
                                    <li>Latest industry trends and developments in the field</li>
                                    <li>Practical strategies and best practices for implementation</li>
                                    <li>Real-world case studies and success stories</li>
                                    <li>Interactive Q&A session with industry experts</li>
                                    <li>Networking opportunities with like-minded professionals</li>
                                    <li>Access to exclusive resources and presentation materials</li>
                                </ul>

                                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border-l-4 border-red-600 my-8">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                                        Key Takeaway
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Participants will gain actionable insights that can be immediately applied
                                        to their projects and organizations. You'll leave with practical knowledge
                                        and strategies that can drive real results in your work.
                                    </p>
                                </div>

                                <h3>Detailed Agenda</h3>
                                <ol className="space-y-4">
                                    {agenda.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                                {index + 1}
                                            </span>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-gray-100">{item}</h4>
                                                {webinar.content?.speaker && index === 0 && (
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        Presented by {webinar.content.speaker.name} ({webinar.content.speaker.role})
                                                    </p>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </article>

                            {/* Tags */}
                            {webinar.tags && webinar.tags.length > 0 && (
                                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                        <FiTag className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        Related Topics
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {webinar.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 py-6 border-t border-gray-200 dark:border-gray-800">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => {
                                            setIsLiked(!isLiked);
                                            if (!isLiked) {
                                                alert('Thanks for liking this webinar!');
                                            }
                                        }}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isLiked ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                    >
                                        <FiThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                                        <span>{isLiked ? 'Liked' : 'Like'}</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setIsBookmarked(!isBookmarked);
                                            if (!isBookmarked) {
                                                alert('Webinar bookmarked!');
                                            }
                                        }}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isBookmarked ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                    >
                                        <FiBookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                                        <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                                    </button>
                                </div>

                                <button
                                    onClick={() => alert('Question submission feature coming soon!')}
                                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <FiMessageCircle className="w-5 h-5" />
                                    Ask a Question
                                </button>
                            </div>
                        </div>

                        {/* Downloads */}
                        <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                                <FiDownload className="w-5 h-5 text-red-600 dark:text-red-400" />
                                Presentation Materials
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => alert('Downloading slide deck...')}
                                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-red-300 dark:hover:border-red-700 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded flex items-center justify-center">
                                            <FiDownload className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400">
                                                Slide Deck
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Complete presentation slides</p>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">PDF, 2.1MB</div>
                                </button>

                                <button
                                    onClick={() => alert('Downloading reference guide...')}
                                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-red-300 dark:hover:border-red-700 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded flex items-center justify-center">
                                            <FiBookOpen className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400">
                                                Reference Guide
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Detailed guide and resources</p>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">PDF, 1.4MB</div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Quick Info */}
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Webinar Details
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                                        <FiUsers className="w-4 h-4" />
                                        Registrations
                                    </h4>
                                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                                        {registrationCount}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Date</h4>
                                    <p className="text-gray-900 dark:text-gray-100">{fields.date}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Time</h4>
                                    <p className="text-gray-900 dark:text-gray-100">{fields.time || '2:00 PM EST'}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</h4>
                                    <p className="text-gray-900 dark:text-gray-100">{fields.readTime || '60 minutes'}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Format</h4>
                                    <p className="text-gray-900 dark:text-gray-100">
                                        {isWebinarUpcoming ? 'Live Online Webinar' : 'Recorded Session'}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Platform</h4>
                                    <p className="text-gray-900 dark:text-gray-100">Zoom Webinar</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Language</h4>
                                    <p className="text-gray-900 dark:text-gray-100">English with live captions</p>
                                </div>
                            </div>
                        </div>

                        {/* Related Webinars */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                {isWebinarUpcoming ? 'Upcoming Webinars' : 'Related Webinars'}
                            </h3>
                            <div className="space-y-4">
                                {relatedWebinars.length > 0 ? (
                                    relatedWebinars.map((relatedWebinar) => {
                                        const relatedFields = getTypeSpecificFields(relatedWebinar);
                                        return (
                                            <Link
                                                key={relatedWebinar.id}
                                                href={`/resources/webinars/${relatedWebinar.id}`}
                                                className="block group"
                                            >
                                                <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-red-300 dark:hover:border-red-700 transition-colors">
                                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-red-500 to-orange-500">
                                                        <FiVideo className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                                                            {relatedFields.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                            <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                                                                {relatedFields.category}
                                                            </span>
                                                            <span>•</span>
                                                            <span>{relatedFields.date || 'Coming soon'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                        No related webinars found.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-6 text-white">
                            <h3 className="text-xl font-bold mb-4">Host Your Webinar</h3>
                            <p className="text-red-100 mb-6">
                                Interested in hosting a webinar with us? Share your expertise with our community.
                            </p>
                            <Link
                                href="/contact"
                                className="block w-full text-center py-3 bg-white text-red-600 hover:bg-red-50 font-medium rounded-lg transition-colors"
                            >
                                Become a Speaker
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* More Webinars */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            More Webinars
                        </h2>
                        <Link
                            href="/resources/webinars"
                            className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold hover:gap-3 transition-all"
                        >
                            View all webinars
                            <FiChevronRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {getWebinars()
                            .filter(w => w && w.id !== webinar.id)
                            .slice(0, 3)
                            .map((webinarItem) => {
                                const itemFields = getTypeSpecificFields(webinarItem);
                                return (
                                    <Link
                                        key={webinarItem.id}
                                        href={`/resources/webinars/${webinarItem.id}`}
                                        className="group"
                                    >
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300 h-full flex flex-col">
                                            <div
                                                className="h-48 relative overflow-hidden"
                                                style={{
                                                    backgroundImage: `url(${webinarItem.bgImage || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070'})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                                {webinarItem.featured && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold rounded">
                                                            Featured
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium rounded">
                                                        {itemFields.category}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {itemFields.readTime || '60 minutes'}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                                                    {itemFields.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1 line-clamp-2">
                                                    {itemFields.description}
                                                </p>
                                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <FiCalendar className="w-3 h-3" />
                                                        {itemFields.date || 'Coming soon'}
                                                    </span>
                                                    <span>{itemFields.registrationCount || '0'} registered</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>
                </div>
            </section>
        </div>
    );
}