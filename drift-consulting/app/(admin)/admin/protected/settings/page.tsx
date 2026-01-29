// app/admin/protected/settings/page.tsx
import { requireRole } from "@/lib/auth/requireRole";
import UnderConstruction from "@/components/UnderConstruction";

export default async function SettingsPage() {
    // Only superadmin can access settings
    await requireRole(['superAdmin', 'support', 'admin']);

    return (
        <UnderConstruction
            title="System Settings"
            message="Configure system preferences, security settings, and integrations."
        />
    );
}