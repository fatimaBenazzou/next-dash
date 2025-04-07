import { getOrders } from "@/action/server/order";
import ErrorMessage from "@/components/ErrorMessage";
import DataTable, { TableColumn } from "@/components/DataTable";
import { DZD } from "@/lib/currency";

const ordersColumns = [
    {
        key: "userId",
        header: "User",
        render: (order) => `${order.userId?.firstName} ${order.userId?.lastName}`,
    },
    { key: "total", header: "Total", render: (order) => DZD.format(order.total) },
    { key: "status", header: "Status" },
] as TableColumn<OrderI<string, UserI | null, ProductI | null>>[];
export default async function OrdersPage() {
    const data = await getOrders();

    if (!data) return <ErrorMessage message="No orders found" />;

    const orders = data || [];
    console.log(orders[0]);
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>

            <div className="overflow-x-auto">
                <DataTable data={orders} columns={ordersColumns} />
            </div>
        </div>
    );
}
