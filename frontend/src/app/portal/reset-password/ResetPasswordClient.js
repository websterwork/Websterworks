// src/app/portal/reset-password/ResetPasswordClient.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiLock, FiEye, FiEyeOff, FiCheck, FiArrowLeft,
    FiShield, FiZap, FiStar, FiGlobe, FiUsers,
    FiGithub, FiTwitter, FiFigma, FiDribbble,
    FiCheckCircle, FiAlertCircle, FiArrowRight
} from "react-icons/fi";

export default function ResetPasswordClient({ uid = "", token = "" }) {
    const router = useRouter();
    const { clearAuthError, apiCall } = useAuth(); // ✅ Use apiCall from AuthContext

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);
    const [touched, setTouched] = useState({});

    // Clear auth error on mount
    useEffect(() => {
        clearAuthError();
    }, [clearAuthError]);

    // Password strength indicator
    const getPasswordStrength = (pwd) => {
        if (!pwd) return 0;
        let score = 0;
        if (pwd.length >= 8) score++;
        if (pwd.match(/[a-z]/)) score++;
        if (pwd.match(/[A-Z]/)) score++;
        if (pwd.match(/[0-9]/)) score++;
        if (pwd.match(/[^a-zA-Z0-9]/)) score++;
        return score;
    };

    const passwordStrength = getPasswordStrength(password);
    const strengthText = ["Very weak", "Weak", "Fair", "Good", "Strong", "Very strong"];
    const strengthColor = [
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-lime-500",
        "bg-green-500",
        "bg-emerald-500"
    ];

    // Validation
    const validateForm = () => {
        const newErrors = {};

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!confirm) {
            newErrors.confirm = "Please confirm your password";
        } else if (password !== confirm) {
            newErrors.confirm = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle blur for validation
    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateForm();
    };

    // Clear all errors
    const clearAllErrors = () => {
        setErrors({});
        setMessage(null);
        clearAuthError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearAllErrors();

        if (!validateForm()) {
            const firstError = Object.keys(errors)[0];
            document.getElementById(firstError)?.focus();
            return;
        }

        setLoading(true);

        try {
            // ✅ Use apiCall from AuthContext - handles CSRF, API_BASE, etc.
            await apiCall('/api/auth/reset-password', 'POST', {
                userId: uid,
                token,
                newPassword: password,
            });

            setIsSuccess(true);
            setMessage("Password reset successful! Redirecting to login...");

            setTimeout(() => {
                router.push("/portal/login");
            }, 2000);
        } catch (err) {
            setMessage(err?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    // Invalid link state
    if (!uid || !token) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                <div className="container mx-auto px-4 py-16 lg:py-20">
                    <div className="max-w-md mx-auto">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100 dark:border-gray-800 text-center">
                            <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiAlertCircle className="w-10 h-10 text-rose-600 dark:text-rose-400" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                Invalid Reset Link
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                This password reset link is invalid or has expired.
                            </p>
                            <Link
                                href="/portal/forgot-password"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                            >
                                <FiArrowLeft className="w-4 h-4" />
                                Request a new reset link
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                            className="relative hidden lg:block"
                        >
                            {/* ... banner content (keep as is) ... */}
                            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl" />
                            <div className="relative z-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-10 text-white overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
                                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
                                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-10">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
                                            <FiStar className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="text-2xl font-bold">Websterwork</span>
                                    </div>
                                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                                        Create a new password.
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                                            Almost there.
                                        </span>
                                    </h2>
                                    <p className="text-lg text-white/80 mb-10 leading-relaxed">
                                        Choose a strong, unique password to keep your account secure.
                                    </p>
                                    <div className="grid grid-cols-2 gap-5 mb-10">
                                        {[
                                            { icon: FiZap, label: "Instant delivery" },
                                            { icon: FiGlobe, label: "Global edge" },
                                            { icon: FiShield, label: "Bank-grade security" },
                                            { icon: FiUsers, label: "24/7 support" },
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
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Reset Password Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-full max-w-md mx-auto lg:mx-0"
                        >
                            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100 dark:border-gray-800">

                                {/* Back to Login Link */}
                                <Link
                                    href="/portal/login"
                                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-6 transition-colors group"
                                >
                                    <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Back to sign in
                                </Link>

                                {/* Header */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                                        RESET PASSWORD
                                    </h3>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {isSuccess ? "Password updated!" : "Set new password"}
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        {isSuccess
                                            ? "Your password has been reset successfully."
                                            : "Enter a new password for your account."}
                                    </p>
                                </div>

                                {/* Success Message */}
                                <AnimatePresence mode="wait">
                                    {isSuccess && (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mb-6 p-4 rounded-xl flex items-start gap-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900"
                                        >
                                            <div className="flex-shrink-0 text-emerald-600 dark:text-emerald-400">
                                                <FiCheckCircle className="w-5 h-5" />
                                            </div>
                                            <p className="text-sm text-emerald-700 dark:text-emerald-300">
                                                {message}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Error Message */}
                                <AnimatePresence mode="wait">
                                    {!isSuccess && message && (
                                        <motion.div
                                            key={`error-${message}`}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mb-6 p-4 rounded-xl flex items-start gap-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900"
                                        >
                                            <div className="flex-shrink-0 text-rose-600 dark:text-rose-400">
                                                <FiAlertCircle className="w-5 h-5" />
                                            </div>
                                            <p className="text-sm text-rose-700 dark:text-rose-300">
                                                {message}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Form */}
                                {!isSuccess && (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* New Password */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                                New password
                                            </label>
                                            <div className="relative group">
                                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                                <input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                        setErrors({});
                                                        setMessage(null);
                                                    }}
                                                    onBlur={() => handleBlur('password')}
                                                    onFocus={() => {
                                                        setErrors({});
                                                        setMessage(null);
                                                    }}
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

                                            {/* Password strength indicator */}
                                            {password && (
                                                <div className="mt-3">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex gap-1.5">
                                                            {[0, 1, 2, 3, 4].map((i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`h-2 w-2 rounded-full transition-all ${i < passwordStrength + 1
                                                                            ? strengthColor[passwordStrength]
                                                                            : 'bg-gray-200 dark:bg-gray-700'
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                            {strengthText[passwordStrength]}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                                        Use at least 6 characters with mix of letters, numbers & symbols
                                                    </p>
                                                </div>
                                            )}
                                            {errors.password && (
                                                <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.password}</p>
                                            )}
                                        </div>

                                        {/* Confirm Password */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                                Confirm password
                                            </label>
                                            <div className="relative group">
                                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                                <input
                                                    id="confirm"
                                                    type={showConfirm ? "text" : "password"}
                                                    value={confirm}
                                                    onChange={(e) => {
                                                        setConfirm(e.target.value);
                                                        setErrors({});
                                                        setMessage(null);
                                                    }}
                                                    onBlur={() => handleBlur('confirm')}
                                                    onFocus={() => {
                                                        setErrors({});
                                                        setMessage(null);
                                                    }}
                                                    className={`w-full pl-9 pr-10 py-3 bg-gray-50 dark:bg-gray-800/50 border-2 rounded-xl transition-all ${errors.confirm
                                                            ? 'border-rose-500 focus:border-rose-500 dark:focus:border-rose-400 focus:ring-rose-500/20'
                                                            : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20'
                                                        } focus:outline-none focus:ring-4 text-gray-900 dark:text-white`}
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirm(!showConfirm)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                                >
                                                    {showConfirm ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                            {errors.confirm && (
                                                <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.confirm}</p>
                                            )}
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
                                                    <span>Resetting...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <span>Reset password</span>
                                                    <FiCheck className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}

                                {/* Success state actions */}
                                {isSuccess && (
                                    <div className="space-y-3">
                                        <Link
                                            href="/portal/login"
                                            className="w-full px-4 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                                        >
                                            <span>Sign in to your account</span>
                                            <FiArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                )}

                                {/* Security Note */}
                                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                                    <div className="flex items-start gap-3">
                                        <FiShield className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                            This process is secured by 256-bit encryption. We'll never ask for your password via email.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Help Badge */}
                            <div className="mt-6 text-center">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-900 rounded-full shadow-sm border border-gray-200 dark:border-gray-800">
                                    <FiLock className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                        Need help? <Link href="/contact" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">Contact support →</Link>
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