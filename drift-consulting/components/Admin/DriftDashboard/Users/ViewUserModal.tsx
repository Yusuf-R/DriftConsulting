// components/Admin/DriftDashboard/Users/ViewUserModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Shield, Clock, Calendar, Globe, CheckCircle, XCircle } from 'lucide-react';

interface ViewUserModalProps {
    isOpen: boolean;
    user: any;
    onClose: () => void;
}

export default function ViewUserModal({ isOpen, user, onClose }: ViewUserModalProps) {
    const formatDate = (date?: Date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const roleConfig = {
        superAdmin: { color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', label: 'Super Admin' },
        admin: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', label: 'Admin' },
        support: { color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400', label: 'Support' },
    };

    return (
        <AnimatePresence>
            {isOpen && user && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt={user.name}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white font-semibold text-2xl">
                                            {user.name?.charAt(0) || user.email?.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {user.name || 'No name'}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Status & Role */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Role</p>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${roleConfig[user.role as keyof typeof roleConfig]?.color}`}>
                                        <Shield className="w-4 h-4" />
                                        {roleConfig[user.role as keyof typeof roleConfig]?.label}
                                    </span>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Status</p>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                                        user.isActive
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                        {user.isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                        {user.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>

                            {/* Account Details */}
                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                    Account Details
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <Globe className="w-4 h-4" />
                                            <span className="text-sm">Provider</span>
                                        </div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-white capitalize">
                                            {user.provider}
                                        </span>
                                    </div>

                                    {user.providerId && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">Provider ID</span>
                                            <span className="text-sm font-medium text-slate-900 dark:text-white font-mono">
                                                {user.providerId}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm">Last Login</span>
                                        </div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                                            {formatDate(user.lastLogin)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">Created At</span>
                                        </div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                                            {formatDate(user.createdAt)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">Updated At</span>
                                        </div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                                            {formatDate(user.updatedAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}