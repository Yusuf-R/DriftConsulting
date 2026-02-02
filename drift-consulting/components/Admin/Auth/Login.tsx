// app/(admin)/admin/auth/login/page.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import {adminLoginSchema, type AdminLoginData} from "@/lib/validations";
import Image from "next/image";
import {toast} from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export default function AdminLogin() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<AdminLoginData>({
        resolver: zodResolver(adminLoginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (data: AdminLoginData) => {
        try {
            toast.loading("Logging into your account...", { id: "login" });

            // Step 1: Validate credentials and check rate limits via API
            const checkResponse = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            const checkResult = await checkResponse.json();

            if (!checkResponse.ok || !checkResult.success) {
                toast.dismiss("login");

                const errorMessages: Record<string, { title: string; duration: number }> = {
                    LOGIN_EMAIL_RATE_LIMIT_EXCEEDED: { title: "Account Locked", duration: 7000 },
                    LOGIN_IP_RATE_LIMIT_EXCEEDED: { title: "Too Many Attempts", duration: 7000 },
                    INVALID_CREDENTIALS: { title: "Invalid Credentials", duration: 4000 },
                    ACCOUNT_DEACTIVATED: { title: "Account Deactivated", duration: 5000 },
                    USE_GOOGLE_SIGNIN: { title: "Use Google Sign In", duration: 5000 },
                };

                const error = errorMessages[checkResult.code] || { title: "Login Failed", duration: 4000 };

                toast.error(error.title, {
                    description: checkResult.message,
                    duration: error.duration,
                });
                return;
            }

            // Step 2: Create session with NextAuth
            const sessionResult = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            toast.dismiss("login");

            if (sessionResult?.error || !sessionResult?.ok) {
                toast.error("Session Creation Failed", {
                    description: "Credentials valid but couldn't create session. Please try again.",
                    duration: 4000,
                });
                return;
            }

            // Success!
            toast.success("Login successful!", {
                duration: 2000,
            });

            router.push("/admin/protected/dashboard");

        } catch (error: any) {
            toast.dismiss("login");
            console.error('Login error:', error);
            toast.error("An unexpected error occurred", {
                description: error.message || "Please try again later."
            });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signIn("google", { redirectTo: "/admin/protected/dashboard" });
        } catch (error) {
            setError("root", {
                message: "Failed to sign in with Google",
            });
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 opacity-10"
                         style={{
                             backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
                             backgroundSize: '50px 50px'
                         }}
                    />
                    <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 animate-pulse" />
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Logo/Brand */}
                        <div className="flex items-center gap-3 mb-12">
                            <Image
                                src="/dark_mode.svg"
                                alt="Drift Consulting Logo"
                                width={80}
                                height={80}
                                className="hidden dark:block drop-shadow-lg"
                            />
                            <div>
                                <h1 className="text-2xl font-bold">Drift Consulting</h1>
                                <p className="text-sm text-gray-400">Admin Portal</p>
                            </div>
                        </div>

                        {/* Hero Content */}
                        <div className="space-y-6 max-w-md">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
                                <Shield className="w-4 h-4 text-amber-400" />
                                <span className="text-sm font-semibold uppercase tracking-wider">
                                    Secure Access
                                </span>
                            </div>

                            <h2 className="text-4xl font-bold leading-tight">
                                Management {" "}
                                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                                    Portal
                                </span>
                            </h2>

                            <p className="text-lg text-gray-300 leading-relaxed">
                                Access your project dashboard, client communications, and comprehensive
                                analytics from one centralized command center.
                            </p>

                            {/* Features */}
                            <div className="space-y-4 pt-8">
                                {[
                                    "Real-time project tracking",
                                    "Client & contact management",
                                    "Analytics and reporting",
                                    "Secure document storage"
                                ].map((feature, idx) => (
                                    <motion.div
                                        key={feature}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + idx * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                                        <span className="text-gray-300">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                        <Image
                            src="/dark_mode.svg"
                            alt="Drift Consulting Logo"
                            width={50}
                            height={50}
                            className="hidden dark:block drop-shadow-lg"
                        />
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Drift Consulting</h1>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Admin Portal</p>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            Welcome back
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Sign in to access your admin dashboard
                        </p>
                    </div>

                    {/* Error Message */}
                    {errors.root && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3"
                        >
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-600 dark:text-red-400">
                                {errors.root.message}
                            </p>
                        </motion.div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    className={`w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border ${
                                        errors.email
                                            ? 'border-red-300 dark:border-red-700'
                                            : 'border-slate-200 dark:border-slate-700'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 transition-all`}
                                    placeholder="admin@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    {...register("password")}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    className={`w-full pl-11 pr-11 py-3 bg-slate-50 dark:bg-slate-800 border ${
                                        errors.password
                                            ? 'border-red-300 dark:border-red-700'
                                            : 'border-slate-200 dark:border-slate-700'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 transition-all`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    {...register("rememberMe")}
                                    type="checkbox"
                                    className="w-4 h-4 text-amber-600 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded focus:ring-amber-500 focus:ring-2"
                                />
                                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                                    Remember me
                                </span>
                            </label>

                            <Link
                                href="/admin/auth/reset-password"
                                className="text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>logging in...</span>
                                </>
                            ) : (
                                <>
                                    <span>login</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white dark:bg-slate-900 text-slate-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow group"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            Continue with Google
                        </span>
                    </button>

                    {/* Sign Up Link */}
                    <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/admin/auth/signup"
                            className="font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
                        >
                            Request Access
                        </Link>
                    </p>

                    <div className="mt-4 text-center">
                        <Link
                            href="/admin/auth/reset-password"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}