import { useMutation } from "@tanstack/react-query";
import { createCourse as createCourseAPI } from "../../services/apiCourse";
import toast from "react-hot-toast";


export function useCreateCourse() {
    const { isLoading, mutate: createCourse } = useMutation({
        mutationFn: ({ name, teacherId, categoryId }) => createCourseAPI({ name, teacherId, categoryId }),
        onSuccess: () => {
            toast.success("Successfully create course")
        },
        onError: (error) => toast.error(error.message)
    })

    return { isLoading, createCourse }
}