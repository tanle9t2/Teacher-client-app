import { useMutation } from "@tanstack/react-query";
import { updateBasicsInfor as updateBasicsInforAPI } from "../../services/apiCourse";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";


export function useUpdateBasicsInfo() {
    const { courseId } = useParams()
    const { isPending, mutate: updateBasicsInfor } = useMutation({
        mutationFn: ({ name, category, publish, description, level, price, file }) => updateBasicsInforAPI({ id: courseId, publish, name, category, description, price, level }, file),
        onSuccess: () => {
            toast.success("Successfully update course")
        },
        onError: (error) => toast.error(error.message)
    })

    return { isPending, updateBasicsInfor }
}