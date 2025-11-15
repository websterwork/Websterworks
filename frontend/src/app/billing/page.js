"use client";

import { withProtectedRoute } from "@/components/ProtectedRoute";
import Link from "next/link";

function BillingPage ()
{
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */ }
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Billing & Plans
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Manage your subscription and payment methods
                    </p>
                </div>

                {/* Current Plan */ }
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Current Plan
                    </h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                Free Plan
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                You are currently on the Free plan
                            </p>
                        </div>
                        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                            Upgrade Plan
                        </button>
                    </div>
                </div>

                {/* Available Plans */ }
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Available Plans
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Free Plan */ }
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-2 border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                Free
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">$0/month</p>
                            <ul className="space-y-2 mb-6">
                                <li className="text-gray-700 dark:text-gray-300">
                                    ✓ 5 projects
                                </li>
                                <li className="text-gray-700 dark:text-gray-300">
                                    ✓ Basic support
                                </li>
                                <li className="text-gray-700 dark:text-gray-300">
                                    ✓ 1 GB storage
                                </li>
                            </ul>
                            <button className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                                Current Plan
                            </button>
                        </div>

                        {/* Pro Plan */ }
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-2 border-purple-600">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Pro
                                </h3>
                                <span className="text-xs font-bold text-white bg-purple-600 px-3 py-1 rounded-full">
                                    POPULAR
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">$29/month</p>
                            <ul className="space-y-2 mb-6">
                                <li className="text-gray-700 dark:text-gray-300">
                                    ✓ Unlimited projects
                                </li>
                                <li className="text-gray-700 dark:text-gray-300">
                                    ✓ Priority support
                                </li>
                                <li className="text-gray-700 dark:text-gray-300">
                                    ✓ 100 GB storage
                                </li>
                            </ul>
                            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                                Upgrade to Pro
                            </button>
                        </div>

                        {/* Enterprise Plan */ }
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-2 border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                Enterprise
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Custom</p>
                            <ul className="space-y-2 mb-6">
                                <li className="text-gray-700 dark:text-gray-300">
                                    ✓ Everything in Pro
                                </li>
                                <li className="text-gray-700 dark:text-gray-300">
                                    ✓ Dedicated support
                                </li>
                                <li className="text-gray-700 dark:text-gray-300">
                                    ✓ Unlimited storage
                                </li>
                            </ul>
                            <button className="w-full px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */ }
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Payment Methods
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        No payment methods added yet
                    </p>
                    <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                        Add Payment Method
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <Link
                        href="/profile"
                        className="text-purple-600 dark:text-purple-400 hover:underline"
                    >
                        Back to Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default withProtectedRoute( BillingPage );
