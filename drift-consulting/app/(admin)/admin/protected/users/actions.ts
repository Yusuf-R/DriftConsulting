// app/(admin)/admin/protected/users/actions.ts
'use server';

import dbClient from "@/lib/mongoDB";
import Drift from "@/lib/models/Drift/Drift";
import { auth } from "@/lib/auth/auth";

export interface UsersResult {
    users: any[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export async function getInitialUsers(limit: number = 50): Promise<UsersResult> {
    try {
        const session = await auth();
        if (!session?.user) {
            throw new Error("Unauthorized");
        }

        await dbClient.connect();

        const total = await Drift.countDocuments();
        const users = await Drift.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();

        return {
            users: JSON.parse(JSON.stringify(users)),
            total,
            page: 1,
            limit,
            hasMore: total > limit,
        };

    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            users: [],
            total: 0,
            page: 1,
            limit,
            hasMore: false,
        };
    }
}