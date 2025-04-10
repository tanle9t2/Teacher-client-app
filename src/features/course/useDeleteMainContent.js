import { useMutation } from "@tanstack/react-query"
import { deleteMainContent as deleteMainContentAPI } from "../../services/apiContent"

export function useDeleteMainContent() {
    const { isPending, mutate: deleteMainContent } = useMutation({
        mutationFn: ({ id }) => deleteMainContentAPI(id),
    })

    return { isPending, deleteMainContent }
}