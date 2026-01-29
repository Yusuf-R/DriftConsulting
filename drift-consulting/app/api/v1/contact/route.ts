// app/api/v1/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { auth } from "@/lib/auth/auth";
import AuthController from "@/lib/controllers/AuthController";
import { contactRateLimit, ipRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
    try {
        // Get client IP
        const ip = getClientIp(req);

        // Check rate limit by IP (10 per hour)
        const { success: ipSuccess, limit: ipLimit, remaining: ipRemaining, reset: ipReset } =
            await ipRateLimit.limit(ip);

        if (!ipSuccess) {
            const resetDate = new Date(ipReset);
            return NextResponse.json(
                {
                    success: false,
                    message: `Too many requests from your IP. Please try again at ${resetDate.toLocaleTimeString()}.`,
                    error: "RATE_LIMIT_EXCEEDED",
                    retryAfter: Math.ceil((ipReset - Date.now()) / 1000), // seconds until reset
                },
                {
                    status: 429,
                    headers: {
                        "X-RateLimit-Limit": ipLimit.toString(),
                        "X-RateLimit-Remaining": ipRemaining.toString(),
                        "X-RateLimit-Reset": ipReset.toString(),
                        "Retry-After": Math.ceil((ipReset - Date.now()) / 1000).toString(),
                    }
                }
            );
        }

        // Get request body
        const body = await req.json();

        // Validate with Zod
        const validatedData = contactFormSchema.parse(body);

        // Check rate limit by email (5 per minute to prevent spam with same email)
        const { success: emailSuccess, limit: emailLimit, remaining: emailRemaining, reset: emailReset } =
            await contactRateLimit.limit(validatedData.email.toLowerCase());

        if (!emailSuccess) {
            const resetDate = new Date(emailReset);
            return NextResponse.json(
                {
                    success: false,
                    message: `Too many submission attempts. Please wait before trying again.`,
                    error: "RATE_LIMIT_EXCEEDED",
                    retryAfter: Math.ceil((emailReset - Date.now()) / 1000),
                },
                {
                    status: 429,
                    headers: {
                        "X-RateLimit-Limit": emailLimit.toString(),
                        "X-RateLimit-Remaining": emailRemaining.toString(),
                        "X-RateLimit-Reset": emailReset.toString(),
                        "Retry-After": Math.ceil((emailReset - Date.now()) / 1000).toString(),
                    }
                }
            );
        }

        // Get user agent
        const userAgent = req.headers.get('user-agent') || 'unknown';

        // Create contact using AuthController
        const contact = await AuthController.createContact({
            name: validatedData.name,
            email: validatedData.email,
            projectType: validatedData.projectType,
            location: validatedData.location,
            scope: validatedData.scope,
            phone: validatedData.phone,
            budget: validatedData.budget,
            timeline: validatedData.timeline,
            ipAddress: ip,
            userAgent,
        });

        // TODO: Send notification email to admin
        // await sendAdminNotification(contact);

        // TODO: Send thank you email to client
        // await sendClientConfirmation(contact);

        return NextResponse.json(
            {
                success: true,
                message: "Thank you for your inquiry! We'll get back to you soon.",
                contactId: contact._id,
            },
            {
                status: 201,
                headers: {
                    "X-RateLimit-Limit": ipLimit.toString(),
                    "X-RateLimit-Remaining": ipRemaining.toString(),
                }
            }
        );

    } catch (error: any) {
        console.error('Contact form error:', error);

        // Handle Zod validation errors
        if (error.name === 'ZodError') {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Validation failed. Please check your input.',
                    details: error.errors.map((err: any) => ({
                        field: err.path.join('.'),
                        message: err.message,
                    })),
                },
                { status: 400 }
            );
        }

        // Handle duplicate email (if you add unique constraint)
        if (error.code === 11000) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'A contact with this email already exists. We will review your previous inquiry.',
                },
                { status: 409 }
            );
        }

        // Generic error
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to submit contact form. Please try again later.',
            },
            { status: 500 }
        );
    }
}

// GET endpoint to retrieve contacts (admin only)
export async function GET(req: NextRequest) {
    try {
        // Check authentication
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Extract all query parameters
        const searchParams = req.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '100');
        const status = searchParams.get('status') || undefined;
        const projectType = searchParams.get('projectType') || undefined;
        const search = searchParams.get('search') || undefined;

        // Get contacts using AuthController with all filters
        const result = await AuthController.getContacts({
            page,
            limit,
            status,
            projectType,
            search,
        });

        return NextResponse.json({
            success: true,
            ...result,
        });

    } catch (error: any) {
        console.error('Get contacts error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || 'Failed to fetch contacts'
            },
            { status: 500 }
        );
    }
}