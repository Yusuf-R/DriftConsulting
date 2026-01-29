// lib/controllers/AuthController.ts
import bcrypt from "bcryptjs";
import dbClient from "@/lib/mongoDB/index";
import Drift from "@/lib/models/Drift/Drift";
import Contact from "@/lib/models/Contact";
import { signUpCredential, loginCredential, CreateContactData, GetContactsQuery } from "@/lib/types";
import { getMockContacts } from "@/lib/data/mockProjectsContactsData";

class AuthController {

    /**
     * Hash a password
     */
    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    /**
     * Compare password with hashed password
     */
    static async comparePassword(
        password: string,
        hashedPassword: string
    ): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    /**
     * Sign up a new user
     */
    static async signUp(credentials: signUpCredential) {
        try {
            await dbClient.connect();

            const { email, password, name, role = "support" } = credentials;

            // Validate input
            if (!email || !password) {
                throw new Error("Email and password are required");
            }

            // Check if user already exists
            const existingUser = await Drift.findOne({
                email: email.toLowerCase()
            });

            if (existingUser) {
                throw new Error("User already exists");
            }

            // Hash password
            const hashedPassword = await this.hashPassword(password);

            // Create new user
            const newUser = await Drift.create({
                email: email.toLowerCase(),
                password: hashedPassword,
                name: name || "",
                role: role,
                provider: "credentials",
                isActive: true,
                lastLogin: new Date(),
            });

            return {
                _id: newUser._id.toString(),
                email: newUser.email,
                name: newUser.name,
            };
        } catch (error: any) {
            console.error("Sign up error:", error);
            throw error;
        }
    }

    /**
     * Log in user
     */
    static async logIn(credentials: loginCredential) {
        try {
            await dbClient.connect();

            const { email, password } = credentials;

            if (!email || !password) {
                throw new Error("Email and password are required");
            }

            const user = await Drift.findOne({
                email: email.toLowerCase()
            }).select("+password");

            if (!user) {
                throw new Error("Invalid credentials");
            }

            if (!user.password) {
                throw new Error("Please sign in with Google");
            }

            const isPasswordValid = await this.comparePassword(
                password,
                user.password
            );

            if (!isPasswordValid) {
                throw new Error("Invalid credentials");
            }

            if (!user.isActive) {
                throw new Error("Account is deactivated");
            }

            // Update last login
            user.lastLogin = new Date();
            await user.save();

            return {
                _id: user._id.toString(),
                email: user.email,
                name: user.name,
                role: user.role,
            };
        } catch (error: any) {
            console.error("Log in error:", error);
            throw error;
        }
    }

    /**
     * Create a new contact inquiry
     */
    static async createContact(data: CreateContactData) {
        try {
            await dbClient.connect();

            // Create contact
            const contact = await Contact.create({
                name: data.name,
                email: data.email.toLowerCase(),
                projectType: data.projectType,
                location: data.location,
                scope: data.scope,
                phone: data.phone || undefined,
                budget: data.budget || undefined,
                timeline: data.timeline || undefined,
                status: 'new',
                source: 'website',
                ipAddress: data.ipAddress || 'unknown',
                userAgent: data.userAgent || 'unknown',
            });

            return {
                _id: contact._id.toString(),
                name: contact.name,
                email: contact.email,
                projectType: contact.projectType,
                status: contact.status,
                createdAt: contact.createdAt,
            };
        } catch (error: any) {
            console.error("Create contact error:", error);
            throw error;
        }
    }

    /**
     * Get contacts with advanced filtering and pagination
     */
    static async getContacts(query?: GetContactsQuery & {
        page?: number;
        search?: string;
    }) {
        try {
            await dbClient.connect();

            // Build filter object
            const filter: any = {};

            // Status filter
            if (query?.status && query.status !== 'all') {
                filter.status = query.status;
            }

            // Project type filter
            if (query?.projectType && query.projectType !== 'all') {
                filter.projectType = query.projectType;
            }

            // Search filter (searches across multiple fields)
            if (query?.search) {
                filter.$or = [
                    { name: { $regex: query.search, $options: 'i' } },
                    { email: { $regex: query.search, $options: 'i' } },
                    { location: { $regex: query.search, $options: 'i' } },
                    { scope: { $regex: query.search, $options: 'i' } },
                ];
            }

            // Pagination setup
            const page = query?.page || 1;
            const limit = query?.limit || 100;
            const skip = query?.skip !== undefined ? query.skip : (page - 1) * limit;

            // Get total count for pagination
            const total = await Contact.countDocuments(filter);

            if (total < 3) {
                const dbContacts = await Contact.find()
                    .sort({ createdAt: -1 })
                    .limit(limit)
                    .lean();

                const mockContacts = getMockContacts();

                // Combine DB contacts with mock data
                const combined = [
                    ...dbContacts,
                    ...mockContacts
                ];

                return {
                    contacts: JSON.parse(JSON.stringify(combined)),
                    total: combined.length,
                    page: 1,
                    limit,
                    hasMore: false,
                    usedMockData: true,
                };
            }

            // Fetch contacts with filters
            const contacts = await Contact.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();

            // Calculate pagination metadata
            const totalPages = Math.ceil(total / limit);
            const hasMore = skip + contacts.length < total;

            return {
                contacts,
                pagination: {
                    total,
                    page,
                    limit,
                    skip,
                    hasMore,
                    totalPages,
                },
            };
        } catch (error: any) {
            console.error("Get contacts error:", error);
            throw error;
        }
    }

    /**
     * Get a single contact by ID
     */
    static async getContactById(contactId: string) {
        try {
            await dbClient.connect();

            const contact = await Contact.findById(contactId).lean();

            if (!contact) {
                throw new Error("Contact not found");
            }

            return contact;
        } catch (error: any) {
            console.error("Get contact by ID error:", error);
            throw error;
        }
    }

    /**
     * Update contact status
     */
    static async updateContactStatus(contactId: string, status: string, notes?: string) {
        try {
            await dbClient.connect();

            const updateData: any = {
                status,
                updatedAt: new Date(),
            };

            if (notes) {
                updateData.notes = notes;
            }

            const contact = await Contact.findByIdAndUpdate(
                contactId,
                updateData,
                { new: true }
            );

            if (!contact) {
                throw new Error("Contact not found");
            }

            return contact;
        } catch (error: any) {
            console.error("Update contact status error:", error);
            throw error;
        }
    }

    /**
     * Delete a contact
     */
    static async deleteContact(contactId: string) {
        try {
            await dbClient.connect();

            const contact = await Contact.findByIdAndDelete(contactId);

            if (!contact) {
                throw new Error("Contact not found");
            }

            return {
                success: true,
                message: "Contact deleted successfully",
            };
        } catch (error: any) {
            console.error("Delete contact error:", error);
            throw error;
        }
    }
}

export default AuthController;