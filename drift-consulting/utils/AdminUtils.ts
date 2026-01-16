'use client';
import {axiosPublic, axiosPrivate} from "@/utils/AxiosInstance"

class AdminUtils {
    static async adminData() {
        try {
            const response = await axiosPrivate({
                method: "GET",
                url: '/admin/profile',
            });
            return response.data;
        } catch (error) {
            console.log({error});
            throw new Error(error);
        }
    }

    static async createUser(obj) {
        try {
            const response = await axiosPrivate({
                method: "POST",
                url: '/admin/users/create',
                data: obj,
            });
            return response.data;
        } catch (error) {
            console.log({error});
            throw new Error(error);
        }
    }

    static async allUser(params) {
        try {
            const response = await axiosPrivate({
                method: "GET",
                url: '/admin/users/all',
                params: params,
            });
            return response.data;
        } catch (error) {
            console.log({error});
            throw new Error(error);
        }
    }

    static async updateUserBasicInfo(obj) {
        try {
            const response = await axiosPrivate({
                method: "PATCH",
                url: '/admin/users/update/basic-info',
                data: obj,
            });
            return response.data;
        } catch (err) {
            console.log({err});
            throw new Error(err);
        }
    }
}

export default AdminUtils;