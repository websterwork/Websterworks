"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export const withProtectedRoute = (Component) => {
  return function ProtectedRouteWrapper(props) {
    const router = useRouter();
    const { user, isInitialized } = useAuth();

    useEffect(() => {
      // Only act after auth is initialized
      if (isInitialized && !user) {
        // Use replace to prevent back navigation to protected route
        router.replace("/portal/login");
      }
    }, [user, isInitialized, router]);

    // Don't render anything if:
    // 1. Auth not initialized yet, OR
    // 2. User is not authenticated (redirect will happen)
    if (!isInitialized || !user) {
      return null;
    }

    // Only render when fully authenticated
    return <Component {...props} />;
  };
};