import { deleteUser } from "@/action/server/user";
import DeleteButton from "./DeleteButton";

export default function UserDeleteButton({ id }: { id: string }) {
    return (
        <DeleteButton
            id={id}
            deleteFn={deleteUser}
            queryKey={["users"]}
            onSuccessMessage="User deleted successfully!"
            onErrorMessage="Failed to delete user"
        />
    );
}
