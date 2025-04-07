"use client";
import React from "react";
import { doLogout } from "@/action/client/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
    const { mutate } = useMutation({
        mutationFn: doLogout,
        onSuccess: () => {
            router.push("/");
        },
        onError: (error) => {
            console.error("Login Error:", error);
        },
    });
    return (
        <button className="btn btn-error " onClick={() => mutate()}>
            Logout
        </button>
    );
}
