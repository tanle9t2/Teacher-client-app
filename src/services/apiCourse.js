import api from "./api";

export async function createCourse({ name, teacherId, categoryId }) {
    try {
        const res = await api.post(`/course`, { name, teacherId, categoryId });
        return res.data;
    } catch (error) {
        console.error("Failed create course:", error);
        throw new Error("Failed create course");
    }
}
export async function getBasicsInfo(id) {
    try {
        const res = await api.get(`/course/${id}/basics`);
        return res.data;
    } catch (error) {
        console.error("Failed create course:", error);
        throw new Error("Failed getting basic info course");
    }
}
export async function updateBasicsInfor({ id, name, description, level, price, category }, file) {
    const formData = new FormData()
    if (name) formData.append("name", name)
    if (description) formData.append("description", description)
    if (level) formData.append("level", level)
    if (category) formData.append("category", category)
    if (file) formData.append("file", file)
    if (price) formData.append("price", price)
    try {
        const res = await api.post(`/course/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return res.data;
    } catch (error) {
        console.error("Failed create course:", error);
        throw new Error("Failed getting basic info course");
    }
}

export async function getCourseOfTeacher(teacherId, page) {
    try {
        const res = await api.get(`/courses/teacher/${teacherId}?page=${page}`);
        return res.data;
    } catch (error) {
        console.error("Failed create course:", error);
        throw new Error("Failed create course");
    }
}
export async function getCourse(courseId) {
    try {
        const res = await api.get(`/course/${courseId}`);
        return res.data;
    } catch (error) {
        console.error("Failed create course:", error);
        throw new Error("Failed create course");
    }
}