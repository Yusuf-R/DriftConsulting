// app/(admin)/admin/auth/error/403/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function Error403() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-slate-100 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md text-center"
            >
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <ShieldAlert className="w-10 h-10 text-red-500" />
                    </motion.div>

                    <h1 className="text-6xl font-bold text-slate-900 mb-4">403</h1>
                    <h2 className="text-2xl font-semibold text-slate-800 mb-3">Access Forbidden</h2>
                    <p className="text-slate-600 mb-8">
                        You don't have permission to access this resource. Please contact an administrator if you believe this is an error.
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={() => router.back()}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </button>

                        <Link
                            href="/"
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
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