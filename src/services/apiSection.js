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