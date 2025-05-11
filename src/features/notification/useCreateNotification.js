import { useMutation } from "@tanstack/react-query";
import { createNotifcation as createNotificationAPI } from "../../services/apiNotification";

export function useCreateNotificatoin() {
    const { isPending, mutate: createNotification } = useMutation({
        mutationFn: ({ courseId, content }) => createNotificationAPI({ content, courseId })
    })

    return { isPending, createNotification }
}