// components/Admin/DriftDashboard/Users/EditUserModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import AdminUtils from '@/utils/AdminUtils';
import { toast } from 'sonner';

interface EditUserModalProps {
    isOpen: boolean;
    user: any;
    onClose: () => void;
    onSuccess: (user: any) => void;
}

export default function EditUserModal({ isOpen, user, onClose, onSuccess }: EditUserModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        role: 'support' as 'superAdmin' | 'admin' | 'support',
        isActive: true,
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                role: user.role || 'support',
                isActive: user.isActive ?? true,
            });
        }
    }, [user]);

    const updateMutation = useMutation({
        mutationFn: (data: { name: string; role: 'superAdmin' | 'admin' | 'support'; isActive: boolean }) =>
            AdminUtils.updateUser(user._id, data),
        onSuccess: (response) => {
            toast.success('User updated successfully');
            onSuccess(response.user);
            onClose();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update user');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateMutation.mutate(formData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
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
                        className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Edit className="w-6 h-6" />
                                    Edit User
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">
                                    Update user information
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Email (Read-only)
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Role
                                </label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                                >
                                    <option value="support">Support</option>
                                    <option value="admin">Admin</option>
                                    <option value="superAdmin">Super Admin</option>
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Active Account
                                    </span>
                                </label>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-8">
                                    Inactive users cannot log in to the system
                                </p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={updateMutation.isPending}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {updateMutation.isPending ? 'Updating...' : 'Update User'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}