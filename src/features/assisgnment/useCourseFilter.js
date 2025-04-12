import { useQuery } from "@tanstack/react-query"
import { getCourseFilter } from "../../services/apiCourse"

export function useCourseFilter() {
    const { isLoading, data: filters, error } = useQuery({
        queryKey: ["course", "a0a0dbd6-3be9-4a57-94aa-7e752f09c786"],
        queryFn: () => getCourseFilter("a0a0dbd6-3be9-4a57-94aa-7e752f09c786")
    })
    return { isLoading, filters, error }
}