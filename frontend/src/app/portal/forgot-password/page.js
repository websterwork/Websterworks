"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiMail, FiUser, FiArrowLeft, FiArrowRight, FiCheck,
    FiShield, FiZap, FiStar, FiGlobe, FiUsers, FiGithub,
    FiTwitter, FiFigma, FiDribbble, FiLock, FiAlertCircle,
    FiSend, FiCheckCircle
} from "react-icons/fi";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const {
        apiCall,
        loading: authLoading,
        error: authError,
        clearAuthError // ✅ Use the new clearAuthError function
    } = useAuth();

    const [identifier, setIdentifier] = useState("");
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState('form'); // form, preview, success

    const validateForm = () => {
        const newErrors = {};
        if (!identifier.trim()) {
            newErrors.identifier = "Username or email is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLookup = async (e) => {
        e?.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setMessage(null);
        clearAuthError(); // ✅ Use clearAuthError instead of setError

        try {
            const data = await apiCall('/api/auth/forgot-lookup', 'POST', { identifier });
            setPreview(data);
            setStep('preview');
        } catch (err) {
            setMessage(err?.message || "We couldn't find an account with that information");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async () => {
        setLoading(true);
        setMessage(null);
        clearAuthError(); // ✅ Use clearAuthError instead of setError

        try {
            await apiCall('/api/auth/forgot-confirm', 'POST', { userId: preview.id });
            setStep('success');
            setPreview(null);
            setIdentifier("");
        } catch (err) {
            setMessage(err?.message || "Failed to send reset link");
        } finally {
            setLoading(false);
        }
    };

    // 🔥 COMPLETE ERROR CLEARING FUNCTION
    const clearAllErrors = () => {
        setErrors({});
        setMessage(null);
        clearAuthError(); // ✅ Clear auth error from context
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="container mx-auto px-4 py-16 lg:py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* ✅ Left Column - BRAND & VALUE PROPOSITION (BANNER) */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative hidden lg:block"
                        >
                            {/* Background glow */}
                            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl" />

                            <div className="relative z-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-10 text-white overflow-hidden shadow-2xl">
                                {/* Animated background pattern */}
                                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
                                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
                                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

                                <div className="relative z-10">
                                    {/* Logo */}
                                    <div className="flex items-center gap-3 mb-10">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
                                            <FiStar className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="text-2xl font-bold">Websterwork</span>
                                    </div>

                                    {/* Headline */}
                                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                                        Reset your password.
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                                            We've got you covered.
                                        </span>
                                    </h2>

                                    <p className="text-lg text-white/80 mb-10 leading-relaxed">
                                        Secure, fast, and reliable. Reset your password in minutes and get back to building.
                                    </p>

                                    {/* Feature grid */}
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

                                    {/* Trust badges */}
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

                        {/* Right Column - Forgot Password Form */}
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
                                        PASSWORD RESET
                                    </h3>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {step === 'form' && "Forgot password?"}
                                        {step === 'preview' && "Confirm your account"}
                                        {step === 'success' && "Check your email"}
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        {step === 'form' && "No worries. We'll send you reset instructions."}
                                        {step === 'preview' && "Is this the account you want to reset?"}
                                        {step === 'success' && "We've sent a reset link to your email."}
                                    </p>
                                </div>

                                {/* Error/Success Message */}
                                <AnimatePresence mode="wait">
                                    {(authError || message) && (
                                        <motion.div
                                            key={`error-${authError}-${message}`} // 🔥 Dynamic key forces re-render
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${step === 'success' || message?.includes('sent')
                                                ? 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900'
                                                : 'bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900'
                                                }`}
                                        >
                                            <div className={`flex-shrink-0 ${step === 'success' || message?.includes('sent')
                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-rose-600 dark:text-rose-400'
                                                }`}>
                                                {step === 'success' || message?.includes('sent')
                                                    ? <FiCheckCircle className="w-5 h-5" />
                                                    : <FiAlertCircle className="w-5 h-5" />
                                                }
                                            </div>
                                            <p className={`text-sm ${step === 'success' || message?.includes('sent')
                                                ? 'text-emerald-700 dark:text-emerald-300'
                                                : 'text-rose-700 dark:text-rose-300'
                                                }`}>
                                                {authError || message}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Form Steps */}
                                <AnimatePresence mode="wait">
                                    {step === 'form' && (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onSubmit={handleLookup}
                                            className="space-y-6"
                                        >
                                            {/* Identifier Input */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                                    Username or email
                                                </label>
                                                <div className="relative group">
                                                    {identifier.includes('@') ? (
                                                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                                    ) : (
                                                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                                    )}
                                                    <input
                                                        type="text"
                                                        value={identifier}
                                                        onChange={(e) => {
                                                            setIdentifier(e.target.value);
                                                            // 🔥 CLEAR EVERYTHING on every keystroke
                                                            clearAllErrors();
                                                        }}
                                                        onFocus={() => {
                                                            // 🔥 CLEAR EVERYTHING on focus
                                                            clearAllErrors();
                                                        }}
                                                        className={`w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-2 rounded-xl transition-all ${errors.identifier
                                                            ? 'border-rose-500 focus:border-rose-500 dark:focus:border-rose-400 focus:ring-rose-500/20'
                                                            : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20'
                                                            } focus:outline-none focus:ring-4 text-gray-900 dark:text-white`}
                                                        placeholder="you@example.com or username"
                                                    />
                                                </div>
                                                {errors.identifier && (
                                                    <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                                                        {errors.identifier}
                                                    </p>
                                                )}
                                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                                                    We'll send a reset link to this account's email address.
                                                </p>
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={loading || authLoading}
                                                className="w-full mt-4 px-4 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                                            >
                                                {loading || authLoading ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        <span>Searching...</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span>Find account</span>
                                                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </motion.form>
                                    )}

                                    {step === 'preview' && preview && (
                                        <motion.div
                                            key="preview"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="space-y-6"
                                        >
                                            {/* Account Preview Card */}
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center gap-4">
                                                    {/* Avatar */}
                                                    <div className="relative">
                                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                                                            {preview.avatarUrl ? (
                                                                <Image
                                                                    src={preview.avatarUrl}
                                                                    alt="avatar"
                                                                    width={64}
                                                                    height={64}
                                                                    className="w-full h-full rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <span className="text-2xl font-bold text-white">
                                                                    {preview.username?.[0]?.toUpperCase() || 'U'}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                                                    </div>

                                                    {/* User Info */}
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {preview.username || 'User'}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                            {preview.emailMasked || 'email@example.com'}
                                                        </p>
                                                        {preview.name && (
                                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                                {preview.name}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                                <button
                                                    onClick={handleConfirm}
                                                    disabled={loading || authLoading}
                                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl disabled:opacity-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                                                >
                                                    {loading || authLoading ? (
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    ) : (
                                                        <>
                                                            <FiSend className="w-4 h-4" />
                                                            <span>Send reset link</span>
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setStep('form');
                                                        setPreview(null);
                                                        setIdentifier("");
                                                        clearAllErrors();
                                                    }}
                                                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all"
                                                >
                                                    Try again
                                                </button>
                                            </div>

                                            <p className="text-xs text-center text-gray-500 dark:text-gray-500 pt-2">
                                                We'll send a password reset link to the email associated with this account.
                                            </p>
                                        </motion.div>
                                    )}

                                    {step === 'success' && (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="text-center py-4"
                                        >
                                            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                                <FiCheck className="w-10 h-10 text-white" />
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                                Reset link sent!
                                            </h3>

                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                                We've sent a password reset link to the email address associated with your account.
                                                The link will expire in 1 hour.
                                            </p>

                                            <div className="space-y-3">
                                                <button
                                                    onClick={() => router.push('/portal/login')}
                                                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                                                >
                                                    <span>Return to sign in</span>
                                                    <FiArrowRight className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setStep('form');
                                                        setPreview(null);
                                                        setIdentifier("");
                                                        clearAllErrors();
                                                    }}
                                                    className="w-full px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                                >
                                                    Didn't receive the email? Try again
                                                </button>
                                            </div>

                                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900">
                                                <p className="text-xs text-blue-700 dark:text-blue-300">
                                                    <strong className="font-semibold">Tip:</strong> Check your spam folder and make sure {preview?.emailMasked || 'your email'} is correct.
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

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