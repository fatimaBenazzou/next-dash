"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cartSlice";
import Image from "next/image";

interface ProductCardProps {
    product: ProductI;
}

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ product, quantity: 1 }));
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <Link href={`/products/${product._id}`}>
                <figure className="px-4 pt-4">
                    <Image
                        width={300}
                        height={300}
                        src={product.image || "https://placehold.co/300"}
                        alt={product.name}
                        className="rounded-xl h-48 object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p>{product.description}</p>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">${product.price.current}</p>
                        <p className="text-sm">Stock: {product.stock}</p>
                    </div>
                </div>
            </Link>
            <div className="card-actions justify-end p-4">
                <button onClick={handleAddToCart} className="btn btn-primary">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
