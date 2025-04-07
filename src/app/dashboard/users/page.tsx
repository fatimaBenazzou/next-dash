import { deleteUser, getUsers } from "@/action/server/user";
import DataTable from "@/components/DataTable";
import DeleteButton from "@/components/Delete/DeleteButton";

const userColumns = [
    { key: "firstName" as keyof UserI<string>, header: "First Name" },
    { key: "lastName" as keyof UserI<string>, header: "Last Name" },
    { key: "email" as keyof UserI<string>, header: "Email" },
    // { key: "role" as keyof UserI<string>, header: "Role" },
];

export default async function UsersPage() {
    const data = await getUsers();
    const users = data || [];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <div className="overflow-x-auto">
                <DataTable
                    data={users}
                    columns={userColumns}
                    actions={(user) => (
                        <div className="flex space-x-2">
                            <button className="btn btn-sm btn-info">Edit</button>
                            <DeleteButton
                                id={user._id}
                                deleteFn={deleteUser}
                                queryKey={["users"]}
                                onSuccessMessage="User deleted successfully!"
                                onErrorMessage="Failed to delete user"
                            />
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
