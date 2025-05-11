import { AUTH_REQUEST } from "../utils/axiosConfig";

export async function createNotifcation({ content, courseId }) {

    try {
        return AUTH_REQUEST.post(`/notifications`, {
            content, courseId
        });
    } catch (error) {
        console.error("Failed create notification", error);
        throw new Error("Failed create notification");
    }
}