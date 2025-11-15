"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

/**
 * Higher-order component to protect routes
 * Redirects to /login if user is not authenticated
 * Shows loading spinner while auth is initializing
 * @param {React.ComponentType} Component - The component to protect
 * @returns {React.ComponentType} - Protected component
 */
export const withProtectedRoute = ( Component ) =>
{
    return function ProtectedRouteWrapper ( props )
    {
        const router = useRouter();
        const { user, isInitialized } = useAuth();

        useEffect( () =>
        {
            // Only redirect after auth has initialized
            if ( isInitialized && !user )
            {
                router.push( "/login" );
            }
        }, [ user, isInitialized, router ] );

        // Show loading while auth is initializing
        if ( !isInitialized )
        {
            return (
                <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                            <svg
                                className="w-6 h-6 text-purple-600 dark:text-purple-300 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        </div>
                        <p className="text-gray-700 dark:text-gray-200 font-medium">
                            Loading...
                        </p>
                    </div>
                </div>
            );
        }

        // If authenticated, render the component
        if ( user )
        {
            return <Component { ...props } />;
        }

        // If not initialized and not authenticated, don't render (redirect will happen)
        return null;
    };
};
