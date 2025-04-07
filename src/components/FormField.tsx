import { ErrorMessage } from "formik";

export default function FormField({
    label,
    name,
    children,
}: {
    label: string;
    name: string;
    children: React.ReactNode;
}) {
    return (
        <div className="form-control">
            <label htmlFor={name} className="label">
                <span className="label-text">{label}</span>
            </label>
            {children}
            <ErrorMessage name={name} component="div" className="text-error text-sm" />
        </div>
    );
}
