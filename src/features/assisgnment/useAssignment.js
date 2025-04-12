import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getSubmission } from "../../services/apiSubmission"

export function useAssignment() {
    const { answerId } = useParams()
    const { isLoading, data: submission, error } = useQuery({
        queryKey: ["submission", answerId],
        queryFn: () => getSubmission(answerId)
    })
    return { isLoading, submission, error }
}