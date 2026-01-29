// components/admin/DriftDashboard/SideNav.tsx
"use client";

import React, { useState } from "react";
import {
    Home,
    Users,
    Settings,
    FileText,
    FolderOpen,
    Bell,
    LifeBuoy,
    ChevronDown,
    ChevronUp,
    LogOut,
    Loader2,
    Building2,
    Mail,
    BarChart3,
} from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import type { SideNavProps, MenuItem } from "@/lib/types/nav";

export default function SideNav({ navState, activeRoute, userData }: SideNavProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
    const [loadingRoute, setLoadingRoute] = useState<string | null>(null);

    const menuItems: MenuItem[] = [
        { icon: Home, label: "Dashboard", path: "/admin/protected/dashboard" },
        { icon: FolderOpen, label: "Projects", path: "/admin/protected/projects" },
        { icon: Mail, label: "Contacts", path: "/admin/protected/contacts", badge: 3 },
        { icon: BarChart3, label: "Analytics", path: "/admin/protected/analytics" },
        { icon: FileText, label: "Content", path: "/admin/protected/content" },
        { icon: Users, label: "Users", path: "/admin/protected/users", roles: ["superAdmin", "admin"] },
        { icon: Bell, label: "Notifications", path: "/admin/protected/notifications", badge: 5 },
        { icon: LifeBuoy, label: "Support", path: "/admin/protected/support" },
        { icon: Settings, label: "Settings", path: "/admin/protected/settings" },
    ];

    const isIconOnly = navState === "icon";
    const isHidden = navState === "hidden";

    if (isHidden) return null;

    // Handle navigation with loading state
    const handleNavigation = async (path: string) => {
        if (pathname === path) {
            toast.info("You're already on this page");
            return;
        }

        try {
            setLoadingRoute(path);
            await new Promise(resolve => setTimeout(resolve, 200));
            router.push(path);
        } catch (error) {
            console.error("Navigation error:", error);
            toast.error("Failed to navigate");
        } finally {
            setTimeout(() => {
                setLoadingRoute(null);
            }, 500);
        }
    };

    const handleSignOut = () => {
        setShowSignOutConfirm(true);
        setShowUserMenu(false);
    };

    const confirmSignOut = async () => {
        try {
            await signOut({ redirect: false });
            toast.success("Signed out successfully");
            router.push("/admin/auth/login");
        } catch (error) {
            console.error("Sign out error:", error);
            toast.error("Failed to sign out");
        } finally {
            setShowSignOutConfirm(false);
        }
    };

    const cancelSignOut = () => {
        setShowSignOutConfirm(false);
    };

    // Check if a route is active
    const isRouteActive = (path: string) => {
        return pathname === path || pathname.startsWith(path + "/");
    };

    // Get user initials
    const getUserInitials = () => {
        return userData?.name?.charAt(0).toUpperCase() || userData?.email?.charAt(0).toUpperCase() || "U";
    };

    const IconWithBadge = ({ Icon, count = 0, isLoading = false }: { Icon: any; count?: number; isLoading?: boolean }) => (
        <span className="relative inline-flex items-center justify-center w-5 h-5 flex-shrink-0">
            {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <Icon className="w-5 h-5" />
            )}
            {count > 0 && !isLoading && (
                <span className="absolute -top-1.5 -right-1.5">
                   <Badge
                       variant="destructive"
                       className="h-4 min-w-4 px-1 text-[10px] leading-none rounded-full flex items-center justify-center bg-red-600 text-white dark:bg-red-500 dark:text-white"
                   >
    {count > 99 ? "99+" : count}
</Badge>
                </span>
            )}
        </span>
    );

    return (
        <>
            <motion.div
                initial={false}
                animate={{ width: isIconOnly ? "80px" : "280px" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 relative"
            >
                {/* Logo Section */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <AnimatePresence mode="wait">
                        {isIconOnly ? (
                            <motion.div
                                key="icon-logo"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex justify-center"
                            >
                                <Image
                                    src="/dark_mode.svg"
                                    alt="Drift Consulting Logo"
                                    width={50}
                                    height={50}
                                    // className="hidden dark:block drop-shadow-lg"
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="full-logo"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-3"
                            >
                                <Image
                                    src="/dark_mode.svg"
                                    alt="Drift Consulting Logo"
                                    width={50}
                                    height={50}
                                    // className="hidden dark:block drop-shadow-lg"
                                />
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Drift</h2>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">Admin Panel</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 py-4 overflow-y-auto">
                    <ul className="space-y-2 px-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = isRouteActive(item.path);
                            const isLoading = loadingRoute === item.path;
                            const hasBadge = item.badge && item.badge > 0;

                            // Check role restrictions
                            if (item.roles && !item.roles.includes(userData.role)) {
                                return null;
                            }

                            return (
                                <li key={item.path}>
                                    <button
                                        onClick={() => handleNavigation(item.path)}
                                        disabled={isLoading}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group ${
                                            isActive
                                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30"
                                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        } ${isLoading ? "opacity-75 cursor-not-allowed" : "cursor-pointer hover:scale-[1.02]"}`}
                                        title={isIconOnly ? item.label : ""}
                                    >
                                        {/* Active indicator for icon-only mode */}
                                        {isActive && isIconOnly && (
                                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-amber-500 rounded-r-full" />
                                        )}

                                        {/* Icon + Badge */}
                                        <IconWithBadge Icon={Icon} count={item.badge || 0} isLoading={isLoading} />

                                        {/* Label */}
                                        <AnimatePresence>
                                            {!isIconOnly && (
                                                <motion.span
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: "auto" }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    className="truncate flex-1 text-left text-sm font-medium"
                                                >
                                                    {item.label}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>

                                        {/* Hover tooltip for icon-only mode */}
                                        {isIconOnly && !isLoading && (
                                            <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 dark:bg-slate-800 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 flex items-center gap-2">
                                                {item.label}
                                                {hasBadge && (
                                                    <Badge variant="destructive" className="text-[10px] bg-red-600 text-white dark:bg-red-500 dark:text-white">
                                                        {item.badge}
                                                    </Badge>
                                                )}
                                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900 dark:border-r-slate-800" />
                                            </div>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Profile Section */}
                <div className="border-t border-slate-200 dark:border-slate-800 p-4">
                    <AnimatePresence mode="wait">
                        {isIconOnly ? (
                            <motion.div
                                key="icon-user"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex justify-center"
                            >
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="relative group"
                                >
                                    {userData.image ? (
                                        <img
                                            src={userData.image}
                                            alt={userData.name || "User"}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                                            <span className="text-white text-sm font-semibold">
                                                {getUserInitials()}
                                            </span>
                                        </div>
                                    )}

                                    {/* Tooltip */}
                                    <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 dark:bg-slate-800 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                        {userData.name || userData.email}
                                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900 dark:border-r-slate-800" />
                                    </div>
                                </button>
                            </motion.div>
                        ) : (
                            <motion.button
                                key="full-user"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                            >
                                {userData.image ? (
                                    <img
                                        src={userData.image}
                                        alt={userData.name || "User"}
                                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm font-semibold">
                                            {getUserInitials()}
                                        </span>
                                    </div>
                                )}
                                <div className="flex-1 text-left overflow-hidden">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                        {userData.name || userData.email}
                                    </p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate capitalize">
                                        {userData.role}
                                    </p>
                                </div>
                                {showUserMenu ? (
                                    <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-400 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400 flex-shrink-0" />
                                )}
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* User Menu Dropdown */}
                    <AnimatePresence>
                        {showUserMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`mt-2 bg-slate-100 dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden ${
                                    isIconOnly ? "absolute bottom-20 left-2 w-auto" : "w-full"
                                }`}
                            >
                                <button
                                    onClick={handleSignOut}
                                    className={`flex items-center ${
                                        isIconOnly ? "p-3 justify-center" : "gap-2 px-4 py-3 w-full text-left"
                                    } text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group`}
                                >
                                    <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                    {!isIconOnly && "Sign Out"}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Sign Out Confirmation Modal */}
            <AnimatePresence>
                {showSignOutConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={cancelSignOut}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-800 rounded-xl p-6 w-96 mx-4 border border-slate-200 dark:border-slate-700 shadow-2xl"
                        >
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                Confirm Sign Out
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Are you sure you want to sign out? You'll need to log in again to access the admin panel.
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={cancelSignOut}
                                    className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmSignOut}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                                >
                                    Yes, Sign Out
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}