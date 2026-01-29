// app/admin/protected/settings/page.tsx
import { requireRole } from "@/lib/auth/requireRole";
import UnderConstruction from "@/components/UnderConstruction";

export default async function SupportPage() {
    // Only superadmin can access settings
    await requireRole(['superAdmin', 'support', 'admin']);

    return (
        <UnderConstruction
            title="Support & Help"
            message="Access documentation, submit tickets, and get help with any issues."
        />
    );
}