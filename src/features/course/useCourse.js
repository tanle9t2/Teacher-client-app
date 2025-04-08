import { useQuery } from "@tanstack/react-query";
import { getCourse } from "../../services/apiCourse";
import { useParams } from "react-router-dom";

export function useCourse() {
    const { courseId } = useParams()
    const { isLoading, data: course, error } = useQuery({
        queryKey: ["course", courseId],
        queryFn: () => getCourse(courseId)
    })
    return { isLoading, course, error }
}