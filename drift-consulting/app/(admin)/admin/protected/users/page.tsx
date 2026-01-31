// app/(admin)/admin/protected/users/page.tsx
import { requireRole } from "@/lib/auth/requireRole";
import Users from "@/components/Admin/DriftDashboard/Users/Users";
import { getInitialUsers } from "./actions";

export default async function UsersPage() {
    // Only allow admin and superadmin to access this page
    await requireRole(['admin', 'superAdmin', "support"]);

    // Fetch initial users server-side
    const initialData = await getInitialUsers(50);

    return <Users initialData={initialData} />;
}