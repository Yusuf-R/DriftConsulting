// components/admin/dashboard/QuickActionsGrid.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Plus,
    Mail,
    FileText,
    Settings,
    Users,
    BarChart,
} from "lucide-react";

interface QuickActionsGridProps {
    userRole: string;
}

export default function QuickActionsGrid({ userRole }: QuickActionsGridProps) {
    const actions = [
        {
            title: "New Project",
            description: "Add a new construction project",
            icon: Plus,
            href: "/admin/protected/projects/new",
            color: "from-blue-500 to-cyan-500",
            roles: ["admin", "superAdmin"],
        },
        {
            title: "View Contacts",
            description: "Manage client inquiries",
            icon: Mail,
            href: "/admin/protected/contacts",
            color: "from-purple-500 to-pink-500",
            roles: ["admin", "superAdmin", "support"],
        },
        {
            title: "Add Content",
            description: "Create blog posts or updates",
            icon: FileText,
            href: "/admin/protected/content/new",
            color: "from-green-500 to-emerald-500",
            roles: ["admin", "superAdmin"],
        },
        {
            title: "Analytics",
            description: "View detailed reports",
            icon: BarChart,
            href: "/admin/protected/analytics",
            color: "from-orange-500 to-red-500",
            roles: ["admin", "superAdmin"],
        },
        {
            title: "Manage Users",
            description: "User & role management",
            icon: Users,
            href: "/admin/protected/users",
            color: "from-indigo-500 to-purple-500",
            roles: ["superAdmin"],
        },
        {
            title: "Settings",
            description: "Configure system settings",
            icon: Settings,
            href: "/admin/protected/settings",
            color: "from-slate-500 to-slate-600",
            roles: ["admin", "superAdmin"],
        },
    ];

    // Filter actions based on user role
    const filteredActions = actions.filter(
        (action) => !action.roles || action.roles.includes(userRole)
    );

    return (
        <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {filteredActions.map((action, index) => {
                    const Icon = action.icon;

                    return (
                        <motion.div
                            key={action.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={action.href}
                                className="block group"
                            >
                                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:scale-105 transition-all duration-200">
                                    <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                                        {action.title}
                                    </h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                                        {action.description}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}