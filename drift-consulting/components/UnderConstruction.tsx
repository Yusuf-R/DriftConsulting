// components/UnderConstruction.tsx
'use client';

import { motion } from 'framer-motion';
import { Construction, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

interface UnderConstructionProps {
    title?: string;
    message?: string;
    showBackButton?: boolean;
    backHref?: string;
}

export default function UnderConstruction({
                                              title = "Page Under Construction",
                                              message = "We're working hard to bring you this feature. Check back soon!",
                                              showBackButton = true,
                                              backHref = "/admin/protected/dashboard"
                                          }: UnderConstructionProps) {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-2xl mx-auto px-4"
            >
                {/* Animated Construction Icon */}
                <motion.div
                    animate={{
                        rotate: [0, -10, 10, -10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                    className="inline-block mb-8"
                >
                    <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl">
                        <Construction className="w-16 h-16 text-white" />
                    </div>
                </motion.div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                    {title}
                </h1>

                {/* Message */}
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                    {message}
                </p>

                {/* Progress Bars Animation */}
                <div className="space-y-3 mb-8 max-w-md mx-auto">
                    {[60, 80, 45].map((width, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
                        >
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${width}%` }}
                                transition={{ delay: idx * 0.2 + 0.8, duration: 1 }}
                                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Features List */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 mb-8 border border-slate-200 dark:border-slate-700">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
                        Coming Soon
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                        {[
                            'Advanced filtering',
                            'Export functionality',
                            'Bulk operations',
                            'Real-time updates'
                        ].map((feature, idx) => (
                            <motion.div
                                key={feature}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 + idx * 0.1 }}
                                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                            >
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                <span>{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                {showBackButton && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={backHref}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Dashboard</span>
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                        >
                            <Home className="w-5 h-5" />
                            <span>Go to Homepage</span>
                        </Link>
                    </div>
                )}
            </motion.div>
        </div>
    );
}