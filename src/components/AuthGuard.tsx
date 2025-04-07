// src/components/AuthGuard.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";

interface AuthGuardProps {
    children: React.ReactNode;
    requiredRole?: "admin" | "user";
}

export default function AuthGuard({ children, requiredRole }: AuthGuardProps) {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const session = await getSession();

            if (!session?.user) {
                router.push("/auth/login");
                return;
            }

            if (requiredRole && (session.user as BaseUserI).role !== requiredRole) {
                router.push("/");
                return;
            }
        };

        checkAuth();
    }, [router, requiredRole]);

    return <>{children}</>;
}
