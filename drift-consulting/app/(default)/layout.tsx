"use client";
import { ReactNode, useEffect } from "react";
import Nav from "@/components/Entry/Nav";
import Footer from "@/components/Entry/Footer";

interface EntryLayoutProps {
    children: ReactNode;
}

export default function DefaultLayout({ children }: EntryLayoutProps) {
    useEffect(() => {
        const originalError = console.error;
        console.error = (...args) => {
            if (
                args[0]?.includes?.('_firefox_') ||
                args[0]?.includes?.('ethereum') ||
                args[0]?.includes?.('reader')
            ) {
                return; // Suppress these specific errors
            }
            originalError(...args);
        };

        return () => {
            console.log = originalError;
        };
    }, []);
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
            {/* Navigation */}
            <Nav
                brand="Drift Consulting"
                brandVariant="stacked" // Options: 'split-color', 'gradient', 'elegant', 'badge', 'stacked', 'minimalist', 'contrast'
            />

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}