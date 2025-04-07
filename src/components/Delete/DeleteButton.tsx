"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteButtonProps = {
    id: string;
    deleteFn: (id: string) => Promise<void>;
    queryKey: string[];
    onSuccessMessage?: string;
    onErrorMessage?: string;
};

export default function DeleteButton({
    id,
    deleteFn,
    queryKey,
    onSuccessMessage = "Item deleted successfully!",
    onErrorMessage = "Failed to delete item",
}: DeleteButtonProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => deleteFn(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            alert(onSuccessMessage);
        },
        onError: () => {
            alert(onErrorMessage);
        },
    });

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this item?")) {
            mutation.mutate();
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="btn btn-sm btn-error"
            disabled={mutation.isPending}
        >
            {mutation.isPending ? "Deleting..." : "Delete"}
        </button>
    );
}
