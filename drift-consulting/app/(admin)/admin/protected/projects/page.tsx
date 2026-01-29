// drift-consulting/app/(admin)/admin/protected/projects/page.tsx
import { requireRole } from "@/lib/auth/requireRole";
import Project from "@/components/Admin/DriftDashboard/Project"

export default async function ProjectPage() {
    // Only allow admin and superadmin to access this page
    await requireRole(['admin', 'superAdmin', 'support']);

    return (
        <Project/>
    );
}