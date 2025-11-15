"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import
{
  validateEmail,
  validatePassword,
  sanitizeInput,
  validateUsername,
} from "@/utils/security";

export default function SignupPage ()
{
  const router = useRouter();
  const { signup, loading, error: authError } = useAuth();
  const [ username, setUsername ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ confirmPassword, setConfirmPassword ] = useState( "" );
  const [ errors, setErrors ] = useState( {} );
  const [ showPassword, setShowPassword ] = useState( false );
  const [ showConfirmPassword, setShowConfirmPassword ] = useState( false );
  const [ submitted, setSubmitted ] = useState( false );
  const [ agreeToTerms, setAgreeToTerms ] = useState( false );

  const getPasswordStrength = useCallback( ( pwd ) =>
  {
    if ( !pwd ) return { score: 0, label: "Very weak", color: "bg-red-500" };
    let score = 0;
    if ( pwd.length >= 8 ) score++;
    if ( pwd.match( /[a-z]/ ) ) score++;
    if ( pwd.match( /[A-Z]/ ) ) score++;
    if ( pwd.match( /[0-9]/ ) ) score++;
    if ( pwd.match( /[^a-zA-Z0-9]/ ) ) score++;

    const strengths = [
      { score: 0, label: "Very weak", color: "bg-red-500" },
      { score: 1, label: "Weak", color: "bg-orange-500" },
      { score: 2, label: "Fair", color: "bg-yellow-500" },
      { score: 3, label: "Good", color: "bg-lime-500" },
      { score: 4, label: "Strong", color: "bg-green-500" },
      { score: 5, label: "Very strong", color: "bg-green-600" },
    ];

    return strengths[ Math.min( score, 5 ) ];
  }, [] );

  const validateForm = useCallback( () =>
  {
    const newErrors = {};
    if ( !username.trim() )
    {
      newErrors.username = "Username is required";
    } else if ( !validateUsername( username ) )
    {
      newErrors.username = "Please enter a valid username";
    }

    if ( !email.trim() )
    {
      newErrors.email = "Email is required";
    } else if ( !validateEmail( email ) )
    {
      newErrors.email = "Please enter a valid email address";
    }

    const passwordError = validatePassword( password );
    if ( passwordError )
    {
      newErrors.password = passwordError;
    }

    if ( !confirmPassword )
    {
      newErrors.confirmPassword = "Please confirm your password";
    } else if ( password !== confirmPassword )
    {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if ( !agreeToTerms )
    {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors( newErrors );
    return newErrors; // return the errors object so callers can inspect/focus
  }, [ email, password, confirmPassword, agreeToTerms, username ] );

  const handleSubmit = async ( e ) =>
  {
    e.preventDefault();
    setSubmitted( true );

    const newErrors = validateForm();
    if ( Object.keys( newErrors ).length > 0 )
    {
      // focus first invalid field to help user
      const firstError = Object.keys( newErrors )[ 0 ];
      const focusId = firstError === 'agreeToTerms' ? 'terms' : firstError;
      const el = document.getElementById( focusId );
      if ( el ) el.focus();
      return;
    }

    try
    {
      const sanitizedEmail = sanitizeInput( email );
      const sanitizedUsername = sanitizeInput( username );
      // Send username to backend as it now accepts it in the DTO
      await signup( sanitizedEmail, password, sanitizedUsername );
      // Redirect on successful signup
      router.push( "/profile" );
    } catch ( err )
    {
      console.error( "Signup failed:", err );
    }
  };

  const passwordStrength = getPasswordStrength( password );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create account
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Join us today</p>

          { authError && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded">
              { authError }
            </div>
          ) }

          <form onSubmit={ handleSubmit } noValidate className="space-y-4">
            {/* Username */ }
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={ username }
                onChange={ ( e ) =>
                {
                  setUsername( e.target.value );
                  setErrors( ( p ) => { const copy = { ...p }; delete copy.username; return copy; } );
                  if ( submitted ) validateForm();
                } }
                className={ `w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none ${ errors.username
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white` }
                placeholder="Enter Your Username"
                required
                autoComplete="username"
              />
              { errors.username && (
                <p className="mt-1 text-sm text-red-500">{ errors.username }</p>
              ) }
            </div>
            {/* Email */ }
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={ email }
                onChange={ ( e ) =>
                {
                  setEmail( e.target.value );
                  setErrors( ( p ) => { const copy = { ...p }; delete copy.email; return copy; } );
                  if ( submitted ) validateForm();
                } }
                className={ `w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none ${ errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white` }
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
              { errors.email && (
                <p className="mt-1 text-sm text-red-500">{ errors.email }</p>
              ) }
            </div>

            {/* Password */ }
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={ showPassword ? "text" : "password" }
                  value={ password }
                  onChange={ ( e ) =>
                  {
                    setPassword( e.target.value );
                    setErrors( ( p ) => { const copy = { ...p }; delete copy.password; return copy; } );
                    if ( submitted ) validateForm();
                  } }
                  className={ `w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none ${ errors.password
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white` }
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={ () => setShowPassword( !showPassword ) }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  { showPassword ? "Hide" : "Show" }
                </button>
              </div>

              {/* Password Strength Meter */ }
              { password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={ `h-full ${ passwordStrength.color } transition-all` }
                        style={ {
                          width: `${ ( passwordStrength.score + 1 ) * 20 }%`,
                        } }
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      { passwordStrength.label }
                    </span>
                  </div>
                </div>
              ) }
              { errors.password && (
                <p className="mt-1 text-sm text-red-500">{ errors.password }</p>
              ) }
            </div>

            {/* Confirm Password */ }
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={ showConfirmPassword ? "text" : "password" }
                  value={ confirmPassword }
                  onChange={ ( e ) =>
                  {
                    setConfirmPassword( e.target.value );
                    setErrors( ( p ) => { const copy = { ...p }; delete copy.confirmPassword; return copy; } );
                    if ( submitted ) validateForm();
                  } }
                  className={ `w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none ${ errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white` }
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={ () => setShowConfirmPassword( !showConfirmPassword ) }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  { showConfirmPassword ? "Hide" : "Show" }
                </button>
              </div>
              { errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  { errors.confirmPassword }
                </p>
              ) }
            </div>

            {/* Terms Checkbox */ }
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                checked={ agreeToTerms }
                onChange={ ( e ) =>
                {
                  setAgreeToTerms( e.target.checked );
                  setErrors( ( p ) => { const copy = { ...p }; delete copy.agreeToTerms; return copy; } );
                  if ( submitted ) validateForm();
                } }
                className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="ml-2 text-sm text-gray-600 dark:text-gray-400"
              >
                I agree to the{ " " }
                <a href="/terms" className="text-purple-600 hover:underline">
                  terms and conditions
                </a>
              </label>
            </div>
            { errors.agreeToTerms && (
              <p className="text-sm text-red-500">{ errors.agreeToTerms }</p>
            ) }

            {/* Submit */ }
            <button
              type="submit"
              disabled={ loading }
              className="w-full mt-6 px-4 py-2 bg-gradient-to-br from-purple-600 to-purple-500 text-white rounded-md font-medium hover:from-purple-700 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              { loading ? "Creating account..." : "Sign up" }
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{ " " }
              <Link
                href="/login"
                className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
