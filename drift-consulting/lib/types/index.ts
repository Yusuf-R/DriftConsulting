// drift-consulting/lib/types/index.ts
import { Document } from 'mongoose';

export type DriftRole = 'superAdmin' | 'admin' | 'support';

export interface IDrift extends Document {
    name?: string;
    email: string;
    password?: string;
    role: DriftRole;
    image?: string;
    provider?: 'credentials' | 'google';
    providerId?: string;
    emailVerified: boolean;
    resetPasswordOTP?: string;
    resetPasswordOTPExpires?: Date;
    resetPasswordAttempts?: number;
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface signUpCredential {
    name: string
    email: string
    password: string
    role: DriftRole
}

export interface loginCredential {
    email: string
    password: string
}

export interface authCredentials {
    email: string
    password: string
}

// export type allowedRoles = ['superAdmin', 'admin', 'support']

// Define all possible roles
export type allowedRoles = DriftRole[];

export interface CreateContactData {
    name: string;
    email: string;
    projectType: 'residential' | 'hospitality' | 'institutional' | 'commercial' | 'government';
    location: string;
    scope: string;
    phone?: string;
    budget?: string;
    timeline?: string;
    ipAddress?: string;
    userAgent?: string;
}

export interface GetContactsQuery {
    status?: string;
    projectType?: string;
    limit?: number;
    skip?: number;
    page?: number;
    search?: string;
}

export interface ContactsResult {
    contacts: any[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
    usedMockData: boolean;
}