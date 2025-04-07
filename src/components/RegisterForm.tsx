"use client";

import { Field, Form, Formik } from "formik";
import FormField from "./FormField";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { register } from "@/action/client/auth";
import ErrorMessage from "./ErrorMessage";

const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
    role: Yup.string()
        .oneOf(["admin", "user"], 'Role must be either "admin" or "user"')
        .default("user"),
});

export default function RegisterForm() {
    const router = useRouter();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (values: BaseUserI) =>
            register({
                ...values,
                role: "user",
            }),
        onSuccess: (message) => {
            alert(message);
            router.push("/");
        },
        onError: (error) => {
            console.error("Registration Error:", error);
        },
    });

    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                role: "user" as const,
            }}
            validationSchema={registerSchema}
            onSubmit={(values) => mutate(values)}
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

                <FormField label="Password" name="password">
                    <Field
                        type="password"
                        name="password"
                        className="input input-bordered w-full"
                    />
                </FormField>

                {isError && (
                    <ErrorMessage
                        message={
                            error instanceof Error
                                ? error.message
                                : "An error occurred during registration"
                        }
                    />
                )}

                <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                    {isPending ? "Registering..." : "Register"}
                </button>
            </Form>
        </Formik>
    );
}
