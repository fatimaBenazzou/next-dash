// import { useQuery } from "@tanstack/react-query";

import { getOrdersByUser } from "@/action/server/order";
import OrderCard from "@/components/OrderCard";
// import LoadingSpinner from "@/components/LoadingSpinner";
// import ErrorMessage from "@/components/ErrorMessage";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MyOrders() {
    const session = await getSession();
    if (!session) {
        return redirect("/auth/login");
    }
    const userId = session._id;
    const data = await getOrdersByUser(userId);

    const orders = data || [];
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>
            {orders?.length === 0 ? (
                <p className="text-gray-600">You have no orders yet.</p>
            ) : (
                <div className="space-y-4">
                    {orders?.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
}
