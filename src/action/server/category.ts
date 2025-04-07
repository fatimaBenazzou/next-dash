import dbConnect from "@/lib/dbConnection";
import Category from "@/models/category";
import { revalidatePath } from "next/cache";

export async function addCategory(category: Omit<CategoryI, "_id">): Promise<void> {
    try {
        await dbConnect();
        await Category.create(category);
        revalidatePath("/dashboard/categories");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add a new category");
    }
}

export async function getCategories(): Promise<CategoryI[]> {
    try {
        await dbConnect();
        const categories = await Category.find();
        return JSON.parse(JSON.stringify(categories)); // Convertir en objet JSON
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch categories");
    }
}
