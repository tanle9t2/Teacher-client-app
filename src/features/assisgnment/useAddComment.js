import { useMutation } from "@tanstack/react-query"
import { createCommnent as createCommnentAPI } from "../../services/apiSubmission"
import toast from "react-hot-toast"

export function useAddComment() {
    const { isPending, mutate: createCommnent } = useMutation({
        mutationFn: ({ submissionId, content, userInfo }) => createCommnentAPI({ submissionId, content, userInfo }),
        onSuccess: () => toast.success("Successfully"),
        onError: (error) => toast.error(error.message)
    })

    return { isPending, createCommnent }
}