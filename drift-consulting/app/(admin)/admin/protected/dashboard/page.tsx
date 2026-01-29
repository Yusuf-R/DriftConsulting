// app/admin/protected/dashboard/page.tsx
import { requireRole } from "@/lib/auth/requireRole";
import Dashboard from "@/components/Admin/DriftDashboard/Dashboard"

export default async function DashboardPage() {
    // Only allow admin and superAdmin and support to access this page
    await requireRole(['admin', 'support', 'superAdmin']);

    return (
        <>
            <Dashboard />
        </>
    );
}