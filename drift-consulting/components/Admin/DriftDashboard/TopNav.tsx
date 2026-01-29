// components/admin/DriftDashboard/TopNav.tsx
"use client";

import { useState, useEffect } from "react";
import {
    Menu,
    Bell,
    Search,
    Sun,
    Moon,
    Maximize2,
    Minimize2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { TopNavProps } from "@/lib/types/nav";

export default function TopNav({ onToggleSideNav, userData }: TopNavProps) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // Ensure component is mounted before rendering theme-dependent content
    useEffect(() => {
        setMounted(true);
    }, []);

    // Update time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    // Handle fullscreen toggle
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Format date
    const formatDate = () => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
        };
        return currentTime.toLocaleDateString("en-GB", options);
    };

    // Format time
    const formatTime = () => {
        const options: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
        };
        return currentTime.toLocaleTimeString("en-GB", options);
    };

    // Check if it's day or night (6 AM to 6 PM is day)
    const isDayTime = () => {
        const hour = currentTime.getHours();
        return hour >= 6 && hour < 18;
    };

    // Get greeting based on time
    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 lg:px-6 py-3 shadow-sm">
            <div className="flex items-center justify-between">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    {/* Menu Toggle */}
                    <button
                        onClick={onToggleSideNav}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 text-slate-700 dark:text-slate-300 group"
                        aria-label="Toggle sidebar"
                    >
                        <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Greeting & User Info */}
                    <div className="hidden md:block">
                        <h1 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            {userData.name?.split(" ")[0] || "Admin"}
                        </h1>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                            <span>{formatDate()}</span>
                            <span>•</span>
                            <span>{formatTime()}</span>
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                {isDayTime() ? (
                                    <Sun className="w-4 h-4 text-amber-500" />
                                ) : (
                                    <Moon className="w-4 h-4 text-blue-400" />
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    {/* Search Button - Mobile */}
                    <button
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 lg:hidden text-slate-700 dark:text-slate-300"
                        aria-label="Search"
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    {/* Search Bar - Desktop */}
                    <div className="hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2 w-64 xl:w-80">
                        <Search className="w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search projects, contacts..."
                            className="bg-transparent outline-none text-sm text-slate-700 dark:text-slate-300 placeholder:text-slate-400 w-full"
                        />
                    </div>

                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 text-slate-700 dark:text-slate-300 relative group"
                            aria-label="Toggle theme"
                        >
                            <AnimatePresence mode="wait">
                                {theme === "dark" ? (
                                    <motion.div
                                        key="moon"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Moon className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="sun"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Sun className="w-5 h-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Tooltip */}
                            <span className="absolute top-full mt-2 right-0 px-2 py-1 bg-slate-900 dark:bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                {theme === "dark" ? "Light mode" : "Dark mode"}
                            </span>
                        </button>
                    )}

                    {/* Fullscreen Toggle */}
                    <button
                        onClick={toggleFullscreen}
                        className="hidden xl:flex p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 text-slate-700 dark:text-slate-300"
                        aria-label="Toggle fullscreen"
                    >
                        {isFullscreen ? (
                            <Minimize2 className="w-5 h-5" />
                        ) : (
                            <Maximize2 className="w-5 h-5" />
                        )}
                    </button>

                    {/* Notifications */}
                    <button
                        className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 text-slate-700 dark:text-slate-300 group"
                        aria-label="Notifications"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1">
                           <Badge
                               variant="destructive"
                               className="h-4 min-w-4 px-1 text-[10px] leading-none rounded-full flex items-center justify-center bg-red-600 text-white dark:bg-red-500 dark:text-white"
                           >
    5
</Badge>
                        </span>

                        {/* Tooltip */}
                        <span className="absolute top-full mt-2 right-0 px-2 py-1 bg-slate-900 dark:bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            5 new notifications
                        </span>
                    </button>

                    {/* User Role Badge */}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 rounded-lg border border-amber-500/20">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300 capitalize">
                            {userData.role}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}