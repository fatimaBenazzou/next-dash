// components/CategoryDropdown.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoryDropdown() {
    const [categories, setCategories] = useState<CategoryI[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch("/api/categories");
            const data = await response.json();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    return (
        <div className="dropdown">
            <label tabIndex={0} className="btn m-1">
                Categories
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
                {categories.map((category) => (
                    <li key={category._id}>
                        <Link href={`/products?category=${category.slug}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
