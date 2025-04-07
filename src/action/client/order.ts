// actions/client/product.ts
"use client";

import axiosConfig from "./axiosConfig";

export async function fetchOrders(): Promise<OrderI[]> {
    const response = await axiosConfig.get("/orders");
    return response.data;
}

export async function addOrder(
    order: BaseOrderI
): Promise<{ success: boolean; message: string; data?: unknown }> {
    try {
        const response = await axiosConfig.post("/orders", order);
        if (response.status !== 201) {
            throw new Error("Failed to create order: " + response.statusText);
        }
        return { success: true, message: "Order created successfully", data: response.data };
    } catch (error) {
        console.error("Error adding order:", error);
        throw new Error(
            "Failed to create order: " + (error instanceof Error ? error.message : "Unknown error")
        );
    }
}

export async function updatedOrder(id: string, order: Partial<OrderI>) {
    const response = await axiosConfig.put("/orders", { data: { id, order } });
    return response.data;
}
export async function deleteOrder(id: string) {
    const response = await axiosConfig.delete("/orders", { data: { id } });
    return response.data;
}

export async function getOrdersByUser(userId: string): Promise<OrderI[]> {
    try {
        const response = await axiosConfig.get(`/api/orders?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders by user:", error);
        throw new Error("Failed to fetch orders by user");
    }
}
