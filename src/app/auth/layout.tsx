import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import AuthNav from "@/components/AuthNav";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession();

    if (session) {
        if (session.role === "admin") {
            return redirect("/dashboard");
        } else {
            return redirect("/");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-center">
            <div className=" p-8 rounded-lg shadow-2xl w-full max-w-md">
                <AuthNav />
                <div className="mt-6">{children}</div>
            </div>
        </div>
    );
}
