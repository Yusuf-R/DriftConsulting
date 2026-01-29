// app/(admin)/admin/layout.tsx
import { ReactNode } from "react";

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-slate-900 dark:bg-slate-900">
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}