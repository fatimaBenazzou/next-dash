import { NextResponse } from "next/server";
import User from "@/models/user";
import dbConnect from "@/lib/dbConnection";

export async function POST(request: Request) {
    try {
        await dbConnect();

        const body = await request.json();

        const { firstName, lastName, email, password } = body.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "A user with this email already exists" },
                { status: 400 }
            );
        }

        await User.create({
            firstName,
            lastName,
            email,
            password,
            role: "user",
        });

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "An error occurred during registration" },
            { status: 500 }
        );
    }
}
