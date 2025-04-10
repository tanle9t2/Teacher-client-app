import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createSubContent } from "../../services/apiContent";
import { useParams } from "react-router-dom";
export function useCreateSubContent() {
    const queryClient = useQueryClient()
    const { courseId } = useParams()

    const { isPending, mutate: uploadFile } = useMutation({
        mutationFn: ({ mainContentId, type, file, setUploadProgress }) => createSubContent(file.name, type, mainContentId, file, setUploadProgress),
        onSuccess: () => {
            toast.success("Successfully upload file");
            queryClient.invalidateQueries({
                queryKey: ["course", courseId]
            })
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })

    return { isPending, uploadFile }
}