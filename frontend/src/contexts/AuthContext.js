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

    // =======================
    // Safe fetch helper
    // =======================
    const safeFetch = useCallback(async (url, options = {}) => {
        const method = (options.method || "GET").toUpperCase();

        const headers = Object.assign(
            { "Content-Type": "application/json" },
            options.headers || {}
        );

        // Only attach CSRF token if not OPTIONS
        if (method !== "OPTIONS" && csrfToken) {
            headers["x-csrf-token"] = csrfToken;
        }

        return fetch(url, Object.assign({}, options, { headers, credentials: "include" }));
    }, [csrfToken]);

    // =======================
    // Fetch CSRF token
    // =======================
    const fetchCsrfToken = useCallback(async () => {
        try {
            const response = await safeFetch(`${API_BASE}/api/auth/token`, { method: "GET" });
            if (response.ok) {
                const data = await response.json();
                setCsrfToken(data.csrfToken);
                return data.csrfToken;
            }
        } catch (err) {
            // silently fail
        }
        return null;
    }, [API_BASE, safeFetch]);

    // =======================
    // Refresh token
    // =======================
    const doRefreshToken = useCallback(async () => {
        try {
            const csrf = csrfToken || (await fetchCsrfToken());
            const headers = csrf ? { "x-csrf-token": csrf } : {};
            const response = await safeFetch(`${API_BASE}/api/auth/refresh`, {
                method: "POST",
                headers
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
    }, [csrfToken, fetchCsrfToken, API_BASE, safeFetch]);

    // =======================
    // Generic API call
    // =======================
    const apiCall = useCallback(async (endpoint, method = "GET", body = null) => {
        try {
            const options = { method };
            if (body) options.body = JSON.stringify(body);
            if (token) options.headers = { Authorization: `Bearer ${token}` };

            let response = await safeFetch(`${API_BASE}${endpoint}`, options);

            // handle 401 with refresh
            if (response.status === 401 && token) {
                if (!refreshPromiseRef.current) {
                    refreshPromiseRef.current = doRefreshToken().finally(() => {
                        refreshPromiseRef.current = null;
                    });
                }
                await refreshPromiseRef.current;
                const newToken = localStorage.getItem("authToken");
                options.headers = { Authorization: `Bearer ${newToken}` };
                response = await safeFetch(`${API_BASE}${endpoint}`, options);
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `API error: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            console.error("API call error:", sanitizeForLogging(err.message));
            setError(getSafeErrorMessage(err.message, "api"));
            throw err;
        }
    }, [token, doRefreshToken, API_BASE, safeFetch]);

    const clearAuthError = useCallback(() => setError(null), []);

    // =======================
    // LOGIN
    // =======================
    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            let csrf = csrfToken || (await fetchCsrfToken());
            if (!csrf) throw new Error("Failed to obtain CSRF token");

            const response = await safeFetch(`${API_BASE}/api/auth/login`, {
                method: "POST",
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || errorData.error || "Login failed");
            }

            const data = await response.json();
            if (data.accessToken) {
                setToken(data.accessToken);
                localStorage.setItem("authToken", data.accessToken);

                if (data.user) setUser(data.user);
                else {
                    try {
                        const meRes = await safeFetch(`${API_BASE}/api/users/me`, {
                            method: 'GET',
                            headers: { Authorization: `Bearer ${data.accessToken}` }
                        });
                        if (meRes.ok) setUser(await meRes.json());
                    } catch { }
                }
            } else {
                throw new Error("No access token in response");
            }

            return data;
        } catch (err) {
            setError(getSafeErrorMessage(err.message, "login"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [csrfToken, fetchCsrfToken, API_BASE, safeFetch]);

    // =======================
    // SIGNUP
    // =======================
    const signup = useCallback(async (email, password, username) => {
        setLoading(true);
        setError(null);

        try {
            let csrf = csrfToken || (await fetchCsrfToken());
            if (!csrf) throw new Error("Failed to obtain CSRF token");

            const response = await safeFetch(`${API_BASE}/api/auth/signup`, {
                method: "POST",
                body: JSON.stringify({ email, password, username })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || errorData.error || "Signup failed");
            }

            setPendingSignup({ email, password, username });
            return await response.json();
        } catch (err) {
            setError(getSafeErrorMessage(err.message, "signup"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [csrfToken, fetchCsrfToken, API_BASE, safeFetch]);

    // =======================
    // LOGOUT
    // =======================
    const logout = useCallback(async () => {
        setLoading(true);
        try {
            let csrf = csrfToken || (await fetchCsrfToken());
            if (csrf) {
                await safeFetch(`${API_BASE}/api/auth/logout`, { method: "POST" });
            }
        } catch { }
        finally {
            setUser(null);
            setToken(null);
            setCsrfToken(null);
            localStorage.removeItem("authToken");
            setLoading(false);
        }
    }, [csrfToken, fetchCsrfToken, API_BASE, safeFetch]);

    // =======================
    // Initialize auth on mount
    // =======================
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await fetchCsrfToken();
                const storedToken = localStorage.getItem("authToken");
                if (storedToken) setToken(storedToken);

                try {
                    const userRes = await safeFetch(`${API_BASE}/api/users/me`, {
                        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : {}
                    });
                    if (userRes.ok) setUser(await userRes.json());
                } catch { }
            } catch { }
            finally {
                setIsInitialized(true);
            }
        };
        initializeAuth();
    }, [fetchCsrfToken, API_BASE, safeFetch]);

    const value = {
        user,
        token,
        loading,
        error,
        isInitialized,
        login,
        signup,
        logout,
        apiCall,
        clearAuthError,
        pendingSignup
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
