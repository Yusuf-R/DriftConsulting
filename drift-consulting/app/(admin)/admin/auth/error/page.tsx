// app/(admin)/admin/auth/error/page.tsx
"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    AlertCircle, ShieldAlert, Lock, ServerCrash,
    ArrowLeft, Home, RefreshCw
} from "lucide-react";

export default function AuthError() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const error = searchParams.get("error");

    const errorConfig = {
        Configuration: {
            icon: ServerCrash,
            title: "Configuration Error",
            message: "There's an issue with the authentication configuration. Please contact support.",
            color: "text-orange-500",
            bgColor: "bg-orange-500/10",
        },
        AccessDenied: {
            icon: Lock,
            title: "Access Denied",
            message: "You don't have permission to access this resource.",
            color: "text-red-500",
            bgColor: "bg-red-500/10",
        },
        Verification: {
            icon: ShieldAlert,
            title: "Verification Failed",
            message: "The verification link is invalid or has expired.",
            color: "text-yellow-500",
            bgColor: "bg-yellow-500/10",
        },
        OAuthSignin: {
            icon: AlertCircle,
            title: "OAuth Sign In Error",
            message: "There was an error signing in with your OAuth provider.",
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
        },
        OAuthCallback: {
            icon: AlertCircle,
            title: "OAuth Callback Error",
            message: "There was an error during the OAuth callback.",
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
        },
        OAuthCreateAccount: {
            icon: AlertCircle,
            title: "Account Creation Error",
            message: "Could not create an account with your OAuth provider.",
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
        },
        EmailCreateAccount: {
            icon: AlertCircle,
            title: "Email Account Error",
            message: "Could not create an account with your email.",
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
        },
        Callback: {
            icon: ServerCrash,
            title: "Callback Error",
            message: "There was an error during the authentication callback.",
            color: "text-red-500",
            bgColor: "bg-red-500/10",
        },
        OAuthAccountNotLinked: {
            icon: Lock,
            title: "Account Not Linked",
            message: "This email is already associated with another account. Please sign in with your original method.",
            color: "text-yellow-500",
            bgColor: "bg-yellow-500/10",
        },
        EmailSignin: {
            icon: AlertCircle,
            title: "Email Sign In Error",
            message: "There was an error sending the email verification.",
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
        },
        CredentialsSignin: {
            icon: Lock,
            title: "Sign In Failed",
            message: "Invalid credentials. Please check your email and password.",
            color: "text-red-500",
            bgColor: "bg-red-500/10",
        },
        SessionRequired: {
            icon: Lock,
            title: "Session Required",
            message: "You need to be signed in to access this page.",
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
        },
        Default: {
            icon: AlertCircle,
            title: "Authentication Error",
            message: "An unexpected error occurred during authentication.",
            color: "text-gray-500",
            bgColor: "bg-gray-500/10",
        },
    };

    const config = errorConfig[error as keyof typeof errorConfig] || errorConfig.Default;
    const Icon = config.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                    {/* Error Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
                    >
                        <Icon className={`w-8 h-8 ${config.color}`} />
                    </motion.div>

                    {/* Error Title */}
                    <h1 className="text-2xl font-bold text-slate-900 text-center mb-3">
                        {config.title}
                    </h1>

                    {/* Error Message */}
                    <p className="text-slate-600 text-center mb-8">
                        {config.message}
                    </p>

                    {/* Error Code (if available) */}
                    {error && (
                        <div className="bg-slate-50 rounded-lg p-3 mb-6">
                            <p className="text-xs text-slate-500 text-center font-mono">
                                Error Code: {error}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={() => router.back()}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </button>

                        <Link
                            href="/admin/auth/login"
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Login
                        </Link>

                        <Link
                            href="/"
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-slate-600 hover:text-slate-900 transition-colors font-medium"
                        >
                            <Home className="w-4 h-4" />
                            Go Home
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}