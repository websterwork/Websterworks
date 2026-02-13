"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { getSafeErrorMessage, sanitizeForLogging } from "@/utils/errorMessages";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [csrfToken, setCsrfToken] = useState(null);
    const [pendingSignup, setPendingSignup] = useState(null);
    const refreshPromiseRef = useRef(null);

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';


    // Fetch CSRF token from server
    const fetchCsrfToken = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE}/api/auth/token`, {
                method: "GET",
                credentials: "include", // Important: include cookies
            });

            if (response.ok) {
                const data = await response.json();
                setCsrfToken(data.csrfToken);
                return data.csrfToken;
            }
        } catch (err) {
            // Silently fail - network error will be caught on actual login/signup attempt
        }
        return null;
    }, [API_BASE]);

    // Refresh access token using refresh endpoint
    const doRefreshToken = useCallback(async () => {
        try {
            const csrf = csrfToken || (await fetchCsrfToken());

            const response = await fetch(`${API_BASE}/api/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-csrf-token": csrf,
                },
                credentials: "include",
            });

            if (!response.ok) throw new Error("Token refresh failed");

            const data = await response.json();
            setToken(data.accessToken);
            localStorage.setItem("authToken", data.accessToken);
            return data.accessToken;
        } catch (err) {
            setUser(null);
            setToken(null);
            localStorage.removeItem("authToken");
            throw err;
        }
    }, [csrfToken, fetchCsrfToken, API_BASE]);

    // Secure API calls with auto-refresh on 401
    const apiCall = useCallback(async (endpoint, method = "GET", body = null) => {
        try {
            const options = {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                credentials: "include",
            };
            if (body) options.body = JSON.stringify(body);

            let response = await fetch(`${API_BASE}${endpoint}`, options);

            // Handle 401 Unauthorized - attempt to refresh token
            if (response.status === 401 && token) {
                if (!refreshPromiseRef.current) {
                    refreshPromiseRef.current = doRefreshToken().finally(() => {
                        refreshPromiseRef.current = null;
                    });
                }
                await refreshPromiseRef.current;
                const newToken = localStorage.getItem("authToken");
                options.headers.Authorization = `Bearer ${newToken}`;
                response = await fetch(`${API_BASE}${endpoint}`, options);
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `API error: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            console.error("API call error:", sanitizeForLogging(err.message));
            const safeError = getSafeErrorMessage(err.message, "api");
            setError(safeError);
            throw err;
        }
    }, [token, doRefreshToken, API_BASE]);

    // ✅ CLEAR AUTH ERROR - Solution 2
    const clearAuthError = useCallback(() => {
        setError(null);
    }, []);

    // Login
    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            let csrf = csrfToken;
            if (!csrf) {
                csrf = await fetchCsrfToken();
            }

            if (!csrf) {
                throw new Error("Failed to obtain CSRF token. Backend may not be responding correctly.");
            }

            const response = await fetch(`${API_BASE}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-csrf-token": csrf,
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || errorData.error || "Login failed";
                throw new Error(errorMessage);
            }

            const data = await response.json();

            if (data.accessToken) {
                setToken(data.accessToken);
                localStorage.setItem("authToken", data.accessToken);

                // Try to obtain user data
                try {
                    if (data.user) {
                        setUser(data.user);
                    } else {
                        let userData = null;
                        const meRes = await fetch(`${API_BASE}/api/users/me`, {
                            method: 'GET',
                            headers: { Authorization: `Bearer ${data.accessToken}` },
                            credentials: 'include',
                        });
                        if (meRes.ok) {
                            userData = await meRes.json();
                            setUser(userData);
                        } else if (data.userId) {
                            const byIdRes = await fetch(`${API_BASE}/api/users/${data.userId}`, {
                                method: 'GET',
                                headers: { Authorization: `Bearer ${data.accessToken}` },
                                credentials: 'include',
                            });
                            if (byIdRes.ok) {
                                userData = await byIdRes.json();
                                setUser(userData);
                            }
                        }

                        if (!userData) {
                            const fallbackName = (typeof email === 'string' && email.includes('@')) ? email.split('@')[0] : 'User';
                            setUser({ name: fallbackName });
                        }
                    }
                } catch (err) {
                    const fallbackName = (typeof email === 'string' && email.includes('@')) ? email.split('@')[0] : 'User';
                    setUser({ name: fallbackName });
                }
            } else {
                throw new Error("No access token in response");
            }
            return data;
        } catch (err) {
            const safeError = getSafeErrorMessage(err.message, "login");
            setError(safeError);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [csrfToken, fetchCsrfToken, API_BASE]);

    // Signup
    const signup = useCallback(async (email, password, username) => {
        setLoading(true);
        setError(null);

        try {
            let csrf = csrfToken;
            if (!csrf) {
                csrf = await fetchCsrfToken();
            }

            if (!csrf) {
                throw new Error("Failed to obtain CSRF token. Backend may not be responding correctly.");
            }

            const response = await fetch(`${API_BASE}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-csrf-token": csrf,
                },
                credentials: "include",
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || errorData.error || "Signup failed";
                throw new Error(errorMessage);
            }

            const data = await response.json();
            setPendingSignup({ email, password, username });
            return data;
        } catch (err) {
            const safeError = getSafeErrorMessage(err.message, "signup");
            setError(safeError);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [csrfToken, fetchCsrfToken, API_BASE]);

    // Verify signup
    const verifySignup = useCallback(async (code) => {
        setLoading(true);
        setError(null);

        if (!pendingSignup) {
            const err = new Error('No pending signup found. Please start signup first.');
            setError(getSafeErrorMessage(err.message, 'signup'));
            setLoading(false);
            throw err;
        }

        try {
            let csrf = csrfToken;
            if (!csrf) csrf = await fetchCsrfToken();
            if (!csrf) throw new Error('Failed to obtain CSRF token');

            const response = await fetch(`${API_BASE}/api/auth/verify-signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-csrf-token': csrf,
                },
                credentials: 'include',
                body: JSON.stringify({ email: pendingSignup.email, code }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Verification failed');
            }

            const result = await response.json();

            try {
                await login(pendingSignup.email, pendingSignup.password);
            } catch (e) {
                setPendingSignup(null);
                const safeError = getSafeErrorMessage(e.message, 'login');
                setError(safeError);
                throw e;
            }

            setPendingSignup(null);
            return result;
        } catch (err) {
            const safe = getSafeErrorMessage(err.message, 'signup');
            setError(safe);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [pendingSignup, csrfToken, fetchCsrfToken, login, API_BASE]);

    // Resend verification
    const resendVerification = useCallback(async () => {
        if (!pendingSignup) throw new Error('No pending signup to resend verification for');
        return await signup(pendingSignup.email, pendingSignup.password, pendingSignup.username);
    }, [pendingSignup, signup]);

    // Logout
    const logout = useCallback(async () => {
        setLoading(true);
        try {
            let csrf = csrfToken;
            if (!csrf) {
                csrf = await fetchCsrfToken();
            }

            if (csrf) {
                await fetch(`${API_BASE}/api/auth/logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-csrf-token": csrf,
                    },
                    credentials: "include",
                });
            }
        } catch (err) {
            // Silently fail
        } finally {
            setUser(null);
            setToken(null);
            setCsrfToken(null);
            localStorage.removeItem("authToken");
            setLoading(false);
        }
    }, [csrfToken, fetchCsrfToken, API_BASE]);

    // Initialize auth on mount
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const csrf = await fetchCsrfToken();
                const storedToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

                if (storedToken) {
                    setToken(storedToken);

                    try {
                        const userResponse = await fetch(`${API_BASE}/api/users/me`, {
                            method: "GET",
                            headers: { Authorization: `Bearer ${storedToken}` },
                            credentials: "include",
                        });
                        if (userResponse.ok) {
                            const userData = await userResponse.json();
                            setUser(userData);
                        } else if (userResponse.status === 401) {
                            const refreshResponse = await fetch(`${API_BASE}/api/auth/refresh`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                credentials: "include",
                            });
                            if (refreshResponse.ok) {
                                const refreshData = await refreshResponse.json();
                                setToken(refreshData.accessToken);
                                localStorage.setItem("authToken", refreshData.accessToken);
                            } else {
                                setToken(null);
                                localStorage.removeItem("authToken");
                            }
                        }
                    } catch (err) {
                        // Silently fail
                    }
                }
            } catch (err) {
                // Initialization error - continue anyway
            } finally {
                setIsInitialized(true);
            }
        };

        initializeAuth();
    }, [fetchCsrfToken, API_BASE]);

    const value = {
        user,
        token,
        loading,
        error,
        isInitialized,
        login,
        signup,
        verifySignup,
        resendVerification,
        pendingSignup,
        logout,
        apiCall,
        clearAuthError, // ✅ EXPOSED TO ALL COMPONENTS
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};