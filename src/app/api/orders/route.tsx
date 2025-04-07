// /app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnection";
import OrderModel from "@/models/order";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        await dbConnect();
        const query = userId ? { userId } : {};
        const orders = await OrderModel.find(query).sort({ createdAt: -1 });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const order: BaseOrderI = await req.json();
        console.log("Received order data:", order.cart); // Log des données reçues

        // Validate order data here if needed
        if (!order.cart || order.cart.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }
        if (!order.userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        await dbConnect();
        const newOrder = await OrderModel.create(order);
        console.log("Order created successfully:", newOrder); // Log de la commande créée

        return NextResponse.json(
            { message: `Order created successfully!`, data: newOrder },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
