"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { clearCart } from "@/features/cartSlice";
import toast from "react-hot-toast";
import { provincesPrices } from "@/app/api/provinces-prices";
import { addOrder } from "@/action/client/order";
import OrderSummary from "@/components/OrderSummart";
import CheckoutForm from "@/components/CheckoutForm";
import { useSession } from "next-auth/react";
// import { useSession } from "next-auth/react";
// import { getSession } from "@/lib/auth";

const calculateSubtotal = (cartItems: CartItem[]) => {
    return cartItems.reduce((total, item) => total + item.product.price.current * item.quantity, 0);
};

export default function Checkout() {
    const router = useRouter();
    const { data: session } = useSession();

    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const subtotal = calculateSubtotal(cartItems);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const totalPrice = subtotal + deliveryPrice;

    const { isPending, mutate: createOrder } = useMutation({
        mutationFn: async (orderData: BaseOrderI) => {
            const result = await addOrder(orderData);
            if (!result.success) throw new Error(result.message);
            return result;
        },
        onSuccess: (result) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            dispatch(clearCart());
            toast.success(result.message || "Order confirmed 🎉");
            router.push("/products");
        },
        onError: (error) => {
            console.error("Order error:", error);
            toast.error(error.message || "Failed to confirm order. Please try again.");
        },
    });

    const handleProvinceChange = (
        provinceId: number,
        setFieldValue: (field: string, value: number) => void
    ) => {
        const selectedProvince = provincesPrices.find(
            (province: ProvinceI) => province.id === provinceId
        );
        if (selectedProvince?.price) {
            setDeliveryPrice(selectedProvince.price);
        }
        setFieldValue("province", provinceId);
    };

    const handleSubmit = (values: Delivery) => {
        const cart = cartItems.map((item) => ({
            product: item.product._id as string,
            quantity: item.quantity,
        }));

        const orderData: BaseOrderI = {
            userId: session?.user._id as string,
            cart,
            delivery: values,
            total: totalPrice,
            status: "pending",
        };
        createOrder(orderData);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>

            <OrderSummary
                subtotal={subtotal}
                deliveryPrice={deliveryPrice}
                totalPrice={totalPrice}
            />

            <CheckoutForm
                isPending={isPending}
                handleProvinceChange={handleProvinceChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}
