// components/admin/dashboard/RecentContactsTable.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, MapPin, ArrowRight, Clock } from "lucide-react";
import type { RecentContact } from "@/lib/types/dashboard";

interface RecentContactsTableProps {
    contacts: RecentContact[];
}

const statusColors = {
    new: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    contacted: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    "in-discussion": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    converted: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    closed: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
};

export default function RecentContactsTable({ contacts }: RecentContactsTableProps) {
    const formatDate = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return "Today";
        if (days === 1) return "Yesterday";
        return `${days} days ago`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Recent Contacts
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Latest inquiries from potential clients
                    </p>
                </div>
                <Link
                    href="/admin/protected/contacts"
                    className="text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 flex items-center gap-1 group"
                >
                    View all
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                            Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                            Project Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                            Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                            Date
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {contacts.map((contact, index) => (
                        <motion.tr
                            key={contact.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-semibold text-sm">
                                                {contact.name.charAt(0)}
                                            </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                                            {contact.name}
                                        </p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                            <Mail className="w-3 h-3" />
                                            {contact.email}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-slate-900 dark:text-white capitalize">
                                        {contact.projectType}
                                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                                    <MapPin className="w-3 h-3" />
                                    {contact.location}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                            statusColors[contact.status]
                                        }`}
                                    >
                                        {contact.status.replace("-", " ")}
                                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                                    <Clock className="w-3 h-3" />
                                    {formatDate(contact.createdAt)}
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}