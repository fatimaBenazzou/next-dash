"use client";

import axiosConfig from "./axiosConfig";

export async function fetchUsers(): Promise<UserI[]> {
    const response = await axiosConfig.get("/users");
    return response.data;
}

export async function addUser(user: Omit<UserI, "_id">) {
    const response = await axiosConfig.post("/users", user);
    return response.data;
}

export async function updateUser(user: Partial<UserI>) {
    const response = await axiosConfig.put("/users", { user });
    return response.data;
}

export async function deleteUser(id: string) {
    const response = await axiosConfig.delete("/users", { data: { id } });
    return response.data;
}
