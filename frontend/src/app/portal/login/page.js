"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { validateEmail, sanitizeInput } from "@/utils/security";

export default function LoginPage ()
{
    const router = useRouter();
    const { login, loading, error: authError } = useAuth();
    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ errors, setErrors ] = useState( {} );
    const [ showPassword, setShowPassword ] = useState( false );
    const [ submitted, setSubmitted ] = useState( false );

    const validateForm = useCallback( () =>
    {
        const newErrors = {};

        if ( !email.trim() )
        {
            newErrors.email = "Email is required";
        } else if ( !validateEmail( email ) )
        {
            newErrors.email = "Please enter a valid email address";
        }

        if ( !password )
        {
            newErrors.password = "Password is required";
        } else if ( password.length < 6 )
        {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors( newErrors );
        return Object.keys( newErrors ).length === 0;
    }, [ email, password ] );

    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        setSubmitted( true );

        if ( !validateForm() ) return;

        try
        {
            const sanitizedEmail = sanitizeInput( email );
            await login( sanitizedEmail, password );
            // Redirect on successful login
            router.push( "/portal/profile" );
        } catch ( err )
        {
            console.error( "Login failed:", err );
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Sign in to your account</p>

                    { authError && (
                        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded">
                            { authError }
                        </div>
                    ) }

                    <form onSubmit={ handleSubmit } noValidate className="space-y-4">
                        {/* Email Field */ }
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={ email }
                                onChange={ ( e ) => setEmail( e.target.value ) }
                                onBlur={ () => 
                                {
                                    if ( email.trim() ) validateForm();
                                } }
                                className={ `w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition ${ errors.email
                                    ? "border-red-500 dark:border-red-400"
                                    : "border-gray-300 dark:border-gray-600"
                                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white` }
                                placeholder="you@example.com"
                                required
                                autoComplete="email"
                            />
                            { errors.email && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{ errors.email }</p> }
                        </div>                        {/* Password Field */ }
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={ showPassword ? "text" : "password" }
                                    value={ password }
                                    onChange={ ( e ) => setPassword( e.target.value ) }
                                    onBlur={ () =>
                                    {
                                        if ( password ) validateForm();
                                    } }
                                    className={ `w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition ${ errors.password
                                        ? "border-red-500 dark:border-red-400"
                                        : "border-gray-300 dark:border-gray-600"
                                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white` }
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={ () => setShowPassword( !showPassword ) }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    { showPassword ? "Hide" : "Show" }
                                </button>
                            </div>
                            { errors.password && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{ errors.password }</p> }
                        </div>

                        {/* Forgot password link */ }
                        <div className="flex justify-end mt-2">
                            <Link href="/portal/forgot-password" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                                Forgot your password?
                            </Link>
                        </div>

                        {/* Submit Button */ }
                        <button
                            type="submit"
                            disabled={ loading }
                            className="w-full mt-6 px-4 py-2 bg-gradient-to-br from-purple-600 to-purple-500 text-white rounded-md font-medium hover:from-purple-700 hover:to-purple-600 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            { loading ? "Signing in..." : "Sign in" }
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Don&apos;t have an account?{ " " }
                            <Link href="/portal/signup" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
