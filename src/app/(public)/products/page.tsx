"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/action/server/product";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ProductsGrid from "@/components/ProductsGrid";
import Pagination from "@/components/Pagination";

const productsPerPage = 8;
export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching products</div>;

    const products = data || [];

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Products</h1>

            <SearchBar onSearchChange={setSearchQuery} />

            <ProductsGrid products={currentProducts} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
