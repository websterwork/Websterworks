"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { withProtectedRoute } from "@/components/ProtectedRoute";
import Link from "next/link";

function StatsPage ()
{
    const { user } = useAuth();
    const [ filterStatus, setFilterStatus ] = useState( "all" );

    // Mock project data
    const mockProjects = {
        ongoing: [
            { id: 1, name: "Website Redesign", client: "Tech Corp", progress: 65, dueDate: "2025-12-15" },
            { id: 2, name: "Mobile App Dev", client: "StartUp Inc", progress: 45, dueDate: "2026-01-10" },
            { id: 3, name: "Cloud Migration", client: "Enterprise Ltd", progress: 80, dueDate: "2025-12-01" },
            { id: 4, name: "API Integration", client: "FinTech Co", progress: 30, dueDate: "2025-12-20" },
            { id: 5, name: "Dashboard UI", client: "Analytics Pro", progress: 50, dueDate: "2026-01-05" },
        ],
        completed: [
            { id: 6, name: "Landing Page", client: "Fashion Brand", completedDate: "2025-11-10" },
            { id: 7, name: "Email Campaign", client: "Marketing Hub", completedDate: "2025-11-05" },
            { id: 8, name: "Database Optimization", client: "Data Systems", completedDate: "2025-10-28" },
            { id: 9, name: "Security Audit", client: "Bank Corp", completedDate: "2025-10-15" },
            { id: 10, name: "Content Migration", client: "Media Group", completedDate: "2025-10-10" },
            { id: 11, name: "Performance Testing", client: "Gaming Studio", completedDate: "2025-09-30" },
            { id: 12, name: "User Research", client: "SaaS Platform", completedDate: "2025-09-20" },
        ],
        pending: [
            { id: 13, name: "Strategy Planning", client: "Consulting Firm", startDate: "2025-12-10" },
            { id: 14, name: "Budget Review", client: "Non-Profit Org", startDate: "2025-12-08" },
            { id: 15, name: "Team Training", client: "Tech Academy", startDate: "2025-12-15" },
        ],
        discarded: [
            { id: 16, name: "Legacy System Overhaul", client: "Old Corp", reason: "Budget constraints" },
        ],
    };

    const stats = [
        {
            label: "Ongoing",
            count: mockProjects.ongoing.length,
            icon: "🚀",
            color: "blue",
            bgGradient: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30",
            borderColor: "border-blue-200 dark:border-blue-800",
            textColor: "text-blue-600 dark:text-blue-400",
            countColor: "text-blue-900 dark:text-blue-100",
        },
        {
            label: "Completed",
            count: mockProjects.completed.length,
            icon: "✅",
            color: "green",
            bgGradient: "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30",
            borderColor: "border-green-200 dark:border-green-800",
            textColor: "text-green-600 dark:text-green-400",
            countColor: "text-green-900 dark:text-green-100",
        },
        {
            label: "Pending",
            count: mockProjects.pending.length,
            icon: "⏳",
            color: "yellow",
            bgGradient: "from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30",
            borderColor: "border-yellow-200 dark:border-yellow-800",
            textColor: "text-yellow-600 dark:text-yellow-400",
            countColor: "text-yellow-900 dark:text-yellow-100",
        },
        {
            label: "Discarded",
            count: mockProjects.discarded.length,
            icon: "🗑️",
            color: "red",
            bgGradient: "from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30",
            borderColor: "border-red-200 dark:border-red-800",
            textColor: "text-red-600 dark:text-red-400",
            countColor: "text-red-900 dark:text-red-100",
        },
    ];

    const getFilteredProjects = () =>
    {
        if ( filterStatus === "all" )
        {
            return [
                ...mockProjects.ongoing.map( ( p ) => ( { ...p, status: "ongoing" } ) ),
                ...mockProjects.completed.map( ( p ) => ( { ...p, status: "completed" } ) ),
                ...mockProjects.pending.map( ( p ) => ( { ...p, status: "pending" } ) ),
                ...mockProjects.discarded.map( ( p ) => ( { ...p, status: "discarded" } ) ),
            ];
        }
        return mockProjects[ filterStatus ].map( ( p ) => ( { ...p, status: filterStatus } ) );
    };

    const getStatusBadge = ( status ) =>
    {
        const badges = {
            ongoing: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
            completed: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
            pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
            discarded: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
        };
        return badges[ status ] || badges.ongoing;
    };

    const getStatusIcon = ( status ) =>
    {
        const icons = {
            ongoing: "🚀",
            completed: "✅",
            pending: "⏳",
            discarded: "🗑️",
        };
        return icons[ status ] || "📋";
    };

    const filteredProjects = getFilteredProjects();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */ }
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Projects Statistics
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Track your project progress across all statuses
                    </p>
                </div>

                {/* Stats Overview Cards */ }
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    { stats.map( ( stat ) => (
                        <button
                            key={ stat.label }
                            onClick={ () => setFilterStatus( stat.label.toLowerCase() ) }
                            className={ `bg-gradient-to-br ${ stat.bgGradient } rounded-lg p-6 border ${ stat.borderColor } cursor-pointer transition hover:shadow-lg ${ filterStatus === stat.label.toLowerCase()
                                    ? "ring-2 ring-offset-2 dark:ring-offset-gray-900 ring-" + stat.color + "-400"
                                    : ""
                                }` }
                        >
                            <div className="flex items-center justify-between">
                                <div className="text-left">
                                    <p className={ `text-sm font-medium ${ stat.textColor }` }>
                                        { stat.label }
                                    </p>
                                    <p className={ `text-3xl font-bold ${ stat.countColor } mt-2` }>
                                        { stat.count }
                                    </p>
                                </div>
                                <span className="text-4xl">{ stat.icon }</span>
                            </div>
                        </button>
                    ) ) }
                </div>

                {/* Filter Controls */ }
                <div className="mb-8 flex items-center gap-4 flex-wrap">
                    <button
                        onClick={ () => setFilterStatus( "all" ) }
                        className={ `px-4 py-2 rounded-lg font-medium transition ${ filterStatus === "all"
                                ? "bg-purple-600 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }` }
                    >
                        All Projects
                    </button>
                    { stats.map( ( stat ) => (
                        <button
                            key={ stat.label }
                            onClick={ () => setFilterStatus( stat.label.toLowerCase() ) }
                            className={ `px-4 py-2 rounded-lg font-medium transition ${ filterStatus === stat.label.toLowerCase()
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }` }
                        >
                            { stat.label } ({ stat.count })
                        </button>
                    ) ) }
                </div>

                {/* Projects List */ }
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Project Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Client
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                { filteredProjects.map( ( project ) => (
                                    <tr key={ project.id } className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                                            { project.name }
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            { project.client }
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={ `inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${ getStatusBadge(
                                                    project.status
                                                ) }` }
                                            >
                                                <span>{ getStatusIcon( project.status ) }</span>
                                                { project.status.charAt( 0 ).toUpperCase() + project.status.slice( 1 ) }
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            { project.status === "ongoing" && (
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-medium">
                                                            Progress: { project.progress }%
                                                        </span>
                                                    </div>
                                                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                                                            style={ { width: `${ project.progress }%` } }
                                                        />
                                                    </div>
                                                    <p className="text-xs mt-1">
                                                        Due: { new Date( project.dueDate ).toLocaleDateString() }
                                                    </p>
                                                </div>
                                            ) }
                                            { project.status === "completed" && (
                                                <p className="text-xs">
                                                    ✓ { new Date( project.completedDate ).toLocaleDateString() }
                                                </p>
                                            ) }
                                            { project.status === "pending" && (
                                                <p className="text-xs">
                                                    Starts: { new Date( project.startDate ).toLocaleDateString() }
                                                </p>
                                            ) }
                                            { project.status === "discarded" && (
                                                <p className="text-xs">Reason: { project.reason }</p>
                                            ) }
                                        </td>
                                    </tr>
                                ) ) }
                            </tbody>
                        </table>
                    </div>

                    { filteredProjects.length === 0 && (
                        <div className="py-12 text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                                No projects found in this category.
                            </p>
                        </div>
                    ) }
                </div>

                {/* Back to Profile Link */ }
                <div className="mt-8">
                    <Link
                        href="/profile"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        ← Back to Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default withProtectedRoute( StatsPage );
