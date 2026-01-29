// app/(admin)/admin/protected/contacts/page.tsx
import { requireRole } from "@/lib/auth/requireRole";
import Contact from "@/components/Admin/DriftDashboard/Contact";
import AuthController from "@/lib/controllers/AuthController"
export default async function ContactPage() {
    await requireRole(['admin', 'superAdmin', 'support']);

    // Fetch initial contacts server-side
    const initialData = await AuthController.getContacts(100);

    return <Contact initialData={initialData} />;
}