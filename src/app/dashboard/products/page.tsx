import { deleteProduct, getProducts } from "@/action/server/product";
import DeleteButton from "@/components/Delete/DeleteButton";
import Link from "next/link";
import DataTable from "@/components/DataTable";

const ProductColumns = [
    { key: "name" as keyof ProductI, header: "Name" },
    { key: "description" as keyof ProductI, header: "Description" },
    { key: "category" as keyof ProductI, header: "Category" },
    {
        key: "price",
        header: "Price",
        render: (product: ProductI) => `${product.price.current}DZD`,
    },
    { key: "stock" as keyof ProductI, header: "Stock" },
];

export default async function ProductsPage() {
    const data = await getProducts();

    const products = data || [];
    return (
        <div className="p-4 ">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <Link href="/dashboard/products/new" className="btn btn-primary mb-4">
                Add New Product
            </Link>
            <div className="overflow-x-auto">
                <DataTable
                    data={products}
                    columns={ProductColumns}
                    actions={(product) => (
                        <div className="flex space-x-2">
                            <Link
                                href={`/dashboard/products/${product._id}`}
                                className="btn btn-sm btn-info"
                            >
                                Edit
                            </Link>

                            <DeleteButton
                                id={product._id as string}
                                deleteFn={deleteProduct}
                                queryKey={["products"]}
                                onSuccessMessage="Product deleted successfully!"
                                onErrorMessage="Failed to delete Product"
                            />
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
