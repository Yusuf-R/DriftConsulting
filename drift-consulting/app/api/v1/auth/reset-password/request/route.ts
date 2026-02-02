// app/api/v1/auth/reset-password/request/route.ts
import { NextRequest, NextResponse } from "next/server";
import AuthController from "@/lib/controllers/AuthController";
import { loginRateLimit, formatTimeRemaining } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email is required" },
                { status: 400 }
            );
        }

        // Rate limit to prevent abuse (5 requests per hour per email)
        const { success, reset } = await loginRateLimit.limit(email.toLowerCase());

        if (!success) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Too many requests. Please try again in ${formatTimeRemaining(reset)}.`,
                },
                { status: 429 }
            );
        }

        const result = await AuthController.requestPasswordReset(email);

        return NextResponse.json({
            success: true,
            message: result.message,
            expiresAt: result.expiresAt,
        });

    } catch (error: any) {
        console.error('Request password reset error:', error);

        // Always return 200 to avoid revealing if email exists
        return NextResponse.json({
            success: true,
            message: "If this email exists, an OTP has been sent.",
        });
    }
}