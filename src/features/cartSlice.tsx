"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Charger le panier depuis localStorage
const loadCartFromLocalStorage = (): CartI => {
    try {
        if (typeof window !== "undefined") {
            const cart = localStorage.getItem("cart");
            console.log(cart);
            return cart ? JSON.parse(cart) || { items: [], total: 0 } : { items: [], total: 0 };
        }
        return { items: [], total: 0 };
    } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
        return { items: [], total: 0 };
    }
};

// Sauvegarder le panier dans localStorage
const saveCartToLocalStorage = (cart: CartI) => {
    if (cart.items.length) {
        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        localStorage.removeItem("cart");
    }
};

const initialState: CartI = loadCartFromLocalStorage();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const { product, quantity = 1 } = action.payload;
            const existingProductIndex = state.items.findIndex(
                (item) => item.product._id === product._id
            );

            if (existingProductIndex !== -1) {
                state.items[existingProductIndex].quantity += quantity;
            } else {
                state.items.push({ product, quantity });
            }

            // Mettre à jour le total
            state.total = state.items.reduce((total, item) => total + item.quantity, 0);

            saveCartToLocalStorage(state);
        },
        removeFromCart: (
            state,
            action: PayloadAction<{ productId: string; quantity?: number }>
        ) => {
            const { productId, quantity = 1 } = action.payload;
            state.items = state.items
                .map((item) => {
                    if (item.product._id === productId) {
                        return { ...item, quantity: item.quantity - quantity };
                    }
                    return item;
                })
                .filter((item) => item.quantity > 0);

            // Mettre à jour le total
            state.total = state.items.reduce((total, item) => total + item.quantity, 0);

            saveCartToLocalStorage(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            saveCartToLocalStorage(state);
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
