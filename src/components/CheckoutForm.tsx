import { Field, Form, Formik } from "formik";
import FormField from "./FormField";
import { ChangeEvent } from "react";
import { provincesPrices } from "@/app/api/provinces-prices";
import * as Yup from "yup";

const checkoutSchema = Yup.object().shape({
    province: Yup.number().required("Province is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string(),
    phone: Yup.string()
        .matches(/^(00213|\+213|0)(5|6|7)[0-9]{8}$/, "Phone number is not valid")
        .required("Phone number is required"),
});

export default function CheckoutForm({
    isPending,
    handleProvinceChange,
    handleSubmit,
}: {
    isPending: boolean;
    handleProvinceChange: (
        provinceId: number,
        setFieldValue: (field: string, value: number) => void
    ) => void;
    handleSubmit: (values: Delivery) => void;
}) {
    return (
        <Formik
            initialValues={{
                province: -1,
                city: "",
                address: "",
                phone: "",
            }}
            validationSchema={checkoutSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue }) => (
                <Form className="space-y-4">
                    {/* Province */}
                    <FormField label="Province" name="province">
                        <Field
                            as="select"
                            name="province"
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                handleProvinceChange(parseInt(e.target.value), setFieldValue)
                            }
                            className="select select-bordered w-full"
                        >
                            <option value="">Select a province</option>
                            {provincesPrices.map((province: ProvinceI) => (
                                <option key={province.id} value={province.id}>
                                    {province.name.en} ({province.price} DA)
                                </option>
                            ))}
                        </Field>
                    </FormField>

                    {/* City */}
                    <FormField label="City" name="city">
                        <Field type="text" name="city" className="input input-bordered w-full" />
                    </FormField>

                    {/* Address */}
                    <FormField label="Address" name="address">
                        <Field type="text" name="address" className="input input-bordered w-full" />
                    </FormField>

                    {/* Phone */}
                    <FormField label="Phone Number" name="phone">
                        <Field type="text" name="phone" className="input input-bordered w-full" />
                    </FormField>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                        {isPending ? "Confirming..." : "Confirm Order"}
                    </button>
                </Form>
            )}
        </Formik>
    );
}
