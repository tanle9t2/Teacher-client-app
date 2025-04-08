import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSection as updateSectionAPI } from "../../services/apiSection";
import { useParams } from "react-router-dom";

export function useUpdateSection() {
    const queryClient = useQueryClient()
    const { courseId } = useParams()
    const { isPending, mutate: updateSection } = useMutation({
        mutationFn: ({ id, name }) => updateSectionAPI({ id, name }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["course", courseId]
            })
        },
    })

    return { isPending, updateSection }
}