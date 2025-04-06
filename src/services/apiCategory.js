import api from "./api";

export async function getCategoryFollowLevel(parentName, level) {
    try {
        const res = await api.get(`/categories?parentName=${parentName}&level=${level}`);
        return res.data;
    } catch (error) {
        console.error("Failed getting category:", error);
        throw new Error("Failed getting cart");
    }
}