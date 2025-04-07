// /components/OrderCard.tsx

interface OrderCardProps {
    order: OrderI;
}

export default function OrderCard({ order }: OrderCardProps) {
    return (
        <div className=" p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Order #{order._id}</h2>
                <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                </span>
            </div>
            <div className="space-y-2">
                <p>
                    <strong>User ID:</strong> {order.userId}
                </p>
                <p>
                    <strong>Status:</strong> {order.status}
                </p>
                <p>
                    <strong>Total:</strong> {order.total} DA
                </p>
                <p>
                    <strong>Delivery:</strong> {order.delivery.city}, {order.delivery.province}
                </p>
            </div>
        </div>
    );
}
