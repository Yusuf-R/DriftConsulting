"use client";
import { ReactNode } from "react";
import Nav from "@/components/Entry/Nav";

interface EntryLayoutProps {
    children: ReactNode;
}

export default function DefaultLayout({ children }: EntryLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
            {/* Sticky Navigation */}
            <Nav logoSrc="/drift-consulting.jpg" brand="Drift Consulting" />

            {/* Main Content - No padding, components control their own spacing */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer - Add later */}
            {/* <Footer /> */}
        </div>
    );
}