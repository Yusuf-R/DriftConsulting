// app/(admin)/admin/protected/layout.tsx
"use client";

import { ReactNode, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SessionProvider from "@/app/providers/SessionProvider/SessionProvider";
import SideNav from "@/components/Admin/DriftDashboard/SideNav";
import TopNav from "@/components/Admin/DriftDashboard/TopNav";
import type { NavState, UserData } from "@/lib/types/nav";

interface ProtectedLayoutProps {
    children: ReactNode;
}

function ProtectedLayoutContent({ children }: ProtectedLayoutProps) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [navState, setNavState] = useState<NavState>("full");

    // Redirect if not authenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/auth/login");
        }
    }, [status, router]);

    // Loading state
    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">Loading...</p>
                </div>
            </div>
        );
    }

    // Not authenticated
    if (!session?.user) {
        return null;
    }

    // Prepare user data
    const userData: UserData = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
        image: session.user.image,
    };

    // Toggle sidebar nav state
    const toggleNavState = () => {
        setNavState((prev) => {
            if (prev === "full") return "icon";
            if (prev === "icon") return "hidden";
            return "full";
        });
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
            {/* Sidebar */}
            <aside className={`${navState === "hidden" ? "hidden" : "block"}`}>
                <SideNav
                    navState={navState}
                    activeRoute={pathname}
                    userData={userData}
                />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <TopNav onToggleSideNav={toggleNavState} userData={userData} />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6"
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    // Wrap with SessionProvider ONLY in protected routes
    return (
        <SessionProvider>
            <ProtectedLayoutContent>{children}</ProtectedLayoutContent>
        </SessionProvider>
    );
}