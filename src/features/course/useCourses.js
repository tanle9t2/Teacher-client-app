import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCourseOfTeacher } from "../../services/apiCourse";
import { useSearchParams } from "react-router-dom";

export function useCourses() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") ? searchParams.get("page") : 1
    const { isLoading, data: { data: courses, totalPages } = {}, error } = useQuery({
        queryKey: ["course", page],
        queryFn: () => getCourseOfTeacher("a0a0dbd6-3be9-4a57-94aa-7e752f09c786", page)
    })

    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["course", page + 1],
            queryFn: () => getCourseOfTeacher("a0a0dbd6-3be9-4a57-94aa-7e752f09c786", page + 1)
        });
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["course", page - 1],
            queryFn: () => getCourseOfTeacher("a0a0dbd6-3be9-4a57-94aa-7e752f09c786", page - 1)
        });
    }

    return { isLoading, courses, totalPages, error }
}