"use client";

import { useAuth } from "@/contexts/AuthContext";
import { withProtectedRoute } from "@/components/ProtectedRoute";
import Link from "next/link";

function ProfilePage ()
{
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */ }
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        My Profile
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Manage your account settings and preferences
                    </p>
                </div>

                {/* Profile Card */ }
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Account Information
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Username
                                    </label>
                                    <p className="text-lg text-gray-900 dark:text-white">
                                        { user?.username || "Not set" }
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email
                                    </label>
                                    <p className="text-lg text-gray-900 dark:text-white">
                                        { user?.email || "Not set" }
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Member Since
                                    </label>
                                    <p className="text-lg text-gray-900 dark:text-white">
                                        { user?.createdAt
                                            ? new Date( user.createdAt ).toLocaleDateString()
                                            : "N/A" }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Avatar Display */ }
                        { user?.avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={ user.avatar }
                                alt="User avatar"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">
                                    { user?.name?.[ 0 ]?.toUpperCase() || "U" }
                                </span>
                            </div>
                        ) }
                    </div>

                    {/* Projects Overview */ }
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Projects Overview
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                            Ongoing
                                        </p>
                                        <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-2">
                                            5
                                        </p>
                                    </div>
                                    <span className="text-4xl">🚀</span>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-6 border border-green-200 dark:border-green-800">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                            Completed
                                        </p>
                                        <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-2">
                                            12
                                        </p>
                                    </div>
                                    <span className="text-4xl">✅</span>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                                            Pending
                                        </p>
                                        <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100 mt-2">
                                            3
                                        </p>
                                    </div>
                                    <span className="text-4xl">⏳</span>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-lg p-6 border border-red-200 dark:border-red-800">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-red-600 dark:text-red-400">
                                            Discarded
                                        </p>
                                        <p className="text-3xl font-bold text-red-900 dark:text-red-100 mt-2">
                                            1
                                        </p>
                                    </div>
                                    <span className="text-4xl">🗑️</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */ }
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <Link
                            href="/billing"
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                        >
                            <span className="font-medium text-gray-700 dark:text-gray-200">
                                Billing
                            </span>
                            <span className="text-gray-400">→</span>
                        </Link>
                        <Link
                            href="/team"
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                        >
                            <span className="font-medium text-gray-700 dark:text-gray-200">
                                Team Meet
                            </span>
                            <span className="text-gray-400">→</span>
                        </Link>
                        <Link
                            href="/stats"
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                        >
                            <span className="font-medium text-gray-700 dark:text-gray-200">
                                Full Stats
                            </span>
                            <span className="text-gray-400">→</span>
                        </Link>
                    </div>
                </div>                {/* Settings Section */ }
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Settings
                    </h2>
                    <div className="space-y-4">
                        <button className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                            <span className="font-medium text-gray-900 dark:text-white">
                                Change Password
                            </span>
                        </button>
                        <button className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                            <span className="font-medium text-gray-900 dark:text-white">
                                Two-Factor Authentication
                            </span>
                        </button>
                        <button className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                            <span className="font-medium text-gray-900 dark:text-white">
                                Notifications
                            </span>
                        </button>
                        <button
                            onClick={ logout }
                            className="w-full px-4 py-3 bg-red-50 dark:bg-red-900/20 text-left rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition"
                        >
                            <span className="font-medium text-red-600 dark:text-red-400">
                                Sign Out
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withProtectedRoute( ProfilePage );
