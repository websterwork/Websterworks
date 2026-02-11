"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight,
    FiShield, FiZap, FiStar, FiCheckCircle,
    FiGlobe, FiUsers, FiGithub, FiTwitter, FiFigma, FiDribbble,
    FiArrowLeft, FiBriefcase
} from "react-icons/fi";
import { validateEmail, sanitizeInput } from "@/utils/security";

export default function LoginPage() {
    const router = useRouter();
    const {
        login,
        loading,
        error: authError,
        clearAuthError // ✅ Use the new clearAuthError function
    } = useAuth();

    // Form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [touchedFields, setTouchedFields] = useState({});
    const [rememberMe, setRememberMe] = useState(false);

    // Clear auth error when component mounts
    useEffect(() => {
        clearAuthError();
    }, [clearAuthError]);

    // Clear field error when user types
    const clearFieldError = (field) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    };

    // 🔥 COMPLETE ERROR CLEARING FUNCTION
    const clearAllErrors = () => {
        setErrors({});
        clearAuthError();
    };

    // Handle field change with error clearing
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        clearFieldError('email');
        clearAuthError(); // ✅ Clear auth error on typing
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        clearFieldError('password');
        clearAuthError(); // ✅ Clear auth error on typing
    };

    // Handle field blur for validation
    const handleBlur = (field) => {
        setTouchedFields(prev => ({ ...prev, [field]: true }));

        if (field === 'email' && email.trim() && !validateEmail(email)) {
            setErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
        }
        if (field === 'password' && password && password.length < 6) {
            setErrors(prev => ({ ...prev, password: "Password must be at least 6 characters" }));
        }
    };

    // Validation
    const validateForm = useCallback(() => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [email, password]);

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        clearAuthError(); // ✅ Clear auth error before submission

        if (!validateForm()) {
            const firstError = Object.keys(errors)[0];
            document.getElementById(firstError)?.focus();
            return;
        }

        try {
            const sanitizedEmail = sanitizeInput(email);
            await login(sanitizedEmail, password);
            router.push("/portal/profile");
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="container mx-auto px-4 py-16 lg:py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - BRAND & VALUE PROPOSITION */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            {/* ... banner content (unchanged) ... */}
                            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl" />
                            <div className="relative z-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-10 text-white overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
                                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
                                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
                                                <FiStar className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-2xl font-bold">Websterwork</span>
                                        </div>
                                        <span className="px-3 py-1.5 bg-white/20 backdrop-blur-xl text-xs font-medium rounded-full border border-white/30">
                                            BETA
                                        </span>
                                    </div>
                                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                                        Welcome back.
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                                            Continue building.
                                        </span>
                                    </h2>
                                    <p className="text-lg text-white/80 mb-10 leading-relaxed">
                                        Access your dashboard, manage projects, and collaborate with your team in real-time.
                                    </p>
                                    <div className="grid grid-cols-2 gap-5 mb-10">
                                        {[
                                            { icon: FiZap, label: "10x faster builds" },
                                            { icon: FiGlobe, label: "Global edge" },
                                            { icon: FiShield, label: "SOC2 Type II" },
                                            { icon: FiUsers, label: "Team collaboration" },
                                        ].map((feature, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 * i }}
                                                className="flex items-center gap-3"
                                            >
                                                <div className="w-8 h-8 bg-white/10 backdrop-blur-xl rounded-lg flex items-center justify-center border border-white/20">
                                                    <feature.icon className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-sm font-medium text-white/90">{feature.label}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="border-t border-white/20 pt-8">
                                        <p className="text-sm text-white/60 mb-5">Trusted by engineering teams at</p>
                                        <div className="flex items-center gap-6">
                                            {[
                                                { icon: FiGithub, name: "Github" },
                                                { icon: FiFigma, name: "Figma" },
                                                { icon: FiTwitter, name: "Twitter" },
                                                { icon: FiDribbble, name: "Dribbble" }
                                            ].map((company, i) => (
                                                <div key={i} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                                                    <company.icon className="w-4 h-4" />
                                                    <span className="text-xs font-medium">{company.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-8 p-5 bg-white/5 backdrop-blur-xl rounded-xl border border-white/20">
                                        <p className="text-sm text-white/90 italic mb-3">
                                            "The only platform we trust for our entire infrastructure. 99.99% uptime, always."
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                SJ
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">Sarah Johnson</p>
                                                <p className="text-xs text-white/60">CTO, TechStart</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - LOGIN FORM */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-full max-w-md mx-auto lg:mx-0"
                        >
                            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100 dark:border-gray-800">
                                {/* Header */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                                        WELCOME BACK
                                    </h3>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        Sign in
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Don't have an account?{' '}
                                        <Link href="/portal/signup" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">
                                            Create free account
                                        </Link>
                                    </p>
                                </div>

                                {/* Error Message - WITH DYNAMIC KEY */}
                                <AnimatePresence mode="wait">
                                    {authError && (
                                        <motion.div
                                            key={`error-${authError}`} // 🔥 Dynamic key forces re-render
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mb-6 p-4 rounded-xl flex items-start gap-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900"
                                        >
                                            <div className="flex-shrink-0 text-rose-600 dark:text-rose-400">
                                                <FiShield className="w-5 h-5" />
                                            </div>
                                            <p className="text-sm text-rose-700 dark:text-rose-300">
                                                {authError}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Login Form */}
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                            Work email
                                        </label>
                                        <div className="relative group">
                                            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                            <input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={handleEmailChange}
                                                onBlur={() => handleBlur('email')}
                                                onFocus={clearAllErrors} // ✅ Clear errors on focus
                                                className={`w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-2 rounded-xl transition-all ${errors.email
                                                        ? 'border-rose-500 focus:border-rose-500 dark:focus:border-rose-400 focus:ring-rose-500/20'
                                                        : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20'
                                                    } focus:outline-none focus:ring-4 text-gray-900 dark:text-white`}
                                                placeholder="you@company.com"
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                            Password
                                        </label>
                                        <div className="relative group">
                                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={handlePasswordChange}
                                                onBlur={() => handleBlur('password')}
                                                onFocus={clearAllErrors} // ✅ Clear errors on focus
                                                className={`w-full pl-9 pr-10 py-3 bg-gray-50 dark:bg-gray-800/50 border-2 rounded-xl transition-all ${errors.password
                                                        ? 'border-rose-500 focus:border-rose-500 dark:focus:border-rose-400 focus:ring-rose-500/20'
                                                        : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20'
                                                    } focus:outline-none focus:ring-4 text-gray-900 dark:text-white`}
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                            >
                                                {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.password}</p>
                                        )}
                                    </div>

                                    {/* Remember me & Forgot password */}
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center">
                                            <input
                                                id="remember"
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded-lg focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:checked:bg-blue-600"
                                            />
                                            <label htmlFor="remember" className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                                                Remember me
                                            </label>
                                        </div>
                                        <Link
                                            href="/portal/forgot-password"
                                            className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>

                                    {/* Submit button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full mt-6 px-4 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Signing in...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <span>Sign in</span>
                                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>

                                    {/* SSO Option */}
                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="px-3 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                                                Or continue with
                                            </span>
                                        </div>
                                    </div>

                                    {/* SSO Button */}
                                    <button
                                        type="button"
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-3 group"
                                    >
                                        <FiBriefcase className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Sign in with SSO
                                        </span>
                                    </button>
                                </form>
                            </div>

                            {/* Free trial badge */}
                            <div className="mt-6 text-center">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-900 rounded-full shadow-sm border border-gray-200 dark:border-gray-800">
                                    <FiZap className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                        New to Websterwork? <Link href="/portal/signup" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-semibold">Sign up free →</Link>
                                    </span>
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}