import { useMutation } from "@tanstack/react-query"
import { updateContent as updateContentAPI } from "../../services/apiContent"

export function useUpdateContent() {
    const { isPending, mutate: updateContent } = useMutation({
        mutationFn: ({ id, name, type, file }) => updateContentAPI({ id, name, type }, file),

    })

    return { isPending, updateContent }
}