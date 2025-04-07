// /components/EditProductModal.tsx
"use client";

import { useState } from "react";
import EditProductForm from "../EditProductForm";

interface EditProductModalProps {
    product: ProductI;
}

export default function EditProductModal({ product }: EditProductModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className="btn btn-sm btn-info" onClick={() => setIsOpen(true)}>
                Edit
            </button>

            <dialog open={isOpen} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Product</h3>

                    <div className="modal-action">
                        <button t onClick={() => setIsOpen(false)} className="btn">
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
