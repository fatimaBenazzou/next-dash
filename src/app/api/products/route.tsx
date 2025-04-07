// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import productModel from "@/models/product";
import dbConnect from "@/lib/dbConnection";

export async function GET(req: NextRequest) {
    try {
        const { ids } = await req.json();
        await dbConnect();
        const products = await productModel.find({ _id: { $in: ids } });
        return NextResponse.json(products);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const product: ProductI = await req.json();
    await dbConnect();
    const newProduct = await productModel.create(product);

    return NextResponse.json(
        { message: `Product '${newProduct.title}' created successfully!` },
        { status: 201 }
    );
}
