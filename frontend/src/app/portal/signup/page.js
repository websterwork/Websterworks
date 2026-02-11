"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail, FiLock, FiUser, FiCheck, FiEye, FiEyeOff,
  FiArrowRight, FiArrowLeft, FiShield, FiZap, FiStar, FiCheckCircle,
  FiGlobe, FiUsers, FiGithub, FiTwitter, FiFigma, FiDribbble, FiCoffee
} from "react-icons/fi";
import {
  validateEmail,
  validatePassword,
  sanitizeInput,
  validateUsername
} from "@/utils/security";

export default function SignupPage() {
  const router = useRouter();
  const {
    signup,
    verifySignup,
    resendVerification,
    pendingSignup,
    loading,
    error: authError,
    clearAuthError // ✅ Use the new clearAuthError function
  } = useAuth();

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState('form');
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  // Clear auth error when component mounts or step changes
  useEffect(() => {
    clearAuthError();
  }, [step, clearAuthError]);

  // Password strength indicator
  const getPasswordStrength = useCallback((pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.match(/[a-z]/)) score++;
    if (pwd.match(/[A-Z]/)) score++;
    if (pwd.match(/[0-9]/)) score++;
    if (pwd.match(/[^a-zA-Z0-9]/)) score++;
    return score;
  }, []);

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

  // 🔥 COMPLETE ERROR CLEARING FUNCTION
  const clearAllErrors = () => {
    setErrors({});
    setMessage(null);
    clearAuthError();
  };

  // Clear field error when user types
  const clearFieldError = (field) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Handle field change with error clearing
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    clearFieldError('username');
    clearFieldError('agreeToTerms');
    clearAuthError(); // ✅ Clear auth error on typing
  };

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

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    clearFieldError('confirmPassword');
    clearAuthError(); // ✅ Clear auth error on typing
  };

  const handleTermsChange = (e) => {
    setAgreeToTerms(e.target.checked);
    clearFieldError('agreeToTerms');
    clearAuthError(); // ✅ Clear auth error on typing
  };

  // Handle field blur for validation
  const handleBlur = (field) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));

    // Validate on blur
    if (field === 'username' && username.trim() && !validateUsername(username)) {
      setErrors(prev => ({ ...prev, username: "3-20 characters: letters, numbers, underscore" }));
    }
    if (field === 'email' && email.trim() && !validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
    }
    if (field === 'password' && password) {
      const passwordError = validatePassword(password);
      if (passwordError) {
        setErrors(prev => ({ ...prev, password: passwordError }));
      }
    }
    if (field === 'confirmPassword' && confirmPassword && password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
    }
  };

  // Validation
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (!validateUsername(username)) {
      newErrors.username = "3-20 characters: letters, numbers, underscore";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password, confirmPassword, agreeToTerms, username]);

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setMessage(null);
    clearAuthError(); // ✅ Clear auth error before submission

    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      document.getElementById(firstError)?.focus();
      return;
    }

    try {
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedUsername = sanitizeInput(username);
      await signup(sanitizedEmail, password, sanitizedUsername);
      setStep('verify');
      setMessage('✨ Verification code sent to your email');
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  // Code verification
  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage(null);
    clearAuthError(); // ✅ Clear auth error before verification

    try {
      await verifySignup(code.join(''));
      setMessage('🎉 Verification successful! Redirecting...');
      setStep('done');
      setTimeout(() => router.push('/portal/profile'), 2000);
    } catch (err) {
      setMessage(err?.message || 'Verification failed');
    }
  };

  const handleResend = async () => {
    setMessage(null);
    clearAuthError(); // ✅ Clear auth error before resend

    try {
      await resendVerification();
      setMessage('📨 New code sent!');
    } catch (err) {
      setMessage(err?.message || 'Failed to resend');
    }
  };

  // Reset form when going back to signup
  const handleBackToSignup = () => {
    setStep('form');
    setCode(["", "", "", "", "", ""]);
    clearAllErrors(); // ✅ Clear all errors
  };

  // Code input handlers
  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    clearAllErrors(); // ✅ Clear errors on code input

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
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
              {/* Background glow */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl" />

              <div className="relative z-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-10 text-white overflow-hidden shadow-2xl">
                {/* Animated background pattern */}
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

                <div className="relative z-10">
                  {/* Logo + Badge */}
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

                  {/* Headline */}
                  <h2 className="text-4xl font-bold mb-6 leading-tight">
                    Build faster.
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                      Scale smarter.
                    </span>
                  </h2>

                  <p className="text-lg text-white/80 mb-10 leading-relaxed">
                    Join 50,000+ developers and businesses using Websterwork to ship products faster with enterprise-grade infrastructure.
                  </p>

                  {/* Feature grid */}
                  <div className="grid grid-cols-2 gap-5 mb-10">
                    {[
                      { icon: FiZap, label: "10x faster builds" },
                      { icon: FiGlobe, label: "Global edge" },
                      { icon: FiShield, label: "SOC2 Type II" },
                      { icon: FiUsers, label: "Unlimited seats" },
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

                  {/* Social proof */}
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

                  {/* Testimonial */}
                  <div className="mt-8 p-5 bg-white/5 backdrop-blur-xl rounded-xl border border-white/20">
                    <p className="text-sm text-white/90 italic mb-3">
                      "We migrated 200+ services to Websterwork in 2 weeks. Best decision for our infra team."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        MK
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Michael Kim</p>
                        <p className="text-xs text-white/60">CTO, Loom</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - MODERN FORM */}
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
                    GET STARTED FREE
                  </h3>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {step === 'form' && "Create account"}
                    {step === 'verify' && "Verify email"}
                    {step === 'done' && "Welcome! 🎉"}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step === 'form' && "No credit card required. 14-day free trial."}
                    {step === 'verify' && `We sent a 6-digit code to ${pendingSignup?.email || email}`}
                    {step === 'done' && "Your account is ready. Redirecting you..."}
                  </p>
                </div>

                {/* Messages - WITH DYNAMIC KEY */}
                <AnimatePresence mode="wait">
                  {(authError || message) && (
                    <motion.div
                      key={`error-${authError}-${message}`} // 🔥 Dynamic key forces re-render
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${message?.includes('success') || message?.includes('sent') || message?.includes('🎉') || message?.includes('✨') || message?.includes('📨')
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900'
                          : 'bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900'
                        }`}
                    >
                      <div className={`flex-shrink-0 ${message?.includes('success') || message?.includes('sent') || message?.includes('🎉') || message?.includes('✨') || message?.includes('📨')
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                        }`}>
                        {message?.includes('success') || message?.includes('sent') || message?.includes('🎉') || message?.includes('✨') || message?.includes('📨')
                          ? <FiCheckCircle className="w-5 h-5" />
                          : <FiShield className="w-5 h-5" />
                        }
                      </div>
                      <p className={`text-sm ${message?.includes('success') || message?.includes('sent') || message?.includes('🎉') || message?.includes('✨') || message?.includes('📨')
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
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* Username */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Username
                        </label>
                        <div className="relative group">
                          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            onBlur={() => handleBlur('username')}
                            onFocus={clearAllErrors} // ✅ Clear errors on focus
                            className={`w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-2 rounded-xl transition-all ${errors.username
                                ? 'border-rose-500 focus:border-rose-500 dark:focus:border-rose-400 focus:ring-rose-500/20'
                                : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20'
                              } focus:outline-none focus:ring-4 text-gray-900 dark:text-white`}
                            placeholder="johndoe"
                          />
                        </div>
                        {errors.username ? (
                          <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.username}</p>
                        ) : (
                          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-500">
                            3-20 characters: letters, numbers, underscore
                          </p>
                        )}
                      </div>

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

                        {/* Password strength - clean dots */}
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
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            onBlur={() => handleBlur('confirmPassword')}
                            onFocus={clearAllErrors} // ✅ Clear errors on focus
                            className={`w-full pl-9 pr-10 py-3 bg-gray-50 dark:bg-gray-800/50 border-2 rounded-xl transition-all ${errors.confirmPassword
                                ? 'border-rose-500 focus:border-rose-500 dark:focus:border-rose-400 focus:ring-rose-500/20'
                                : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20'
                              } focus:outline-none focus:ring-4 text-gray-900 dark:text-white`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          >
                            {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.confirmPassword}</p>
                        )}
                      </div>

                      {/* Terms */}
                      <div className="flex items-start pt-2">
                        <div className="flex items-center h-5">
                          <input
                            id="terms"
                            type="checkbox"
                            checked={agreeToTerms}
                            onChange={handleTermsChange}
                            onFocus={clearAllErrors} // ✅ Clear errors on focus
                            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded-lg focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:checked:bg-blue-600"
                          />
                        </div>
                        <label htmlFor="terms" className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                          I agree to the{' '}
                          <Link href="/terms" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">
                            Terms
                          </Link>
                          {' '}and{' '}
                          <Link href="/privacy" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                      {errors.agreeToTerms && (
                        <p className="text-xs text-rose-600 dark:text-rose-400">{errors.agreeToTerms}</p>
                      )}

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 px-4 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Creating account...</span>
                          </div>
                        ) : (
                          <>
                            <span>Get started free</span>
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      {/* Login link */}
                      <p className="mt-6 text-center text-xs text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link href="/portal/login" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">
                          Sign in
                        </Link>
                      </p>
                    </motion.form>
                  )}

                  {step === 'verify' && (
                    <motion.div
                      key="verify"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Code input */}
                      <div className="flex justify-center gap-2">
                        {code.map((digit, index) => (
                          <input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onKeyDown={(e) => handleCodeKeyDown(index, e)}
                            onFocus={clearAllErrors} // ✅ Clear errors on focus
                            className="w-12 h-12 text-center text-lg font-semibold bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 text-gray-900 dark:text-white transition-all"
                            inputMode="numeric"
                            pattern="[0-9]*"
                          />
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={handleVerify}
                          disabled={loading || code.join('').length !== 6}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <FiCheck className="w-4 h-4" />
                              <span>Verify</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleResend}
                          disabled={loading}
                          className="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl disabled:opacity-50 transition-all"
                        >
                          Resend
                        </button>
                      </div>

                      <button
                        onClick={handleBackToSignup}
                        className="flex items-center gap-1 mx-auto text-xs text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                      >
                        <FiArrowLeft className="w-3 h-3" />
                        Back to signup
                      </button>
                    </motion.div>
                  )}

                  {step === 'done' && (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <FiCheck className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Account created!
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                        Redirecting to your dashboard...
                      </p>
                      <div className="flex justify-center">
                        <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Free trial badge */}
              <div className="mt-6 text-center">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-900 rounded-full shadow-sm border border-gray-200 dark:border-gray-800">
                  <FiCoffee className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    14-day free trial • No credit card
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