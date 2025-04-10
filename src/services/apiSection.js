import api from "./api";

export async function updateSection({ id, name }) {
    try {
        const res = await api.put(`/section/${id}`, { name });
        return res.data;
    } catch (error) {
        console.error("Failed getting category:", error);
        throw new Error("Failed getting cart");
    }
}
export async function createSection({ courseId, name }) {
    try {
        const res = await api.post(`/section`, { name, courseId });
        return res.data;
    } catch (error) {
        console.error("Failed create section:", error);
        throw new Error("Failed create section:");
    }
}
export async function deleteSection(id) {
    try {
        return api.delete(`/section/${id}`);
    } catch (error) {
        console.error("Failed delete section:", error);
        throw new Error("Failed delete section");
    }
}