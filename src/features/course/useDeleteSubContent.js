import { useMutation } from "@tanstack/react-query"
import { deleteSubContent as deleteSubContentAPI } from "../../services/apiContent"

export function useDeleteSubContent() {
    const { isPending, mutate: deleteSubContent } = useMutation({
        mutationFn: ({ subId }) => deleteSubContentAPI(subId),

    })

    return { isPending, deleteSubContent }
}