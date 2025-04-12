import api from "./api";
export async function getSubmissions({ courseId, page, size, sortField, orderBy }) {
    const params = new URLSearchParams();

    if (courseId) params.append("courseId", courseId);
    if (page) params.append("page", page);
    if (size) params.append("size", size);
    if (sortField) params.append("sortField", sortField)
    if (orderBy) params.append("orderBy", orderBy)
    try {
        const res = await api.get(`/submissions?${params.toString()}`);
        return res.data;
    } catch (error) {
        console.error("Failed to fetch submissions:", error);
        throw new Error("Failed to fetch submissions");
    }
}
export async function getSubmission(submissionId) {
    try {
        const res = await api.get(`/submission/${submissionId}`);
        return res.data;
    } catch (error) {
        console.error("Failed to fetch submissions:", error);
        throw new Error("Failed to fetch submissions");
    }
}
export async function updateGrade(submissionId, mark) {
    try {
        const res = await api.put(`/submission/${submissionId}/mark?mark=${mark}`);
        return res.data;
    } catch (error) {
        console.error("Failed to fetch submissions:", error);
        throw new Error("Failed to fetch submissions");
    }
}
export async function createCommnent({ submissionId, content, userInfo }) {
    try {
        const res = await api.post(`/submission/${submissionId}/comment`, { content, userInfo });
        return res.data;
    } catch (error) {
        console.error("Failed to fetch submissions:", error);
        throw new Error("Failed to fetch submissions");
    }
}