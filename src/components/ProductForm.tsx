"use client";

import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { addProduct } from "@/action/client/product";

interface PageProps {
    initialData: ProductI | null;
}

export default function ProductForm({ initialData }: PageProps) {
    const router = useRouter();

    const handleSubmit = async (values: Omit<ProductI, "_id">) => {
        await addProduct(values);
        router.push("/dashboard/products");
    };
    return (
        <Formik
            initialValues={{
                name: initialData?.name || "",
                description: initialData?.description || "",
                price: {
                    current: initialData?.price?.current || 0,
                    original: initialData?.price?.original || 0,
                },
                stock: initialData?.stock || 0,
                image: initialData?.image || "",
                category: initialData?.category || "",
            }}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <Field type="text" name="name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <Field
                            as="textarea"
                            name="description"
                            className="textarea textarea-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <Field
                            type="number"
                            name="price.current"
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Stock</span>
                        </label>
                        <Field type="number" name="stock" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <Field type="text" name="image" className="input input-bordered" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </Form>
            )}
        </Formik>
    );
}
