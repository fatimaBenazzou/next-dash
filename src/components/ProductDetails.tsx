"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cartSlice";
import Image from "next/image";

interface ProductDetailsProps {
    product: ProductI;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ product, quantity: 1 }));
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure className="px-4 pt-4 lg:w-1/2">
                <Image
                    width={300}
                    height={300}
                    src={product.image || "https://placehold.co/600"}
                    alt={product.name}
                    className="rounded-xl w-full h-96 object-cover"
                />
            </figure>
            <div className="card-body lg:w-1/2">
                <h2 className="card-title text-3xl">{product.name}</h2>
                <p className="text-lg">{product.description}</p>
                <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold">${product.price.current}</p>
                    <p className="text-sm">Stock: {product.stock}</p>
                </div>
                <div className="card-actions justify-end">
                    <button onClick={handleAddToCart} className="btn btn-primary">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
