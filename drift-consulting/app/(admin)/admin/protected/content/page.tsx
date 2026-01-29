// app/admin/protected/content/page.tsx
import { requireRole } from "@/lib/auth/requireRole";
import UnderConstruction from "@/components/UnderConstruction";

export default async function ContentPage() {
    // Only superadmin can access content
    await requireRole(['superAdmin', 'support', 'admin']);

    return (
        <UnderConstruction
            title="Content Management"
            message="Manage your website content, blog posts, and portfolio updates from here."
        />
    )
}