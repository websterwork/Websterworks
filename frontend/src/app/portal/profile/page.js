"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { withProtectedRoute } from "@/components/ProtectedRoute";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiUser, FiMail, FiCalendar, FiMapPin, FiBriefcase,
    FiSettings, FiLogOut, FiCreditCard, FiUsers, FiFolder,
    FiBarChart2, FiBell, FiShield, FiEdit2, FiCamera,
    FiChevronRight, FiHome, FiActivity, FiClock, FiCheckCircle,
    FiXCircle, FiTrendingUp, FiAward, FiStar, FiX,
    FiSave, FiUpload, FiGlobe, FiGithub, FiTwitter, FiLinkedin
} from "react-icons/fi";

function ProfilePage() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState("overview");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditingAvatar, setIsEditingAvatar] = useState(false);

    // Edit form state
    const [editForm, setEditForm] = useState({
        name: user?.name || "",
        username: user?.username || "",
        email: user?.email || "",
        bio: user?.bio || "Building the future with Websterwork",
        location: user?.location || "San Francisco, CA",
        company: user?.company || "Websterwork",
        website: user?.website || "https://websterwork.com",
        github: user?.github || "github.com/username",
        twitter: user?.twitter || "twitter.com/username",
        linkedin: user?.linkedin || "linkedin.com/in/username"
    });

    // Mock data - replace with real data from your API
    const stats = {
        ongoing: 5,
        completed: 12,
        pending: 3,
        discarded: 1,
        totalProjects: 21,
        teamMembers: 8,
        billingStatus: "Active",
        memberSince: user?.createdAt || "2024-01-15"
    };

    const recentActivity = [
        { id: 1, action: "Project deployed", project: "E-commerce Platform", time: "2 hours ago", status: "success" },
        { id: 2, action: "Team member added", project: "Mobile App", time: "1 day ago", status: "success" },
        { id: 3, action: "Review pending", project: "Dashboard Redesign", time: "2 days ago", status: "pending" },
        { id: 4, action: "Payment processed", project: "Billing", time: "3 days ago", status: "success" },
    ];

    const sidebarItems = [
        { id: "overview", label: "Overview", icon: FiHome, href: "/portal/profile" },
        { id: "projects", label: "Projects", icon: FiFolder, href: "/projects", count: stats.totalProjects },
        { id: "team", label: "Team", icon: FiUsers, href: "/team", count: stats.teamMembers },
        { id: "billing", label: "Billing", icon: FiCreditCard, href: "/billing", badge: stats.billingStatus },
        { id: "analytics", label: "Analytics", icon: FiBarChart2, href: "/analytics" },
        { id: "notifications", label: "Notifications", icon: FiBell, href: "/notifications", count: 3 },
        { id: "security", label: "Security", icon: FiShield, href: "/security" },
        { id: "settings", label: "Settings", icon: FiSettings, href: "/settings" },
    ];

    const projectStats = [
        { label: "Ongoing", value: stats.ongoing, icon: FiClock, color: "blue", bg: "from-blue-500 to-blue-600" },
        { label: "Completed", value: stats.completed, icon: FiCheckCircle, color: "green", bg: "from-green-500 to-green-600" },
        { label: "Pending", value: stats.pending, icon: FiActivity, color: "yellow", bg: "from-yellow-500 to-yellow-600" },
        { label: "Discarded", value: stats.discarded, icon: FiXCircle, color: "red", bg: "from-red-500 to-red-600" },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = () => {
        // Here you would call your API to update the user profile
        console.log("Saving profile:", editForm);
        setIsEditModalOpen(false);
    };

    const handleAvatarUpload = (e) => {
        // Here you would handle avatar upload
        console.log("Uploading avatar:", e.target.files[0]);
        setIsEditingAvatar(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="max-w-7xl mx-auto">

                    {/* Welcome Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                {user?.name || user?.username || "Developer"}
                            </span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Here's what's happening with your projects today.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar - Left Column */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden sticky top-24">

                                {/* Profile Card - Clickable to Edit */}
                                <div
                                    className="p-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 cursor-pointer group relative"
                                    onClick={() => setIsEditModalOpen(true)}
                                >
                                    {/* Edit Overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-t-2xl">
                                        <div className="flex flex-col items-center text-white">
                                            <FiEdit2 className="w-6 h-6 mb-2" />
                                            <span className="text-sm font-medium">Edit Profile</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center text-center relative">
                                        {/* Avatar */}
                                        <div className="relative mb-4">
                                            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl border-4 border-white/50 flex items-center justify-center">
                                                {user?.avatar ? (
                                                    <Image
                                                        src={user.avatar}
                                                        alt="Profile"
                                                        width={96}
                                                        height={96}
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-3xl font-bold text-white">
                                                        {user?.name?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || "U"}
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsEditingAvatar(true);
                                                }}
                                            >
                                                <FiCamera className="w-4 h-4 text-gray-700" />
                                            </button>
                                        </div>

                                        {/* User Info */}
                                        <h2 className="text-xl font-bold text-white mb-1">
                                            {user?.name || user?.username || "User Name"}
                                        </h2>
                                        <p className="text-sm text-white/80 mb-3">
                                            {user?.email || "user@example.com"}
                                        </p>
                                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30">
                                            Pro Member
                                        </span>
                                    </div>
                                </div>

                                {/* Navigation Menu */}
                                <nav className="p-4">
                                    <ul className="space-y-1">
                                        {sidebarItems.map((item) => {
                                            const Icon = item.icon;
                                            const isActive = activeTab === item.id;
                                            return (
                                                <li key={item.id}>
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setActiveTab(item.id)}
                                                        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isActive
                                                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400'
                                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                                                            <span className="font-medium">{item.label}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {item.count && (
                                                                <span className={`px-2 py-0.5 text-xs rounded-full ${isActive
                                                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                                                    }`}>
                                                                    {item.count}
                                                                </span>
                                                            )}
                                                            {item.badge && (
                                                                <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                                                                    {item.badge}
                                                                </span>
                                                            )}
                                                            <FiChevronRight className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                                                                }`} />
                                                        </div>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    {/* Logout Button */}
                                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                                        <button
                                            onClick={logout}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all group"
                                        >
                                            <FiLogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            <span className="font-medium">Sign out</span>
                                        </button>
                                    </div>
                                </nav>
                            </div>
                        </div>

                        {/* Main Content - Right Column */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {projectStats.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.bg} flex items-center justify-center`}>
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                                    {stat.value}
                                                </span>
                                            </div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                {stat.label}
                                            </p>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Quick Actions
                                    </h2>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        Last active: Today 10:24 AM
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { label: "New Project", icon: FiFolder, href: "/projects/new", color: "blue" },
                                        { label: "Invite Team", icon: FiUsers, href: "/team/invite", color: "purple" },
                                        { label: "View Billing", icon: FiCreditCard, href: "/billing", color: "green" },
                                        { label: "Settings", icon: FiSettings, href: "/settings", color: "gray" },
                                    ].map((action) => {
                                        const Icon = action.icon;
                                        return (
                                            <Link
                                                key={action.label}
                                                href={action.href}
                                                className="flex flex-col items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                            >
                                                <div className={`w-10 h-10 rounded-lg bg-${action.color}-100 dark:bg-${action.color}-900/30 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                    <Icon className={`w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`} />
                                                </div>
                                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                    {action.label}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Recent Activity
                                    </h2>
                                    <Link href="/activity" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                                        View all
                                        <FiChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {recentActivity.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                                                    }`} />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {activity.action}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {activity.project} • {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                            <FiChevronRight className="w-4 h-4 text-gray-400" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Projects Overview */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Active Projects
                                    </h2>
                                    <Link href="/projects" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                                        View all projects
                                        <FiChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                                    <FiBriefcase className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-900 dark:text-white">
                                                        E-commerce Platform
                                                    </h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Last updated 2 hours ago
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                                                    In Progress
                                                </span>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                    75%
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsEditModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.3 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Edit Profile
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Update your personal information and public profile
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <FiX className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-6">
                                {/* Avatar Upload Section */}
                                <div className="flex items-center gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                            {user?.avatar ? (
                                                <Image
                                                    src={user.avatar}
                                                    alt="Profile"
                                                    width={80}
                                                    height={80}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-2xl font-bold text-white">
                                                    {editForm.name?.[0]?.toUpperCase() || editForm.username?.[0]?.toUpperCase() || "U"}
                                                </span>
                                            )}
                                        </div>
                                        <label
                                            htmlFor="avatar-upload"
                                            className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer shadow-lg transition-colors"
                                        >
                                            <FiUpload className="w-4 h-4" />
                                        </label>
                                        <input
                                            id="avatar-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarUpload}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">
                                            Profile Photo
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            JPG, GIF or PNG. Max size 2MB.
                                        </p>
                                    </div>
                                </div>

                                {/* Form Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Full Name
                                        </label>
                                        <div className="relative group">
                                            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={editForm.name}
                                                onChange={handleInputChange}
                                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-gray-900 dark:text-white"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

                                    {/* Username */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Username
                                        </label>
                                        <div className="relative group">
                                            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                            <input
                                                type="text"
                                                name="username"
                                                value={editForm.username}
                                                onChange={handleInputChange}
                                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-gray-900 dark:text-white"
                                                placeholder="johndoe"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Email Address
                                        </label>
                                        <div className="relative group">
                                            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={editForm.email}
                                                onChange={handleInputChange}
                                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-gray-900 dark:text-white"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Bio
                                        </label>
                                        <textarea
                                            name="bio"
                                            value={editForm.bio}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-gray-900 dark:text-white resize-none"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>

                                    {/* Location */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Location
                                        </label>
                                        <div className="relative group">
                                            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                            <input
                                                type="text"
                                                name="location"
                                                value={editForm.location}
                                                onChange={handleInputChange}
                                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-gray-900 dark:text-white"
                                                placeholder="San Francisco, CA"
                                            />
                                        </div>
                                    </div>

                                    {/* Company */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Company
                                        </label>
                                        <div className="relative group">
                                            <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                            <input
                                                type="text"
                                                name="company"
                                                value={editForm.company}
                                                onChange={handleInputChange}
                                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-gray-900 dark:text-white"
                                                placeholder="Websterwork"
                                            />
                                        </div>
                                    </div>

                                    {/* Website */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Website
                                        </label>
                                        <div className="relative group">
                                            <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                            <input
                                                type="url"
                                                name="website"
                                                value={editForm.website}
                                                onChange={handleInputChange}
                                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-gray-900 dark:text-white"
                                                placeholder="https://websterwork.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Social Links Section */}
                                    <div className="md:col-span-2 mt-2">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                                            Social Profiles
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* GitHub */}
                                            <div className="space-y-2">
                                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    GitHub
                                                </label>
                                                <div className="relative group">
                                                    <FiGithub className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                                    <input
                                                        type="text"
                                                        name="github"
                                                        value={editForm.github}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-gray-900 dark:text-white text-sm"
                                                        placeholder="github.com/username"
                                                    />
                                                </div>
                                            </div>

                                            {/* Twitter */}
                                            <div className="space-y-2">
                                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    Twitter
                                                </label>
                                                <div className="relative group">
                                                    <FiTwitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                                    <input
                                                        type="text"
                                                        name="twitter"
                                                        value={editForm.twitter}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-gray-900 dark:text-white text-sm"
                                                        placeholder="twitter.com/username"
                                                    />
                                                </div>
                                            </div>

                                            {/* LinkedIn */}
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    LinkedIn
                                                </label>
                                                <div className="relative group">
                                                    <FiLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                                    <input
                                                        type="text"
                                                        name="linkedin"
                                                        value={editForm.linkedin}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-gray-900 dark:text-white text-sm"
                                                        placeholder="linkedin.com/in/username"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveProfile}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2"
                                >
                                    <FiSave className="w-4 h-4" />
                                    Save Changes
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Avatar Edit Modal */}
            <AnimatePresence>
                {isEditingAvatar && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsEditingAvatar(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Update Profile Photo
                                </h3>
                                <button
                                    onClick={() => setIsEditingAvatar(false)}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <FiX className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                                    <FiUpload className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Upload new photo
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatarUpload}
                                    />
                                </label>
                                {user?.avatar && (
                                    <button className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 w-full transition-colors">
                                        <FiXCircle className="w-5 h-5 text-red-600" />
                                        <span className="text-sm font-medium text-red-600 dark:text-red-400">
                                            Remove current photo
                                        </span>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default withProtectedRoute(ProfilePage);