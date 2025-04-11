import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getBasicsInfo } from "../../services/apiCourse"

export function useBasicsInfoCourse() {
    const { courseId } = useParams()
    const { isLoading, data: course, error } = useQuery({
        queryKey: ["courseInfor", courseId],
        queryFn: () => getBasicsInfo(courseId)
    })
    return { isLoading, course, error }
}