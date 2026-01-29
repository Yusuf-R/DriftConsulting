// app/(admin)/admin/protected/dashboard/page.tsx
import { requireRole } from "@/lib/auth/requireRole";
import DashboardOverview from "@/components/Admin/DriftDashboard/DashboardOverview";
import StatsGrid from "@/components/Admin/DriftDashboard/StatsGrid";
import RecentContactsTable from "@/components/Admin/DriftDashboard/RecentContactsTable";
import ActiveProjectsGrid from "@/components/Admin/DriftDashboard/ActiveProjectsGrid";
import ChartsSection from "@/components/Admin/DriftDashboard/ChartsSection";
import QuickActionsGrid from "@/components/Admin/DriftDashboard/QuickActionsGrid";

// Import mock data (TODO: Replace with real database queries)
import {
    getMockDashboardStats,
    getMockRecentContacts,
    getMockActiveProjects,
    getMockProjectsByCategory,
    getMockMonthlyRevenue,
} from "@/lib/data/mockDashboardData";

export default async function DashboardPage() {
    // Require authentication and role
    const { user } = await requireRole(['admin', 'support', 'superAdmin']);

    // TODO: Replace mock data with real database queries
    // Example:
    // const stats = await getDashboardStats();
    // const contacts = await Contact.find().sort({ createdAt: -1 }).limit(5);
    // const projects = await Project.find({ status: 'ongoing' }).limit(6);

    const stats = getMockDashboardStats();
    const recentContacts = getMockRecentContacts();
    const activeProjects = getMockActiveProjects();
    const projectsByCategory = getMockProjectsByCategory();
    const monthlyRevenue = getMockMonthlyRevenue();

    return (
        <div className="space-y-6">
            {/* Header */}
            <DashboardOverview user={user} />

            {/* Quick Actions */}
            <QuickActionsGrid userRole={user.role} />

            {/* Stats Grid */}
            <StatsGrid stats={stats} />

            {/* Charts Section */}
            <ChartsSection
                projectsByCategory={projectsByCategory}
                monthlyRevenue={monthlyRevenue}
            />

            {/* Active Projects */}
            <ActiveProjectsGrid projects={activeProjects} />

            {/* Recent Contacts */}
            <RecentContactsTable contacts={recentContacts} />
        </div>
    );
}