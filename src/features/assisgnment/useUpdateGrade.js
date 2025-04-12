import { useMutation } from "@tanstack/react-query";
import { updateGrade as updateGradeAPI } from "../../services/apiSubmission";
import toast from "react-hot-toast";

export function useUpdateGrade() {
    const { isPending, mutate: updateGrade } = useMutation({
        mutationFn: ({ submissionId, mark }) => updateGradeAPI(submissionId, mark),
        onSuccess: () => toast.success("Successfully"),
        onError: (error) => toast.error(error.message)
    })

    return { isPending, updateGrade }
}