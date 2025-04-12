import { useSearchParams } from "react-router-dom";
import { getSubmissions } from "../../services/apiSubmission";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useAssignments() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") ? searchParams.get("page") : 1
    const courseId = searchParams.get("courseId") ? searchParams.get("courseId") : null

    const sortField = searchParams.get("sortField") ? searchParams.get("sortField") : null
    const orderBy = searchParams.get("orderBy") ? searchParams.get("orderBy") : null
    const { isLoading, data: { data: assignments, totalPages } = {}, error } = useQuery({
        queryKey: ["submissions", page, courseId, sortField, orderBy],
        queryFn: () => getSubmissions({ courseId, page, sortField, orderBy })
    })

    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["submissions", page + 1, courseId, sortField, orderBy],
            queryFn: () => getSubmissions({ courseId, page: page + 1, sortField, orderBy })
        });
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["submissions", page - 1, courseId, sortField, orderBy],
            queryFn: () => getSubmissions({ courseId, page: page - 1, sortField, orderBy })
        });
    }


    return { isLoading, assignments, totalPages, error }
}