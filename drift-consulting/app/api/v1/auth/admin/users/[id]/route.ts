// app/api/admin/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import dbClient from "@/lib/mongoDB";
import Drift from "@/lib/models/Drift/Drift";

// GET - Get single user
export async function GET( req: NextRequest, { params }: { params: { id: string } }) {
    const {id} = await params;
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await dbClient.connect();
        const user = await Drift.findById(id).select('-password').lean();

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            user,
        });

    } catch (error: any) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to fetch user' },
            { status: 500 }
        );
    }
}

// PATCH - Update user
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const {id} = await params;
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Only admin/superAdmin can update other users
        if (!['admin', 'superAdmin'].includes(session.user.role) && session.user.id !== id) {
            return NextResponse.json(
                { success: false, message: "Forbidden" },
                { status: 403 }
            );
        }

        const body = await req.json();
        const { name, role, isActive } = body;

        await dbClient.connect();

        const updateData: any = { updatedAt: new Date() };
        if (name !== undefined) updateData.name = name;
        if (role !== undefined) updateData.role = role;
        if (isActive !== undefined) updateData.isActive = isActive;

        const user = await Drift.findByIdAndUpdate(
            id,
            updateData,
            { new: true, select: '-password' }
        ).lean();


        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "User updated successfully",
            user,
        });

    } catch (error: any) {
        console.error('Update user error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to update user' },
            { status: 500 }
        );
    }
}

// DELETE - Delete user
export async function DELETE( req: NextRequest, { params }: { params: { id: string } }) {
    const {id} = await params;
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Only admin/superAdmin can delete users
        if (!['admin', 'superAdmin'].includes(session.user.role)) {
            return NextResponse.json(
                { success: false, message: "Forbidden. Only admins can delete users." },
                { status: 403 }
            );
        }


        // Prevent deleting yourself
        if (session.user.id === id) {
            return NextResponse.json(
                { success: false, message: "You cannot delete your own account" },
                { status: 400 }
            );
        }

        await dbClient.connect();
        const user = await Drift.findByIdAndDelete(id);

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error: any) {
        console.error('Delete user error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to delete user' },
            { status: 500 }
        );
    }
}