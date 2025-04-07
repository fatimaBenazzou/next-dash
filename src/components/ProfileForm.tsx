"use client";

import { Field, Form, Formik } from "formik";
import FormField from "./FormField";
import * as Yup from "yup";
import { updateUser } from "@/action/client/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const profileSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    role: Yup.string().oneOf(["admin", "user"], 'Role must be either "admin" or "user"'),
});

export default function ProfileForm({ user }: { user: UserI }) {
    const queryClient = useQueryClient();

    const { mutate, isError, error, isSuccess, isPending } = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });

    return (
        <Formik
            initialValues={{
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                role: user.role || "user",
            }}
            validationSchema={profileSchema}
            onSubmit={(values) => {
                console.log(values);
                mutate(values);
            }}
        >
            <Form className="space-y-4">
                <FormField label="First Name" name="firstName">
                    <Field type="text" name="firstName" className="input input-bordered w-full" />
                </FormField>

                <FormField label="Last Name" name="lastName">
                    <Field type="text" name="lastName" className="input input-bordered w-full" />
                </FormField>

                <FormField label="Email" name="email">
                    <Field type="email" name="email" className="input input-bordered w-full" />
                </FormField>

                <div aria-live="polite" className="text-sm">
                    {isSuccess && <p className="text-green-500">Profile updated succefully</p>}
                    {isError && <p className="text-red-500">{error.message}</p>}
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                    {isPending ? "Mise à jour..." : "Mettre à jour"}
                </button>
            </Form>
        </Formik>
    );
}
