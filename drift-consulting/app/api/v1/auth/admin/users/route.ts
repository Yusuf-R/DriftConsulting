// app/api/admin/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import dbClient from "@/lib/mongoDB";
import Drift from "@/lib/models/Drift/Drift";
import AuthController from "@/lib/controllers/AuthController";

// GET - Fetch users with pagination
export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const searchParams = req.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');
        const role = searchParams.get('role');
        const isActive = searchParams.get('isActive');
        const search = searchParams.get('search');

        await dbClient.connect();

        // Build filter
        const filter: any = {};
        if (role && role !== 'all') filter.role = role;
        if (isActive !== null && isActive !== 'all') {
            filter.isActive = isActive === 'true';
        }
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }

        const skip = (page - 1) * limit;
        const total = await Drift.countDocuments(filter);
        const users = await Drift.find(filter)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        return NextResponse.json({
            success: true,
            users,
            pagination: {
                total,
                page,
                limit,
                hasMore: skip + users.length < total,
                totalPages: Math.ceil(total / limit),
            },
        });

    } catch (error: any) {
        console.error('Get users error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

// POST - Create new user (admin/superAdmin only)
export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        if (!['admin', 'superAdmin'].includes(session.user.role)) {
            return NextResponse.json(
                { success: false, message: "Forbidden. Only admins can create users." },
                { status: 403 }
            );
        }

        const body = await req.json();
        const { name, email, password, role } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = await AuthController.signUp({
            name,
            email,
            password,
            role: role || 'support',
        });

        // Fetch the complete user object from DB to ensure all fields are present
        await dbClient.connect();
        const completeUser = await Drift.findById(user._id).select('-password').lean();

        return NextResponse.json({
            success: true,
            message: "User created successfully",
            user: completeUser, // Return complete user object
        }, { status: 201 });

    } catch (error: any) {
        console.error('Create user error:', error);

        if (error.message?.includes("already exists")) {
            return NextResponse.json(
                { success: false, message: "User with this email already exists" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, message: error.message || 'Failed to create user' },
            { status: 500 }
        );
    }
}