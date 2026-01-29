// lib/types/nav.ts
import { LucideIcon } from "lucide-react";

export type NavState = "full" | "icon" | "hidden";

export interface MenuItem {
    icon: LucideIcon;
    label: string;
    path: string;
    badge?: number;
    roles?: string[]; // Optional: restrict menu item to certain roles
}

export interface UserData {
    id: string;
    name?: string | null;
    email: string;
    role: string;
    image?: string | null;
}

export interface SideNavProps {
    navState: NavState;
    activeRoute: string;
    userData: UserData;
}

export interface TopNavProps {
    onToggleSideNav: () => void;
    userData: UserData;
}