// app/(admin)/admin/protected/contacts/page.tsx
import { requireRole } from "@/lib/auth/requireRole";
import Contact from "@/components/Admin/DriftDashboard/Contact";
import AuthController from "@/lib/controllers/AuthController"

export default async function ContactPage() {
    await requireRole(['admin', 'superAdmin', 'support']);

    // Fetch initial contacts server-side
    const result = await AuthController.getContacts({ limit: 100 });

    // Transform to match ContactsResult interface
    const initialData = {
        contacts: result.contacts,
        total: result.pagination?.total || result.total || 0,
        page: result.pagination?.page || result.page || 1,
        limit: result.pagination?.limit || result.limit || 100,
        hasMore: result.pagination?.hasMore || result.hasMore || false,
        usedMockData: result.usedMockData || false,
    };

    return <Contact initialData={initialData} />;
}