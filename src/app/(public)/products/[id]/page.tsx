import { getProductById } from "@/action/server/product";
import ProductDetails from "@/components/ProductDetails";
import ErrorMessage from "@/components/ErrorMessage";
import BackButton from "@/components/BackButton";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) return <ErrorMessage message="Product not found" />;

    return (
        <div className="p-4">
            <BackButton />
            <ProductDetails product={product} />
        </div>
    );
}
