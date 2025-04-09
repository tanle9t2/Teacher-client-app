import { useMutation } from "@tanstack/react-query";
import { updateSection as updateSectionAPI } from "../../services/apiSection";


export function useUpdateSection() {
    const { isPending, mutate: updateSection } = useMutation({
        mutationFn: ({ id, name }) => updateSectionAPI({ id, name }),

    })

    return { isPending, updateSection }
}