// lib/controllers/AuthController.ts
import bcrypt from "bcryptjs";
import dbClient from "@/lib/mongoDB/index";
import Drift from "@/lib/models/Drift/Drift";
import Contact from "@/lib/models/Contact";
import {CreateContactData, GetContactsQuery, loginCredential, signUpCredential} from "@/lib/types";
import {getMockContacts} from "@/lib/data/mockProjectsContactsData";
import {sendOTPEmail} from "@/lib/email";

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
            const hashedPassword = await AuthController.hashPassword(password);

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
                role: newUser.role,
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

    /**
     * Generate and send OTP for password reset
     */
    static async requestPasswordReset(email: string) {
        try {
            await dbClient.connect();

            const user = await Drift.findOne({ email: email.toLowerCase() })
                .select('+resetPasswordOTP +resetPasswordOTPExpires +resetPasswordAttempts');

            if (!user) {
                // Don't reveal if email exists for security
                throw new Error("If this email exists, an OTP has been sent.");
            }

            if (user.provider === 'google') {
                throw new Error("This account uses Google sign-in. Please use Google to reset your password.");
            }

            // Generate 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            // Hash OTP before storing
            const hashedOTP = await AuthController.hashPassword(otp);

            // Set OTP expiry (3 minutes)
            const otpExpires = new Date(Date.now() + 3 * 60 * 1000);

            user.resetPasswordOTP = hashedOTP;
            user.resetPasswordOTPExpires = otpExpires;
            user.resetPasswordAttempts = 0; // Reset attempts
            await user.save();

            // Send OTP via email
            const { success } = await sendOTPEmail(user.email, otp, user.name);

            if (!success) {
                throw new Error("Failed to send OTP email. Please try again.");
            }

            return {
                success: true,
                message: "OTP sent to your email",
                expiresAt: otpExpires,
            };
        } catch (error: any) {
            console.error("Request password reset error:", error);
            throw error;
        }
    }

    /**
     * Verify OTP and reset password
     */
    static async resetPassword(email: string, otp: string, newPassword: string) {
        try {
            await dbClient.connect();

            const user = await Drift.findOne({ email: email.toLowerCase() })
                .select('+password +resetPasswordOTP +resetPasswordOTPExpires +resetPasswordAttempts');

            if (!user) {
                throw new Error("Invalid reset request");
            }

            if (!user.resetPasswordOTP || !user.resetPasswordOTPExpires) {
                throw new Error("No active OTP request. Please request a new OTP.");
            }

            // Check if OTP expired
            if (new Date() > user.resetPasswordOTPExpires) {
                throw new Error("OTP has expired. Please request a new one.");
            }

            // Check attempts (max 5)
            if (user.resetPasswordAttempts || 0 >= 5) {
                throw new Error("Too many failed attempts. Please request a new OTP.");
            }

            // Verify OTP
            const isValidOTP = await AuthController.comparePassword(otp, user.resetPasswordOTP);

            if (!isValidOTP) {
                user.resetPasswordAttempts = (user.resetPasswordAttempts || 0) + 1;
                await user.save();

                const remaining = 5 - user.resetPasswordAttempts;
                throw new Error(`Invalid OTP. ${remaining} attempts remaining.`);
            }

            // OTP is valid - reset password
            user.password = await AuthController.hashPassword(newPassword);
            user.resetPasswordOTP = undefined;
            user.resetPasswordOTPExpires = undefined;
            user.resetPasswordAttempts = 0;
            await user.save();

            return {
                success: true,
                message: "Password reset successfully",
            };
        } catch (error: any) {
            console.error("Reset password error:", error);
            throw error;
        } finally {
            await dbClient.close();
        }
    }
}

export default AuthController;