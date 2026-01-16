"use client";
import { ReactNode } from "react";
import Nav from "@/components/Entry/Nav";
import Footer from "@/components/Entry/Footer";

interface EntryLayoutProps {
    children: ReactNode;
}

export default function DefaultLayout({ children }: EntryLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
            {/* Navigation */}
            <Nav brand="Drift Consulting" />

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}