import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCourseOfTeacher } from "../../services/apiCourse";
import { useSearchParams } from "react-router-dom";

export function useCourses() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") ? searchParams.get("page") : 1
    const kw = searchParams.get("kw")
    const { isLoading, data: { data: courses, totalPages } = {}, error } = useQuery({
        queryKey: ["course", page, kw],
        queryFn: () => getCourseOfTeacher(page, kw)
    })

    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["course", page + 1, kw],
            queryFn: () => getCourseOfTeacher(page + 1, kw)
        });
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["course", page - 1, kw],
            queryFn: () => getCourseOfTeacher(page - 1,)
        });
    }

    return { isLoading, courses, totalPages, error }
}