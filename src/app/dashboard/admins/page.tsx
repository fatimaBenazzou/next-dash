import Link from "next/link";
import { getAdmins } from "@/action/server/user";
import DataTable from "@/components/DataTable";

const userColumns = [
    { key: "firstName" as keyof UserI<string>, header: "First Name" },
    { key: "lastName" as keyof UserI<string>, header: "Last Name" },
    { key: "email" as keyof UserI<string>, header: "Email" },
];

export default async function AdminsPage() {
    const data = await getAdmins();
    const users = data || [];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admins</h1>
            <Link href="/dashboard/users/new" className="btn btn-primary mb-4">
                Add New Admin
            </Link>
            <div className="overflow-x-auto">
                <DataTable data={users} columns={userColumns} />
            </div>
        </div>
    );
}
