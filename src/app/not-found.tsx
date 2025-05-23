"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="absolute top-1/2 left-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
            <span className="text-[10rem] font-extrabold ">404</span>
            <h2 className="font-heading my-2 text-2xl font-bold">Something&apos;s missing</h2>
            <p>Sorry, the page you are looking for doesn&apos;t exist or has been moved.</p>
            <div className="mt-8 flex justify-center gap-2">
                <button onClick={() => router.back()} className="btn btn-lg">
                    Go back
                </button>
                <button onClick={() => router.push("/dashboard")} className="btn btn-ghost btn-lg">
                    Back to Home
                </button>
            </div>
        </div>
    );
}
