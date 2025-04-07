// components/CartDropdown.tsx
"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { removeFromCart, clearCart } from "@/features/cartSlice";
import Link from "next/link";

interface CartItem {
    product: ProductI;
    quantity: number;
}

export default function CartDropdown() {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalItems = useSelector((state: RootState) => state.cart.total);
    const dispatch = useDispatch();

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <span className="badge badge-sm indicator-item">{totalItems}</span>
                </div>
            </label>
            <div
                tabIndex={0}
                className="mt-3 card card-compact dropdown-content w-96 bg-base-100 shadow"
            >
                <div className="card-body">
                    <span className="font-bold text-lg">{totalItems} Items</span>
                    <div className="mt-2">
                        {cartItems.map((item: CartItem) => (
                            <div
                                key={item.product._id}
                                className="flex justify-between items-center mb-2"
                            >
                                <div>
                                    <h3 className="font-bold">{item.product.name}</h3>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() =>
                                        dispatch(
                                            removeFromCart({
                                                productId: item.product._id as string,
                                            })
                                        )
                                    }
                                    className="btn btn-sm btn-error"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="card-actions">
                        <button
                            onClick={() => dispatch(clearCart())}
                            className="btn btn-error w-full"
                        >
                            Clear Cart
                        </button>
                        <Link href="/checkout" className="btn btn-primary w-full">
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
