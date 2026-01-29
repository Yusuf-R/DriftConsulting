// lib/auth/requireRole.ts
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export type Role = 'superAdmin' | 'admin' | 'support';
export type AllowedRoles = Role[];

// Type for authenticated user with role
export type AuthenticatedUser = {
    id: string;
    name?: string | null;
    role: Role;
    image?: string | null;
};

// Result type for the requireRole function
type AuthResult = {
    session: NonNullable<Awaited<ReturnType<typeof auth>>>;
    user: AuthenticatedUser;
};

/**
 * Protects a route by checking if the user is authenticated and has one of the allowed roles
 * @param allowed - Array of roles that are allowed to access the route
 * @returns The session and user object if authorized
 * @throws Redirects to login if not authenticated or to unauthorized if role not allowed
 */
export async function requireRole(allowed: AllowedRoles): Promise<AuthResult> {
    const session = await auth();

    // Redirect to login if no session
    if (!session?.user) {
        redirect("/admin/auth/login");
    }

    // Cast the role and validate
    const role = session.user.role as string;

    // Check if role is valid
    const isValidRole = (role: string): role is Role => {
        return ['superAdmin', 'admin', 'support'].includes(role);
    };

    if (!isValidRole(role)) {
        console.error(`Invalid role detected: ${role}`);
        redirect("/admin/auth/login");
    }

    // Check if user's role is allowed
    if (!allowed.includes(role)) {
        // Log unauthorized access attempt
        console.warn(
            `Unauthorized access attempt by ${session.user.email} with role ${role} to page requiring [${allowed.join(', ')}]`
        );
        redirect("/admin/auth/unauthorized");
    }

    // Return typed user object
    const user: AuthenticatedUser = {
        id: session.user.id as string,
        name: session.user.name,
        role: role,
        image: session.user.image,
    };

    return { session, user };
}

/**
 * Get current user without role restriction
 * Use this when you want to get user data but don't need to restrict by role
 */
export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
    const session = await auth();

    if (!session?.user) {
        return null;
    }

    const role = session.user.role as string;
    const isValidRole = (role: string): role is Role => {
        return ['superAdmin', 'admin', 'support'].includes(role);
    };

    if (!isValidRole(role)) {
        return null;
    }

    return {
        id: session.user.id as string,
        email: session.user.email as string,
        name: session.user.name,
        role: role,
        image: session.user.image,
    };
}

/**
 * Helper function to check if user has a specific role
 */
export function hasRole(user: AuthenticatedUser, role: Role): boolean {
    return user.role === role;
}

/**
 * Helper function to check if user has at least one of the roles
 */
export function hasAnyRole(user: AuthenticatedUser, roles: Role[]): boolean {
    return roles.includes(user.role);
}

/**
 * Check if user is superAdmin
 */
export function isSuperAdmin(user: AuthenticatedUser): boolean {
    return user.role === 'superAdmin';
}

/**
 * Check if user is admin or superAdmin
 */
export function isAdmin(user: AuthenticatedUser): boolean {
    return ['superAdmin', 'admin'].includes(user.role);
}

/**
 * Get role hierarchy level (higher = more permissions)
 */
export function getRoleLevel(role: Role): number {
    const levels: Record<Role, number> = {
        support: 1,
        admin: 2,
        superAdmin: 3,
    };
    return levels[role];
}

/**
 * Check if user has higher or equal role level
 */
export function hasMinimumRole(user: AuthenticatedUser, minimumRole: Role): boolean {
    return getRoleLevel(user.role) >= getRoleLevel(minimumRole);
}