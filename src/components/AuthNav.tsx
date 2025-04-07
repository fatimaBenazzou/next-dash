"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthNav() {
    const pathname = usePathname();

    const isLoginPage = pathname === "/auth/login";

    return (
        <nav className="text-center mb-8">
            {isLoginPage ? (
                <p className="text-gray-600">
                    Dont have an account?{" "}
                    <Link
                        href="/auth/register"
                        className="text-blue-500 hover:text-blue-700 underline transition-colors duration-200"
                    >
                        Sign up
                    </Link>
                </p>
            ) : (
                <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                        href="/auth/login"
                        className="text-blue-500 hover:text-blue-700 underline transition-colors duration-200"
                    >
                        Log in
                    </Link>
                </p>
            )}
        </nav>
    );
}
