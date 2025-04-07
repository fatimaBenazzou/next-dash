"use server";

import { revalidatePath } from "next/cache";
import Product from "@/models/product";
import dbConnect from "@/lib/dbConnection";
// import { SortOrder } from "mongoose";
// interface GetProductsParams {
//     search?: string;
//     page?: number;
//     sort?: string;
//     sortDir?: string;
// }

// export async function getProducts({
//     search,
//     page = 1,
//     sort = "name",
//     sortDir = "asc",
// }: GetProductsParams): Promise<{ products: ProductI[]; total: number }> {
//     try {
//         await dbConnect();

//         // Construire la requête de recherche
//         const query = search
//             ? { name: { $regex: search, $options: "i" } } // Recherche insensible à la casse
//             : {};

//         // Construire le tri
//         const sortOptions: { [key: string]: SortOrder } = { [sort]: sortDir === "asc" ? 1 : -1 };

//         // Pagination
//         const limit = 8;
//         const skip = (page - 1) * limit;

//         // Récupérer les produits
//         const products = await Product.find(query)
//             .sort(sortOptions) // Utiliser l'objet de tri correctement typé
//             .skip(skip)
//             .limit(limit)
//             .lean();

//         // Récupérer le total des produits pour la pagination
//         const total = await Product.countDocuments(query);

//         return {
//             products: JSON.parse(JSON.stringify(products)), // Convertir en objet JSON
//             total,
//         };
//     } catch (error) {
//         console.log(error);
//         throw new Error("Failed to fetch products");
//     }
// }

export async function getProducts(): Promise<ProductI[]> {
    try {
        await dbConnect();
        const products = await Product.find();
        return JSON.parse(JSON.stringify(products)); // Convertir en objet JSON
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch products");
    }
}

export async function getProductById(id: string): Promise<ProductI | null> {
    try {
        await dbConnect(); // Assurez-vous que la connexion à la base de données est établie
        const product = await Product.findById(id).exec();

        if (!product) {
            throw new Error("Product not found");
        }

        return JSON.parse(JSON.stringify(product)); // Convertir en objet JSON
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw new Error("Failed to fetch product");
    }
}

export async function addProduct(product: Omit<ProductI, "_id">): Promise<void> {
    try {
        await dbConnect();
        await Product.create(product);
        revalidatePath("/dashboard/products");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add product");
    }
}
export async function updateProduct(id: string, product: Partial<ProductI>): Promise<void> {
    try {
        await dbConnect();
        await Product.findByIdAndUpdate(id, product);
        revalidatePath("/dashboard/products");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add product");
    }
}
export async function deleteProduct(id: string): Promise<void> {
    try {
        await Product.findByIdAndDelete(id);
        revalidatePath("/dashboard/products");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete product");
    }
}
