"use client";

import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

interface SearchBarProps {
    onSearchChange: (value: string) => void;
}

export default function SearchBar({ onSearchChange }: SearchBarProps) {
    const [currentSearch, setCurrentSearch] = useState("");
    const debouncedSearch = useDebounce(currentSearch, 300);

    useEffect(() => {
        onSearchChange(debouncedSearch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    return (
        <form>
            <label>
                <input
                    type="search"
                    placeholder="Search for products"
                    value={currentSearch}
                    onChange={(e) => {
                        setCurrentSearch(e.target.value);
                    }}
                />
                <span>🔍</span>
            </label>
        </form>
    );
}
