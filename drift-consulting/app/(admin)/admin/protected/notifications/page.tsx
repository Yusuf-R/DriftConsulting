// app/admin/protected/notifications/page.tsx
import { requireRole } from "@/lib/auth/requireRole";
import UnderConstruction from "@/components/UnderConstruction";

export default async function NotificationsPage() {
    await requireRole(['superAdmin', 'support', 'admin']);

    return (
        <UnderConstruction
            title="Notifications Center"
            message="View all your notifications, alerts, and important updates in one place."
        />
    );
}