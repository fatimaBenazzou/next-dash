"use client";

import { useEffect } from "react";

type Props = {
    error: Error;
    reset(): void;
};

export default function Error({ error, reset }: Props) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 p-8">
            <h2 className="font-sans text-5xl font-bold text-primary text-opacity-60 lg:text-7xl">
                ERROR
            </h2>
            <h2 className="text-3xl font-bold text-primary lg:text-5xl">Something went wrong!</h2>
            <p className="max-w-lg font-sans text-sm lg:text-base">
                We have unfortunately encountered an error.
            </p>
            <div className="flex gap-4">
                <button
                    className="max-w-lg px-12 py-2 font-sans text-sm lg:text-base"
                    onClick={() => reset()}
                >
                    Reload
                </button>
                <button
                    className="max-w-lg px-10 py-2 font-sans text-sm lg:text-base"
                    onClick={() => {}}
                >
                    Go Home
                </button>
            </div>
        </div>
    );
}
