// utils/AdminUtils.ts
'use client';
import {axiosPrivate} from "@/utils/AxiosInstance"

class AdminUtils {

    // Get all users with pagination
    static async getAllUsers(params?: {
        page?: number;
        limit?: number;
        role?: string;
        isActive?: string;
        search?: string;
    }) {
        try {
            const response = await axiosPrivate({
                method: "GET",
                url: '/admin/users',
                params: params,
            });
            return response.data;
        } catch (error: any) {
            console.error('Get all users error:', error);
            throw error;
        }
    }

    // Get single user
    static async getUser(userId: string) {
        try {
            const response = await axiosPrivate({
                method: "GET",
                url: `/admin/users/${userId}`,
            });
            return response.data;
        } catch (error: any) {
            console.error('Get user error:', error);
            throw error;
        }
    }

    // Create new user
    static async createUser(data: {
        name: string;
        email: string;
        password: string;
        role?: 'superAdmin' | 'admin' | 'support';
    }) {
        try {
            const response = await axiosPrivate({
                method: "POST",
                url: '/admin/users',
                data,
            });
            return response.data;
        } catch (error: any) {
            console.error('Create user error:', error);
            throw error;
        }
    }

    // Update user
    static async updateUser(userId: string, data: {
        name?: string;
        role?: 'superAdmin' | 'admin' | 'support';
        isActive?: boolean;
    }) {
        try {
            const response = await axiosPrivate({
                method: "PATCH",
                url: `/admin/users/${userId}`,
                data,
            });
            return response.data;
        } catch (error: any) {
            console.error('Update user error:', error);
            throw error;
        }
    }

    // Delete user
    static async deleteUser(userId: string) {
        try {
            const response = await axiosPrivate({
                method: "DELETE",
                url: `/admin/users/${userId}`,
            });
            return response.data;
        } catch (error: any) {
            console.error('Delete user error:', error);
            throw error;
        }
    }

    // ... keep your other methods
}

export default AdminUtils;