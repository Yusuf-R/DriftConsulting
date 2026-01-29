// components/admin/dashboard/DashboardOverview.tsx
"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { AuthenticatedUser } from "@/lib/auth/requireRole";

interface DashboardOverviewProps {
    user: AuthenticatedUser;
}

export default function DashboardOverview({ user }: DashboardOverviewProps) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 rounded-xl p-6 md:p-8 text-white shadow-lg"
        >
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        {user.name?.split(" ")[0] || "Admin"}!
                    </h1>
                    <p className="text-white/80 text-sm md:text-base">
                        Here&apos;s what&apos;s happening with your projects today.
                    </p>
                </div>

                {/* Role Badge */}

            </div>
        </motion.div>
    );
}