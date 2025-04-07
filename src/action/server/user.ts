"use server";

import { revalidatePath } from "next/cache";
import userModel from "@/models/user";
import dbConnect from "@/lib/dbConnection";

export async function getUsers(): Promise<UserI[]> {
    try {
        await dbConnect();
        const users = await userModel.find({ role: "user" });
        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch users");
    }
}
export async function getAdmins(): Promise<UserI[]> {
    try {
        await dbConnect();
        const users = await userModel.find({ role: "admin" });
        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch admins");
    }
}

export async function getUserById(id: string): Promise<UserI | null> {
    try {
        await dbConnect();
        const user = await userModel.findById(id).exec();
        if (!user) {
            throw new Error("User not found");
        }
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw new Error("Failed to fetch user");
    }
}

export async function addUser(user: Omit<UserI, "_id">): Promise<void> {
    try {
        await dbConnect();
        await userModel.create(user);
        revalidatePath("/dashboard/users");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add user");
    }
}

export async function updateUser(id: string, user: Partial<UserI>): Promise<void> {
    try {
        await dbConnect();
        await userModel.findByIdAndUpdate(id, user);
        revalidatePath("/dashboard/users");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to update user");
    }
}

export async function deleteUser(id: string): Promise<void> {
    try {
        await dbConnect();
        await userModel.findByIdAndDelete(id);
        revalidatePath("/dashboard/users");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete user");
    }
}
