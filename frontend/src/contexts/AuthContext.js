"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { getSafeErrorMessage, sanitizeForLogging } from "@/utils/errorMessages";

const AuthContext = createContext( null );

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const AuthProvider = ( { children } ) =>
{
    const [ user, setUser ] = useState( null );
    const [ token, setToken ] = useState( null );
    const [ loading, setLoading ] = useState( false );
    const [ error, setError ] = useState( null );
    const [ isInitialized, setIsInitialized ] = useState( false );
    const [ csrfToken, setCsrfToken ] = useState( null );
    const refreshPromiseRef = useRef( null );

    // Fetch CSRF token from server
    const fetchCsrfToken = useCallback( async () =>
    {
        try
        {
            const response = await fetch( `${ API_URL }/api/auth/token`, {
                method: "GET",
                credentials: "include", // Important: include cookies
            } );

            if ( response.ok )
            {
                const data = await response.json();
                setCsrfToken( data.csrfToken );
                return data.csrfToken;
            }
        } catch ( err )
        {
            // Silently fail - network error will be caught on actual login/signup attempt
        }
        return null;
    }, [] );

    // Refresh access token using refresh endpoint
    const doRefreshToken = useCallback( async () =>
    {
        try
        {
            const response = await fetch( `${ API_URL }/api/auth/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // Include refresh token cookie
            } );

            if ( !response.ok ) throw new Error( "Token refresh failed" );

            const data = await response.json();
            setToken( data.accessToken );
            localStorage.setItem( "authToken", data.accessToken );
            return data.accessToken;
        } catch ( err )
        {
            // If refresh fails, clear auth state
            setUser( null );
            setToken( null );
            localStorage.removeItem( "authToken" );
            throw err;
        }
    }, [] );

    // Secure API calls with auto-refresh on 401
    const apiCall = useCallback( async ( endpoint, method = "GET", body = null ) =>
    {
        try
        {
            const options = {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...( token && { Authorization: `Bearer ${ token }` } ),
                },
                credentials: "include", // Include cookies
            };
            if ( body ) options.body = JSON.stringify( body );

            let response = await fetch( endpoint, options );

            // Handle 401 Unauthorized - attempt to refresh token
            if ( response.status === 401 && token )
            {
                if ( !refreshPromiseRef.current )
                {
                    refreshPromiseRef.current = doRefreshToken().finally( () =>
                    {
                        refreshPromiseRef.current = null;
                    } );
                }
                await refreshPromiseRef.current;
                const newToken = localStorage.getItem( "authToken" );
                options.headers.Authorization = `Bearer ${ newToken }`;
                response = await fetch( endpoint, options );
            }

            if ( !response.ok )
            {
                const errorData = await response.json().catch( () => ( {} ) );
                throw new Error( errorData.message || `API error: ${ response.status }` );
            }

            return await response.json();
        } catch ( err )
        {
            console.error( "API call error:", sanitizeForLogging( err.message ) );
            // Use safe error message for API errors
            const safeError = getSafeErrorMessage( err.message, "api" );
            setError( safeError );
            throw err;
        }
    }, [ token, doRefreshToken ] );

    // Login
    const login = useCallback(
        async ( email, password ) =>
        {
            setLoading( true );
            setError( null );

            try
            {
                console.log( "Attempting login with:", email, "API URL:", API_URL );

                // Fetch CSRF token first
                let csrf = csrfToken;
                if ( !csrf )
                {
                    console.log( "No CSRF token in state, fetching..." );
                    csrf = await fetchCsrfToken();
                }

                if ( !csrf )
                {
                    throw new Error( "Failed to obtain CSRF token. Backend may not be responding correctly." );
                }

                console.log( "Using CSRF token for login" );

                const response = await fetch( `${ API_URL }/api/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-csrf-token": csrf, // Send CSRF token in header
                    },
                    credentials: "include", // Include/receive cookies (httpOnly refresh token)
                    body: JSON.stringify( { email, password } ),
                } );

                if ( !response.ok )
                {
                    const errorData = await response.json().catch( () => ( {} ) );
                    const errorMessage = errorData.message || errorData.error || `Login failed`;
                    throw new Error( errorMessage );
                }

                const data = await response.json();

                if ( data.accessToken )
                {
                    setToken( data.accessToken );
                    localStorage.setItem( "authToken", data.accessToken );

                    // Try to obtain user data:
                    // 1) if login response includes user object, use it
                    // 2) try GET /api/users/me
                    // 3) if login response includes userId, try GET /api/users/{userId}
                    // 4) fallback to a minimal user derived from email so UI updates
                    try
                    {
                        if ( data.user )
                        {
                            setUser( data.user );
                        } else
                        {
                            // attempt /api/users/me
                            let userData = null;
                            const meRes = await fetch( `${ API_URL }/api/users/me`, {
                                method: 'GET',
                                headers: { Authorization: `Bearer ${ data.accessToken }` },
                                credentials: 'include',
                            } );
                            if ( meRes.ok )
                            {
                                userData = await meRes.json();
                                setUser( userData );
                            } else if ( data.userId )
                            {
                                const byIdRes = await fetch( `${ API_URL }/api/users/${ data.userId }`, {
                                    method: 'GET',
                                    headers: { Authorization: `Bearer ${ data.accessToken }` },
                                    credentials: 'include',
                                } );
                                if ( byIdRes.ok )
                                {
                                    userData = await byIdRes.json();
                                    setUser( userData );
                                }
                            }

                            // final fallback: set a minimal user so Navbar updates
                            if ( !userData )
                            {
                                const fallbackName = ( typeof email === 'string' && email.includes( '@' ) ) ? email.split( '@' )[ 0 ] : 'User';
                                setUser( { name: fallbackName } );
                            }
                        }
                    } catch ( err )
                    {
                        // If everything fails, at least set a minimal user so UI flips to authenticated state
                        const fallbackName = ( typeof email === 'string' && email.includes( '@' ) ) ? email.split( '@' )[ 0 ] : 'User';
                        setUser( { name: fallbackName } );
                    }
                } else
                {
                    throw new Error( "No access token in response" );
                }
                return data;
            } catch ( err )
            {
                // Show user-friendly error message, hide sensitive details
                const safeError = getSafeErrorMessage( err.message, "login" );
                setError( safeError );
                throw err;
            } finally
            {
                setLoading( false );
            }
        },
        [ csrfToken, fetchCsrfToken ]
    );

    // Signup
    const signup = useCallback(
        async ( email, password, username ) =>
        {
            setLoading( true );
            setError( null );

            try
            {
                // Fetch CSRF token first
                let csrf = csrfToken;
                if ( !csrf )
                {
                    csrf = await fetchCsrfToken();
                }

                if ( !csrf )
                {
                    throw new Error( "Failed to obtain CSRF token. Backend may not be responding correctly." );
                }

                const response = await fetch( `${ API_URL }/api/auth/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-csrf-token": csrf, // Send CSRF token in header
                    },
                    credentials: "include",
                    body: JSON.stringify( { username, email, password } ),
                } );

                if ( !response.ok )
                {
                    const errorData = await response.json().catch( () => ( {} ) );
                    const errorMessage = errorData.message || errorData.error || "Signup failed";
                    throw new Error( errorMessage );
                }

                const data = await response.json();

                if ( data.id )
                {
                    // Auto-login after signup
                    await login( email, password );
                }
                return data;
            } catch ( err )
            {
                // Show user-friendly error message, hide sensitive details
                const safeError = getSafeErrorMessage( err.message, "signup" );
                setError( safeError );
                throw err;
            } finally
            {
                setLoading( false );
            }
        },
        [ login, csrfToken, fetchCsrfToken ]
    );

    // Logout
    const logout = useCallback( async () =>
    {
        setLoading( true );
        try
        {
            // Fetch CSRF token for logout if not in state
            let csrf = csrfToken;
            if ( !csrf )
            {
                csrf = await fetchCsrfToken();
            }

            if ( csrf )
            {
                await fetch( `${ API_URL }/api/auth/logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-csrf-token": csrf,
                    },
                    credentials: "include",
                } );
            }
        } catch ( err )
        {
            // Silently fail - logout will still clear state
        } finally
        {
            setUser( null );
            setToken( null );
            setCsrfToken( null );
            localStorage.removeItem( "authToken" );
            setLoading( false );
        }
    }, [ csrfToken, fetchCsrfToken ] );

    // Initialize auth on mount
    useEffect( () =>
    {
        const initializeAuth = async () =>
        {
            try
            {
                // Fetch CSRF token on app initialization
                console.log( "Fetching CSRF token on app initialization..." );
                const csrf = await fetchCsrfToken();
                if ( csrf )
                {
                    console.log( "CSRF token fetched successfully" );
                }

                const storedToken = typeof window !== "undefined" ? localStorage.getItem( "authToken" ) : null;

                if ( storedToken )
                {
                    setToken( storedToken );

                    // Try to fetch user data to verify token is still valid
                    try
                    {
                        const userResponse = await fetch( `${ API_URL }/api/users/me`, {
                            method: "GET",
                            headers: { Authorization: `Bearer ${ storedToken }` },
                            credentials: "include",
                        } );
                        if ( userResponse.ok )
                        {
                            const userData = await userResponse.json();
                            setUser( userData );
                        } else if ( userResponse.status === 401 )
                        {
                            // Token expired, try to refresh
                            const refreshResponse = await fetch( `${ API_URL }/api/auth/refresh`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                credentials: "include",
                            } );
                            if ( refreshResponse.ok )
                            {
                                const refreshData = await refreshResponse.json();
                                setToken( refreshData.accessToken );
                                localStorage.setItem( "authToken", refreshData.accessToken );
                            } else
                            {
                                // Refresh failed, clear auth
                                setToken( null );
                                localStorage.removeItem( "authToken" );
                            }
                        }
                    } catch ( err )
                    {
                        // Silently fail - will try again on next action
                    }
                }
            } catch ( err )
            {
                // Initialization error - continue anyway
            } finally
            {
                setIsInitialized( true );
            }
        };

        initializeAuth();
    }, [ fetchCsrfToken ] );

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
    };

    return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>;
};

export const useAuth = () =>
{
    const context = useContext( AuthContext );
    if ( !context )
    {
        throw new Error( "useAuth must be used within AuthProvider" );
    }
    return context;
};
