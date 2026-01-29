// components/admin/dashboard/StatsGrid.tsx
"use client";

import { motion } from "framer-motion";
import {
    FolderOpen,
    Users,
    TrendingUp,
    CheckCircle,
    Clock,
    Zap,
} from "lucide-react";
import type { DashboardStats } from "@/lib/types/dashboard";

interface StatsGridProps {
    stats: DashboardStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
    const statCards = [
        {
            title: "Total Projects",
            value: stats.totalProjects,
            icon: FolderOpen,
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
            textColor: "text-blue-600 dark:text-blue-400",
            subtitle: `${stats.activeProjects} active`,
        },
        {
            title: "Completed Projects",
            value: stats.completedProjects,
            icon: CheckCircle,
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-500/10 dark:bg-green-500/20",
            textColor: "text-green-600 dark:text-green-400",
            subtitle: "Successfully delivered",
        },
        {
            title: "Total Contacts",
            value: stats.totalContacts,
            icon: Users,
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-500/10 dark:bg-purple-500/20",
            textColor: "text-purple-600 dark:text-purple-400",
            subtitle: `${stats.newContacts} new this week`,
        },
        {
            title: "Active Projects",
            value: stats.activeProjects,
            icon: Clock,
            color: "from-orange-500 to-red-500",
            bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
            textColor: "text-orange-600 dark:text-orange-400",
            subtitle: "In progress",
        },
        {
            title: "Converted Leads",
            value: stats.convertedLeads,
            icon: Zap,
            color: "from-yellow-500 to-amber-500",
            bgColor: "bg-yellow-500/10 dark:bg-yellow-500/20",
            textColor: "text-yellow-600 dark:text-yellow-400",
            subtitle: "From inquiries",
        },
        {
            title: "Total Revenue",
            value: stats.totalRevenue,
            icon: TrendingUp,
            color: "from-indigo-500 to-purple-500",
            bgColor: "bg-indigo-500/10 dark:bg-indigo-500/20",
            textColor: "text-indigo-600 dark:text-indigo-400",
            subtitle: `+${stats.monthlyGrowth}% this month`,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {statCards.map((stat, index) => {
                const Icon = stat.icon;

                return (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                <Icon className={`w-6 h-6 ${stat.textColor}`} />
                            </div>
                            <div className={`text-xs font-medium px-2 py-1 rounded ${stat.bgColor} ${stat.textColor}`}>
                                {index < 3 ? "Active" : "Metric"}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                {stat.title}
                            </h3>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">
                                {stat.value}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {stat.subtitle}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}