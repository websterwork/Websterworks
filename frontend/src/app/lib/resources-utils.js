// resources-utils.js
import data from './resources-data.json';

// Import icons
import {
    FiTrendingUp,
    FiClock,
    FiUsers,
    FiDollarSign,
    FiBarChart,
    FiTarget,
    FiCalendar,
    FiUser,
    FiFileText,
    FiDownload,
    FiTool,
    FiVideo,
    FiBook,
    FiCheck,
    FiCode,
    FiAlertTriangle,
    FiCopy,
    FiStar,
    FiGitBranch,
    FiShare2,
    FiMessageCircle,
    FiBookmark,
    FiHeart,
    FiEye,
    FiUsers as FiTeam,
    FiBriefcase,
    FiDollarSign as FiMoney,
    FiCalendar as FiTimeline
} from 'react-icons/fi';

// Icon mapping for resource types
export const typeIcons = {
    'whitepaper': FiFileText,
    'case-study': FiTrendingUp,
    'webinar': FiVideo,
    'tool': FiTool,
    'guide': FiBook,
    'blog': FiMessageCircle
};

// Icon mapping for metrics and stats
export const iconMap = {
    'trending-up': FiTrendingUp,
    'clock': FiClock,
    'users': FiUsers,
    'team': FiTeam,
    'dollar-sign': FiDollarSign,
    'money': FiMoney,
    'bar-chart': FiBarChart,
    'target': FiTarget,
    'calendar': FiCalendar,
    'timeline': FiTimeline,
    'user': FiUser,
    'briefcase': FiBriefcase,
    'heart': FiHeart,
    'eye': FiEye,
    'download': FiDownload,
    'check': FiCheck
};

// Type display names
export const typeDisplayNames = {
    'whitepaper': 'Whitepaper',
    'case-study': 'Case Study',
    'webinar': 'Webinar',
    'tool': 'Tool',
    'guide': 'Guide',
    'blog': 'Blog Post'
};

// Helper function to generate resource link
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

// Get all resources (with links)
export const getAllResources = () => {
    return data.resources.map(resource => ({
        ...resource,
        resourceType: resource.type, // Keep for compatibility
        link: getResourceLink(resource),
        // Add calculated fields
        displayType: typeDisplayNames[resource.type] || resource.type,
        typeIcon: typeIcons[resource.type] || FiFileText
    }));
};

// Get specific resource types
export const getResourcesByType = (type) => {
    return getAllResources().filter(r => r.type === type);
};

// Get specific resource types (legacy functions for backward compatibility)
export const getWhitepapers = () => getResourcesByType('whitepaper');
export const getCaseStudies = () => getResourcesByType('case-study');
export const getWebinars = () => getResourcesByType('webinar');
export const getTools = () => getResourcesByType('tool');
export const getGuides = () => getResourcesByType('guide');
export const getBlogPosts = () => getResourcesByType('blog');

// Get single resource by ID (works with any type!)
export const getResource = (id) => {
    const resource = getAllResources().find(r => r.id === id);
    if (resource) {
        return {
            ...resource,
            // Add type-specific default values for consistent access
            views: resource.views || 0,
            likes: resource.likes || 0,
            downloadCount: resource.downloadCount || '0',
            registrationCount: resource.registrationCount || '0',
            timeline: resource.timeline || 'N/A',
            budget: resource.budget || 'N/A',
            teamSize: resource.teamSize || 'N/A',
            client: resource.client || 'N/A',
            metrics: resource.metrics || [],
            time: resource.time || ''
        };
    }
    return null;
};

// Get single resource by type and ID (for backward compatibility)
export const getWhitepaper = (id) => getResource(id);
export const getCaseStudy = (id) => getResource(id);
export const getWebinar = (id) => getResource(id);
export const getTool = (id) => getResource(id);
export const getGuide = (id) => getResource(id);
export const getBlogPost = (id) => getResource(id);

// Get resource by ID and type (generic version)
export const getResourceById = (type, id) => {
    return getAllResources().find(r => r.id === id && r.type === type);
};

// Get featured resources
export const getFeaturedResources = () => {
    return getAllResources().filter(resource => resource.featured === true);
};

// Get premium resources
export const getPremiumResources = () => {
    return getAllResources().filter(resource => resource.premium === true);
};

// Get related resources
export const getRelatedResources = (currentResource, count = 3) => {
    if (!currentResource) return [];

    const allResources = getAllResources();

    // Find related resources by category OR type
    const related = allResources.filter(resource => {
        if (resource.id === currentResource.id) return false;

        // Same category is best
        if (resource.category === currentResource.category) return true;

        // Same type is second best
        if (resource.type === currentResource.type) return true;

        // Similar tags
        const currentTags = currentResource.tags || [];
        const resourceTags = resource.tags || [];
        const commonTags = currentTags.filter(tag => resourceTags.includes(tag));
        return commonTags.length > 0;
    });

    // Sort by relevance and limit count
    return related
        .sort((a, b) => {
            // Prioritize same category
            if (a.category === currentResource.category && b.category !== currentResource.category) return -1;
            if (a.category !== currentResource.category && b.category === currentResource.category) return 1;

            // Then prioritize same type
            if (a.type === currentResource.type && b.type !== currentResource.type) return -1;
            if (a.type !== currentResource.type && b.type === currentResource.type) return 1;

            return 0;
        })
        .slice(0, count);
};

// Get resources by category
export const getResourcesByCategory = (category) => {
    if (category === 'all') return getAllResources();
    return getAllResources().filter(resource => resource.category === category);
};

// Get resources by industry (for case studies)
export const getResourcesByIndustry = (industry) => {
    return getAllResources()
        .filter(resource => resource.type === 'case-study' && resource.industry === industry);
};

// Get resources by tag
export const getResourcesByTag = (tag) => {
    return getAllResources().filter(resource =>
        resource.tags && resource.tags.includes(tag)
    );
};

// Get trending topics from tags
export const getTrendingTopics = () => {
    const allResources = getAllResources();
    const allTags = allResources
        .flatMap(resource => resource.tags || [])
        .filter(Boolean);

    // Count tag occurrences
    const tagCounts = allTags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {});

    // Convert to array and sort by count
    return Object.entries(tagCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // Top 10 trending topics
};

// Get resource statistics
export const getResourceStats = () => {
    const allResources = getAllResources();
    const stats = {
        total: allResources.length,
        whitepapers: getWhitepapers().length,
        caseStudies: getCaseStudies().length,
        webinars: getWebinars().length,
        tools: getTools().length,
        guides: getGuides().length,
        blogPosts: getBlogPosts().length,
        featured: getFeaturedResources().length,
        premium: getPremiumResources().length,
        categories: [...new Set(allResources.map(r => r.category))].length,
        industries: [...new Set(getCaseStudies().map(cs => cs.industry))].length,
        tags: [...new Set(allResources.flatMap(r => r.tags || []))].length
    };

    return stats;
};

// Search resources
export const searchResources = (query) => {
    if (!query || query.trim() === '') return getAllResources();

    const searchTerm = query.toLowerCase().trim();
    return getAllResources().filter(resource => {
        return (
            (resource.title && resource.title.toLowerCase().includes(searchTerm)) ||
            (resource.description && resource.description.toLowerCase().includes(searchTerm)) ||
            (resource.author && resource.author.toLowerCase().includes(searchTerm)) ||
            (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
            (resource.category && resource.category.toLowerCase().includes(searchTerm)) ||
            (resource.industry && resource.industry.toLowerCase().includes(searchTerm)) ||
            (resource.content && JSON.stringify(resource.content).toLowerCase().includes(searchTerm))
        );
    });
};

// Get popular resources (by views, likes, downloads, registrations)
export const getPopularResources = (limit = 6) => {
    return getAllResources()
        .sort((a, b) => {
            // Calculate popularity score with type-specific metrics
            const getPopularityScore = (resource) => {
                let score = 0;

                // Blog specific
                score += (resource.views || 0) * 1;
                score += (resource.likes || 0) * 2;

                // Whitepaper and tool specific
                if (resource.downloadCount) {
                    const downloads = parseInt(resource.downloadCount.replace('k', '000')) || 0;
                    score += downloads * 3;
                }

                // Webinar specific
                if (resource.registrationCount) {
                    const registrations = parseInt(resource.registrationCount.replace(',', '')) || 0;
                    score += registrations * 2;
                }

                // Case study specific (use metrics count as engagement indicator)
                if (resource.metrics) {
                    score += resource.metrics.length * 10;
                }

                // Featured and premium get bonus points
                if (resource.featured) score += 50;
                if (resource.premium) score += 30;

                return score;
            };

            const scoreA = getPopularityScore(a);
            const scoreB = getPopularityScore(b);
            return scoreB - scoreA;
        })
        .slice(0, limit);
};

// Get latest resources
export const getLatestResources = (limit = 6) => {
    return getAllResources()
        .sort((a, b) => {
            // Parse dates for comparison
            const parseDate = (dateStr) => {
                if (!dateStr) return new Date(0);
                // Try to parse various date formats
                const date = new Date(dateStr);
                return isNaN(date.getTime()) ? new Date(0) : date;
            };

            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateB - dateA;
        })
        .slice(0, limit);
};

// Get resources by author
export const getResourcesByAuthor = (authorName) => {
    return getAllResources().filter(resource =>
        resource.author && resource.author.toLowerCase().includes(authorName.toLowerCase())
    );
};

// Get unique categories
export const getUniqueCategories = () => {
    const categories = getAllResources()
        .map(resource => resource.category)
        .filter(Boolean);

    return [...new Set(categories)].sort();
};

// Get unique industries (for case studies)
export const getUniqueIndustries = () => {
    const industries = getAllResources()
        .filter(resource => resource.type === 'case-study')
        .map(resource => resource.industry)
        .filter(Boolean);

    return [...new Set(industries)].sort();
};

// Get unique tags
export const getUniqueTags = () => {
    const tags = getAllResources()
        .flatMap(resource => resource.tags || [])
        .filter(Boolean);

    return [...new Set(tags)].sort();
};

// Get resource type statistics
export const getResourceTypeStats = () => {
    const allResources = getAllResources();
    const typeStats = {};

    allResources.forEach(resource => {
        const type = resource.type;
        if (!typeStats[type]) {
            typeStats[type] = {
                count: 0,
                displayName: typeDisplayNames[type] || type,
                icon: typeIcons[type] || FiFileText
            };
        }
        typeStats[type].count++;
    });

    return typeStats;
};

// Get type-specific fields for display
export const getTypeSpecificFields = (resource) => {
    const baseFields = {
        title: resource.title,
        description: resource.description,
        category: resource.category,
        author: resource.author,
        date: resource.date,
        readTime: resource.readTime,
        tags: resource.tags || []
    };

    switch (resource.type) {
        case 'blog':
            return {
                ...baseFields,
                views: resource.views || 0,
                likes: resource.likes || 0,
                icon: FiMessageCircle
            };
        case 'case-study':
            return {
                ...baseFields,
                industry: resource.industry,
                timeline: resource.timeline,
                budget: resource.budget,
                teamSize: resource.teamSize,
                client: resource.client,
                metrics: resource.metrics || [],
                icon: FiTrendingUp
            };
        case 'whitepaper':
            return {
                ...baseFields,
                downloadCount: resource.downloadCount,
                icon: FiFileText
            };
        case 'webinar':
            return {
                ...baseFields,
                time: resource.time,
                registrationCount: resource.registrationCount,
                icon: FiVideo
            };
        case 'tool':
            return {
                ...baseFields,
                downloadCount: resource.downloadCount,
                icon: FiTool
            };
        case 'guide':
            return {
                ...baseFields,
                icon: FiBook
            };
        default:
            return {
                ...baseFields,
                icon: FiFileText
            };
    }
};

// Format metrics for case studies
export const formatCaseStudyMetrics = (metrics = []) => {
    return metrics.map(metric => {
        // Extract numeric value and label
        const match = metric.match(/([\d.,%$Mk]+)\s*(.+)/);
        if (match) {
            const [_, value, label] = match;
            return { value, label: label.trim() };
        }
        return { value: '', label: metric };
    });
};

// Parse numeric values from strings
export const parseNumericValue = (str) => {
    if (!str) return 0;
    if (typeof str === 'number') return str;

    // Remove currency symbols, commas, and other non-numeric characters except decimal points
    const cleaned = str.toString()
        .replace(/[$,%kM]/g, '')
        .replace(/,/g, '');

    // Handle k (thousands) and M (millions) multipliers
    let multiplier = 1;
    if (str.includes('k')) multiplier = 1000;
    if (str.includes('M')) multiplier = 1000000;

    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num * multiplier;
};