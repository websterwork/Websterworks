"use client";

import { withProtectedRoute } from "@/components/ProtectedRoute";
import Link from "next/link";

function TeamPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Team Meet
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Connect and collaborate with your team
          </p>
        </div>

        {/* Meeting Room */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Start a Meeting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="p-8 bg-gradient-to-br from-purple-600 to-purple-500 text-white rounded-lg hover:from-purple-700 hover:to-purple-600 transition shadow-lg">
              <div className="text-4xl mb-3">📹</div>
              <h3 className="font-bold text-lg mb-2">Start Video Call</h3>
              <p className="text-sm opacity-90">Create a new video meeting</p>
            </button>

            <button className="p-8 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition shadow-lg">
              <div className="text-4xl mb-3">🎤</div>
              <h3 className="font-bold text-lg mb-2">Start Audio Call</h3>
              <p className="text-sm opacity-90">Create a new audio meeting</p>
            </button>

            <button className="p-8 bg-gradient-to-br from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition shadow-lg">
              <div className="text-4xl mb-3">📅</div>
              <h3 className="font-bold text-lg mb-2">Schedule Meeting</h3>
              <p className="text-sm opacity-90">Plan a meeting for later</p>
            </button>
          </div>
        </div>

        {/* Recent Meetings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Recent Meetings
          </h2>
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <p className="text-gray-600 dark:text-gray-400">
              No meetings yet. Start one to get connected!
            </p>
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Team Members
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No team members invited yet
          </p>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Invite Team Member
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

export default withProtectedRoute(TeamPage);
