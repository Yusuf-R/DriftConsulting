// lib/data/mockDashboardData.ts
import type {
    DashboardStats,
    RecentContact,
    ActiveProject,
    ProjectsByCategory,
    MonthlyRevenue,
} from "@/lib/types/dashboard";

// TODO: Replace with actual database queries
export const getMockDashboardStats = (): DashboardStats => ({
    totalProjects: 47,
    activeProjects: 8,
    completedProjects: 39,
    totalContacts: 156,
    newContacts: 12,
    convertedLeads: 28,
    totalRevenue: "₦450M",
    monthlyGrowth: 12.5,
});

// TODO: Replace with: Contact.find().sort({ createdAt: -1 }).limit(5)
export const getMockRecentContacts = (): RecentContact[] => [
    {
        id: "1",
        name: "Chukwudi Okafor",
        email: "chukwudi@example.com",
        projectType: "Commercial",
        location: "Lagos, Nigeria",
        status: "new",
        createdAt: new Date("2026-01-27"),
    },
    {
        id: "2",
        name: "Amina Mohammed",
        email: "amina@example.com",
        projectType: "Residential",
        location: "Abuja, Nigeria",
        status: "contacted",
        createdAt: new Date("2026-01-26"),
    },
    {
        id: "3",
        name: "Oluwaseun Adeyemi",
        email: "seun@example.com",
        projectType: "Institutional",
        location: "Ibadan, Nigeria",
        status: "in-discussion",
        createdAt: new Date("2026-01-25"),
    },
    {
        id: "4",
        name: "Fatima Bello",
        email: "fatima@example.com",
        projectType: "Government",
        location: "Kano, Nigeria",
        status: "converted",
        createdAt: new Date("2026-01-24"),
    },
    {
        id: "5",
        name: "Ibrahim Yusuf",
        email: "ibrahim@example.com",
        projectType: "Hospitality",
        location: "Port Harcourt, Nigeria",
        status: "new",
        createdAt: new Date("2026-01-23"),
    },
];

// TODO: Replace with: Project.find({ status: 'ongoing' }).limit(6)
export const getMockActiveProjects = (): ActiveProject[] => [
    {
        id: "1",
        title: "Green Valley School Complex",
        client: "Mr. Adebayo",
        category: "Institutional",
        status: "ongoing",
        progress: 65,
        value: "₦85M",
        dueDate: new Date("2026-06-15"),
    },
    {
        id: "2",
        title: "Luxury Apartments - Phase 2",
        client: "Mrs. Okonkwo",
        category: "Residential",
        status: "ongoing",
        progress: 42,
        value: "₦120M",
        dueDate: new Date("2026-08-20"),
    },
    {
        id: "3",
        title: "City Mall Extension",
        client: "Zenith Properties",
        category: "Commercial",
        status: "ongoing",
        progress: 78,
        value: "₦200M",
        dueDate: new Date("2026-04-30"),
    },
    {
        id: "4",
        title: "Heritage Hotel",
        client: "Mr. Ibrahim",
        category: "Hospitality",
        status: "ongoing",
        progress: 55,
        value: "₦150M",
        dueDate: new Date("2026-07-10"),
    },
    {
        id: "5",
        title: "Government Secretariat",
        client: "Federal Govt",
        category: "Government",
        status: "ongoing",
        progress: 30,
        value: "₦300M",
        dueDate: new Date("2026-12-31"),
    },
    {
        id: "6",
        title: "Medical Center",
        client: "Dr. Eze",
        category: "Institutional",
        status: "planned",
        progress: 15,
        value: "₦95M",
        dueDate: new Date("2026-09-15"),
    },
];

// TODO: Replace with aggregation query on Project collection
export const getMockProjectsByCategory = (): ProjectsByCategory[] => [
    { category: "Residential", count: 18, value: 450 },
    { category: "Commercial", count: 12, value: 780 },
    { category: "Institutional", count: 8, value: 320 },
    { category: "Hospitality", count: 5, value: 280 },
    { category: "Government", count: 4, value: 650 },
];

// TODO: Replace with time-series query on Project collection
export const getMockMonthlyRevenue = (): MonthlyRevenue[] => [
    { month: "Aug", revenue: 45, projects: 4 },
    { month: "Sep", revenue: 52, projects: 5 },
    { month: "Oct", revenue: 38, projects: 3 },
    { month: "Nov", revenue: 65, projects: 6 },
    { month: "Dec", revenue: 58, projects: 5 },
    { month: "Jan", revenue: 72, projects: 7 },
];