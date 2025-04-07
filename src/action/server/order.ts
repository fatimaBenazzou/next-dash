"use server";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/dbConnection";
import Order from "@/models/order";
import Product from "@/models/product";

export async function getOrders(): Promise<OrderI<string, UserI | null, ProductI | null>[]> {
    try {
        await dbConnect();
        const orders = await Order.find().populate("userId").populate("cart.product");
        return JSON.parse(JSON.stringify(orders));
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Failed to fetch orders");
    }
}

export async function addOrder(
    order: BaseOrderI
): Promise<{ success: boolean; message: string; data?: unknown }> {
    try {
        await dbConnect();
        // check if products exist and has stock
        const products = await Product.find({
            _id: { $in: order.cart.map((item) => item.product) },
        });
        // check if all products exist
        if (products.length !== order.cart.length) {
            return { success: false, message: "Some products do not exist" };
        }
        // check if all products arent null
        const nullProducts = products.filter((product) => product === null);
        if (nullProducts.length > 0) {
            return { success: false, message: "Some products do not exist" };
        }
        const outOfStock = products.filter((product) => {
            const cartItem = order.cart.find((item) => item.product === product._id.toString());
            return product.stock < (cartItem?.quantity || 0);
        });
        if (outOfStock.length > 0) {
            return { success: false, message: "Some products are out of stock" };
        }
        // calculate total price
        const subtotal = order.cart.reduce((acc, item) => {
            const product = products.find((p) => p._id.toString() === item.product);
            return acc + (product?.price.current || 0) * item.quantity;
        }, 0);

        // calculate delivery price
        const deliveryPrice = order.delivery.province ? order.delivery.province.price : 0;
        const total = subtotal + deliveryPrice;
        // create order
        order.total = total;

        const createdOrder = await Order.create(order);
        revalidatePath("/dashboard/orders");
        return { success: true, message: "Order created successfully", data: createdOrder };
    } catch (error) {
        console.error("Error adding order:", error);
        throw new Error(
            "Failed to add order: " + (error instanceof Error ? error.message : "Unknown error")
        );
    }
}

export async function updateOrder(id: string, order: Partial<OrderI>): Promise<void> {
    try {
        await dbConnect();
        await Order.findByIdAndUpdate(id, order);
        revalidatePath("/dashboard/orders");
    } catch (error) {
        console.error("Error updating order:", error);
        throw new Error("Failed to update order");
    }
}

export async function deleteOrder(id: string): Promise<void> {
    try {
        await Order.findByIdAndDelete(id);
        revalidatePath("/dashboard/orders");
    } catch (error) {
        console.error("Error deleting order:", error);
        throw new Error("Failed to delete order");
    }
}

export async function getOrdersByUser(userId: string): Promise<OrderI[]> {
    try {
        await dbConnect();
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Failed to fetch orders");
    }
}
