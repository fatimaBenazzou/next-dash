import { getProductById } from "@/action/server/product";
import ProductForm from "@/components/ProductForm";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ productId: string }> };

export default async function NewProductPage({ params }: PageProps) {
    const productId = (await params).productId;
    let product = null;
    let pageTitle = "Create New Product";

    if (productId !== "new") {
        product = (await getProductById(productId)) as ProductI;

        if (!product) {
            notFound();
        }
        pageTitle = `Edit Product`;
    }
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{pageTitle}</h1>
            <ProductForm initialData={product} />
        </div>
    );
}
