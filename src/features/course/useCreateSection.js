import { useMutation } from "@tanstack/react-query"
import { createSection as createSectionAPI } from "../../services/apiSection"

export function useCreateSection() {
    const { isPending, mutate: createSection } = useMutation({
        mutationFn: ({ courseId, name }) => createSectionAPI({ courseId, name }),

    })

    return { isPending, createSection }
}