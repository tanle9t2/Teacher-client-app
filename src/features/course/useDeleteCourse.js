import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourseByID } from "../../services/apiCourse";
import toast from "react-hot-toast";



export function useDeleteCourse() {
    const queryClient = useQueryClient()

    const { isLoading, mutate: deleteCourse } = useMutation({
        mutationFn: (id) => deleteCourseByID(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['course'],
                exact: false, // important to match all pages like ['posts', { page: 1 }]
            });
            toast.success("Successfully delete course")
        },
        onError: (error) => toast.error(error.message)
    })

    return { isLoading, deleteCourse }
}