// app/admin/protected/analytics/page.tsx
import { requireRole } from "@/lib/auth/requireRole";
import UnderConstruction from "@/components/UnderConstruction";

export default async function AnalyticsPage() {
    // Only superadmin can access analytics
    await requireRole(['superAdmin', 'support', 'admin']);

    return (
        <UnderConstruction
            title="Analytics Dashboard"
            message="Advanced analytics and reporting features are coming soon. Track project performance, revenue trends, and team productivity."
        />
    );
}