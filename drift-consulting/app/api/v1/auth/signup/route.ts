// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { adminSignupSchema } from "@/lib/validations";
import AuthController from "@/lib/controllers/AuthController";
import { signupRateLimit, formatTimeRemaining, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
    try {
        const ipAddress = getClientIp(req);

        // Check signup rate limit by IP
        const { success, reset } = await signupRateLimit.limit(ipAddress);

        if (!success) {
            return NextResponse.json(
                {
                    success: false,
                    code: "SIGNUP_RATE_LIMIT_EXCEEDED",
                    message: `Too many signup attempts from your IP. Please try again in ${formatTimeRemaining(reset)}.`,
                },
                { status: 429 }
            );
        }

        // Get and validate request body
        const body = await req.json();
        const validatedData = adminSignupSchema.parse(body);

        // Create user
        const user = await AuthController.signUp({
            name: validatedData.name,
            email: validatedData.email,
            password: validatedData.password,
            role: "support",
        });

        return NextResponse.json(
            {
                success: true,
                message: "Account created successfully!",
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                },
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Signup error:', error);

        // Handle validation errors
        if (error.name === 'ZodError') {
            return NextResponse.json(
                {
                    success: false,
                    code: "VALIDATION_ERROR",
                    message: 'Please check your input and try again.',
                    details: error.errors,
                },
                { status: 400 }
            );
        }

        // Handle duplicate user
        if (error.message?.includes("already exists")) {
            return NextResponse.json(
                {
                    success: false,
                    code: "USER_ALREADY_EXISTS",
                    message: "An account already exists. Please login instead.",
                },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                code: "SIGNUP_ERROR",
                message: error.message || 'Signup failed. Please try again.',
            },
            { status: 500 }
        );
    }
}