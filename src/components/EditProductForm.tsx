// /components/EditProductForm.tsx
"use client";

import { Field, Form, Formik } from "formik";
import FormField from "./FormField";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "@/action/server/product";
import { useRouter } from "next/navigation";

// Schéma de validation avec Yup
const productSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.object().shape({
        current: Yup.number().required("Price is required").min(0, "Price must be positive"),
    }),
    stock: Yup.number().required("Stock is required").min(0, "Stock must be positive"),
});

interface EditProductFormProps {
    product: ProductI;
    onSuccess?: () => void;
}

export default function EditProductForm({ product, onSuccess }: EditProductFormProps) {
    const router = useRouter();

    // Mutation pour mettre à jour le produit
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (values: Partial<ProductI>) => updateProduct(product._id as string, values),
        onSuccess: () => {
            if (onSuccess) onSuccess(); // Fermer le modal ou effectuer une autre action
            router.refresh(); // Rafraîchir la page pour refléter les modifications
        },
        onError: (error) => {
            console.error("Update Error:", error);
        },
    });

    return (
        <Formik
            initialValues={{
                name: product.name,
                description: product.description,
                price: {
                    current: product.price.current,
                },
                stock: product.stock,
            }}
            validationSchema={productSchema}
            onSubmit={(values) => mutate(values)}
        >
            <Form className="space-y-4">
                <FormField label="Name" name="name">
                    <Field type="text" name="name" className="input input-bordered w-full" />
                </FormField>

                <FormField label="Description" name="description">
                    <Field
                        as="textarea"
                        name="description"
                        className="textarea textarea-bordered w-full"
                    />
                </FormField>

                <FormField label="Price" name="price.current">
                    <Field
                        type="number"
                        name="price.current"
                        className="input input-bordered w-full"
                    />
                </FormField>

                <FormField label="Stock" name="stock">
                    <Field type="number" name="stock" className="input input-bordered w-full" />
                </FormField>

                {isError && (
                    <div className="text-sm text-red-500">
                        {error instanceof Error ? error.message : "An error occurred during update"}
                    </div>
                )}

                <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                    {isPending ? "Updating..." : "Update Product"}
                </button>
            </Form>
        </Formik>
    );
}
