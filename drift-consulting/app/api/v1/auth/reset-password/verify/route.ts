// app/api/v1/auth/reset-password/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import AuthController from "@/lib/controllers/AuthController";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, otp, newPassword } = body;

        if (!email || !otp || !newPassword) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { success: false, message: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        const result = await AuthController.resetPassword(email, otp, newPassword);

        return NextResponse.json({
            success: true,
            message: result.message,
        });

    } catch (error: any) {
        console.error('Reset password error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Password reset failed' },
            { status: 400 }
        );
    }
}