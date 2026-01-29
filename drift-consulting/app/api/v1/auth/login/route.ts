// app/api/auth/check-login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { loginRateLimit, loginIpRateLimit, formatTimeRemaining, getClientIp } from "@/lib/rate-limit";
import AuthController from "@/lib/controllers/AuthController";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    code: "MISSING_CREDENTIALS",
                    message: "Email and password are required.",
                },
                { status: 400 }
            );
        }

        const emailLower = email.toLowerCase();
        const ipAddress = getClientIp(req);

        // Check email rate limit
        const emailRateCheck = await loginRateLimit.limit(emailLower);

        if (!emailRateCheck.success) {
            return NextResponse.json(
                {
                    success: false,
                    code: "LOGIN_EMAIL_RATE_LIMIT_EXCEEDED",
                    message: `This account is temporarily locked due to multiple failed login attempts. Please try again in ${formatTimeRemaining(emailRateCheck.reset)}.`,
                },
                { status: 429 }
            );
        }

        // Check IP rate limit
        const ipRateCheck = await loginIpRateLimit.limit(ipAddress);

        if (!ipRateCheck.success) {
            return NextResponse.json(
                {
                    success: false,
                    code: "LOGIN_IP_RATE_LIMIT_EXCEEDED",
                    message: `Too many login attempts from your location. Please try again in ${formatTimeRemaining(ipRateCheck.reset)}.`,
                },
                { status: 429 }
            );
        }

        // Verify credentials
        try {
            const user = await AuthController.logIn({
                email: emailLower,
                password,
            });

            if (!user) {
                return NextResponse.json(
                    {
                        success: false,
                        code: "INVALID_CREDENTIALS",
                        message: "Invalid email or password.",
                    },
                    { status: 401 }
                );
            }

            return NextResponse.json({
                success: true,
                message: "Credentials verified successfully.",
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                },
            });

        } catch (error: any) {
            if (error.message?.includes("Invalid credentials")) {
                return NextResponse.json(
                    {
                        success: false,
                        code: "INVALID_CREDENTIALS",
                        message: "Invalid email or password.",
                    },
                    { status: 401 }
                );
            }

            if (error.message?.includes("deactivated")) {
                return NextResponse.json(
                    {
                        success: false,
                        code: "ACCOUNT_DEACTIVATED",
                        message: "Your account has been deactivated. Please contact support.",
                    },
                    { status: 403 }
                );
            }

            if (error.message?.includes("Google")) {
                return NextResponse.json(
                    {
                        success: false,
                        code: "USE_GOOGLE_SIGNIN",
                        message: "This account uses Google authentication. Please sign in with Google.",
                    },
                    { status: 400 }
                );
            }

            throw error;
        }

    } catch (error: any) {
        console.error('Check login error:', error);
        return NextResponse.json(
            {
                success: false,
                code: "LOGIN_ERROR",
                message: "An error occurred. Please try again.",
            },
            { status: 500 }
        );
    }
}