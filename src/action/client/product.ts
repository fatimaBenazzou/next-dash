// actions/client/product.ts
"use client";

import axiosConfig from "./axiosConfig";

export async function fetchProducts(): Promise<ProductI[]> {
    const response = await axiosConfig.get("/products");
    return response.data;
}

export async function addProduct(product: ProductI) {
    const response = await axiosConfig.post("/products", product);
    return response.data;
}

export async function updatedProduct(id: string, product: Partial<ProductI>) {
    const response = await axiosConfig.put("/products", { data: { id, product } });
    return response.data;
}
export async function deleteProduct(id: string) {
    const response = await axiosConfig.delete("/products", { data: { id } });
    return response.data;
}
