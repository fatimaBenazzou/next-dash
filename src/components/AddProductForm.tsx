// // components/AddProductForm.tsx
// "use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addProduct } from "@/action/server/product";
// import { Formik, Form, Field } from "formik";

// export default function AddProductForm() {
//     const queryClient = useQueryClient();

//     const mutation = useMutation({
//         mutationFn: addProduct,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["products"] }); // Invalider le cache pour rafraîchir les données
//             alert("Product added successfully!");
//         },
//         onError: () => {
//             alert("Failed to add product");
//         },
//     });

//     return (
//         <Formik
//             initialValues={{
//                 name: "",
//                 description: "",
//                 price: { current: 0, original: 0 },
//                 stock: 0,
//                 image: "",
//             }}
//             onSubmit={(values) => mutation.mutate(values)}
//         >
//             {({ isSubmitting }) => (
//                 <Form>
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Name</span>
//                         </label>
//                         <Field type="text" name="name" className="input input-bordered" />
//                     </div>
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Description</span>
//                         </label>
//                         <Field
//                             as="textarea"
//                             name="description"
//                             className="textarea textarea-bordered"
//                         />
//                     </div>
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Price</span>
//                         </label>
//                         <Field
//                             type="number"
//                             name="price.current"
//                             className="input input-bordered"
//                         />
//                     </div>
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Stock</span>
//                         </label>
//                         <Field type="number" name="stock" className="input input-bordered" />
//                     </div>
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Image URL</span>
//                         </label>
//                         <Field type="text" name="image" className="input input-bordered" />
//                     </div>
//                     <button
//                         type="submit"
//                         className="btn btn-primary mt-4"
//                         disabled={isSubmitting || mutation.isPending}
//                     >
//                         {isSubmitting || mutation.isPending ? "Submitting..." : "Submit"}
//                     </button>
//                 </Form>
//             )}
//         </Formik>
//     );
// }
