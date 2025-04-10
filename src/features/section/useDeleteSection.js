import { useMutation } from "@tanstack/react-query"

import { deleteSection as deleteSectionAPI } from "../../services/apiSection"

export function useDeleteSection() {
    const { isPending, mutate: deleteSection } = useMutation({
        mutationFn: ({ id }) => deleteSectionAPI(id),
    })

    return { isPending, deleteSection }
}