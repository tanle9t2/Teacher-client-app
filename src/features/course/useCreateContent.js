import { useMutation } from "@tanstack/react-query"
import { createContent as createContentAPI } from "../../services/apiContent"

export function useCreateContent() {
    const { isPending, mutate: createContent } = useMutation({
        mutationFn: ({ sectionId, name, typeResource, typeContent, file }) => createContentAPI({ sectionId, name, typeResource, typeContent }, file),

    })

    return { isPending, createContent }
}