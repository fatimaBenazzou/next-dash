"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface SortButtonProps {
    sortables: string[];
    currentSort: string;
    currentSortDir: string;
}

export default function SortButton({ sortables, currentSort, currentSortDir }: SortButtonProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSort = (newSort: string, newSortDir: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", newSort);
        params.set("sortDir", newSortDir);
        params.set("page", "1"); // Reset à la première page lors d'un changement de tri
        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="flex gap-2 mb-4">
            <select
                value={currentSort}
                onChange={(e) => handleSort(e.target.value, currentSortDir)}
                className="p-2 border rounded"
            >
                {sortables.map((sortable) => (
                    <option key={sortable} value={sortable}>
                        Sort by {sortable}
                    </option>
                ))}
            </select>
            <button
                onClick={() => handleSort(currentSort, currentSortDir === "asc" ? "desc" : "asc")}
                className="p-2 border rounded"
            >
                {currentSortDir === "asc" ? "▲" : "▼"}
            </button>
        </div>
    );
}
