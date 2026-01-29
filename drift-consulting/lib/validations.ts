// lib/validations/schemas.ts
import { z } from 'zod';

const PROJECT_TYPE = ['residential', 'hospitality', 'institutional', 'commercial', 'government'] as const;

// Contact Form Validation Schema
export const contactFormSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters')
        .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

    email: z.email('Please provide a valid email address'),

    projectType: z.enum(PROJECT_TYPE, 'Please select a valid project type'),

    location: z
        .string()
        .min(2, 'Location must be at least 2 characters')
        .max(200, 'Location cannot exceed 200 characters'),

    scope: z
        .string()
        .min(20, 'Please provide at least 20 characters describing your project')
        .max(2000, 'Project scope cannot exceed 2000 characters'),

    phone: z
        .string()
        .optional()
        .refine(
            (val) => !val || /^[\d\s+()-]+$/.test(val),
            'Please provide a valid phone number'
        ),

    budget: z
        .string()
        .optional(),

    timeline: z
        .string()
        .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Project Filter Schema
export const projectFilterSchema = z.object({
    category: z.enum(['all', 'residential', 'hospitality', 'institutional', 'commercial', 'government']).optional(),
    status: z.enum(['all', 'completed', 'ongoing', 'planned']).optional(),
    featured: z.boolean().optional(),
});

export type ProjectFilterData = z.infer<typeof projectFilterSchema>;

// Admin Login Schema
export const adminLoginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address')
        .toLowerCase(),

    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),

    rememberMe: z.boolean().optional(),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;

// Admin Signup Schema
export const adminSignupSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters')
        .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address')
        .toLowerCase(),

    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password cannot exceed 100 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),

    confirmPassword: z
        .string()
        .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type AdminSignupData = z.infer<typeof adminSignupSchema>;

// Password Reset Request Schema
export const passwordResetRequestSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address')
        .toLowerCase(),
});

export type PasswordResetRequestData = z.infer<typeof passwordResetRequestSchema>;

// Password Reset Schema
export const passwordResetSchema = z.object({
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password cannot exceed 100 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),

    confirmPassword: z
        .string()
        .min(1, 'Please confirm your password'),

    token: z.string().min(1, 'Reset token is required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type PasswordResetData = z.infer<typeof passwordResetSchema>;

// Contact Status Update Schema
export const contactStatusSchema = z.object({
    status: z.enum(['new', 'contacted', 'in-discussion', 'converted', 'closed']),
    notes: z.string().max(1000, 'Notes cannot exceed 1000 characters').optional(),
});

export type ContactStatusData = z.infer<typeof contactStatusSchema>;

// Project Creation Schema (for admin)
export const projectCreateSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(200),
    slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
    category: z.enum(['residential', 'hospitality', 'institutional', 'commercial', 'government']),
    location: z.string().min(2).max(200),
    description: z.string().min(10).max(500),
    client: z.string().max(200).optional(),
    duration: z.string().min(1),
    value: z.string().min(1),
    status: z.enum(['completed', 'ongoing', 'planned']),
    featuredImage: z.string().url('Featured image must be a valid URL'),
    gallery: z.array(z.string().url()).optional(),
    stats: z.array(z.object({
        key: z.string(),
        value: z.string(),
    })),
    challenge: z.string().max(2000).optional(),
    approach: z.string().max(2000).optional(),
    outcome: z.string().max(2000).optional(),
    features: z.array(z.string()),
    featured: z.boolean().optional(),
    published: z.boolean().optional(),
});

export type ProjectCreateData = z.infer<typeof projectCreateSchema>;