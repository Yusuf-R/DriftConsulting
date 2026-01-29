// components/admin/dashboard/ActiveProjectsGrid.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, TrendingUp, ArrowRight, User } from "lucide-react";
import type { ActiveProject } from "@/lib/types/dashboard";

interface ActiveProjectsGridProps {
    projects: ActiveProject[];
}

const categoryColors = {
    Residential: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Commercial: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Institutional: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Hospitality: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Government: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function ActiveProjectsGrid({ projects }: ActiveProjectsGridProps) {
    const formatDate = (date?: Date) => {
        if (!date) return "TBD";
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Active Projects
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Currently ongoing construction projects
                    </p>
                </div>
                <Link
                    href="/admin/protected/projects"
                    className="text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 flex items-center gap-1 group"
                >
                    View all
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 group"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <span
                                className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                                    categoryColors[project.category as keyof typeof categoryColors]
                                }`}
                            >
                                {project.category}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                                <TrendingUp className="w-3 h-3" />
                                {project.progress}%
                            </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            {project.title}
                        </h4>

                        {/* Client */}
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                            <User className="w-4 h-4" />
                            <span>{project.client}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                    Progress
                                </span>
                                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                                    {project.progress}%
                                </span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${project.progress}%` }}
                                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{formatDate(project.dueDate)}</span>
                            </div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white">
                                {project.value}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}