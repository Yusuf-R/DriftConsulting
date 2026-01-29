// lib/types/dashboard.ts

export interface DashboardStats {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    totalContacts: number;
    newContacts: number;
    convertedLeads: number;
    totalRevenue: string;
    monthlyGrowth: number;
}

export interface RecentContact {
    id: string;
    name: string;
    email: string;
    projectType: string;
    location: string;
    status: 'new' | 'contacted' | 'in-discussion' | 'converted' | 'closed';
    createdAt: Date;
}

export interface ActiveProject {
    id: string;
    title: string;
    client: string;
    category: string;
    status: 'ongoing' | 'completed' | 'planned';
    progress: number;
    value: string;
    dueDate?: Date;
}

export interface ProjectsByCategory {
    category: string;
    count: number;
    value: number;
}

export interface MonthlyRevenue {
    month: string;
    revenue: number;
    projects: number;
}

export interface QuickAction {
    title: string;
    description: string;
    icon: any;
    href: string;
    color: string;
}