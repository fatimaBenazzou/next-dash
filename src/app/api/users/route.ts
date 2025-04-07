// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/user";
import dbConnect from "@/lib/dbConnection";
import { getSession } from "@/lib/auth";

export async function GET() {
    try {
        await dbConnect();
        const users = await userModel.find();
        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const userData = await req.json();
        await dbConnect();
        const newUser = await userModel.create(userData);
        return NextResponse.json(
            { message: `User '${newUser.firstName} ${newUser.lastName}' created successfully!` },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { ...userData } = await req.json();

    try {
        await dbConnect();
        const updatedUser = await userModel.findByIdAndUpdate(
            session._id,
            { userData },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(
            {
                message: `User '${updatedUser.firstName} ${updatedUser.lastName}' updated successfully!`,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        await dbConnect();
        await userModel.findByIdAndDelete(id);
        return NextResponse.json({ message: "User deleted successfully!" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}
