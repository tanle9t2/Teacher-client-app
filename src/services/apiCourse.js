import { AUTH_REQUEST } from "../utils/axiosConfig";


export async function createCourse({ name, teacherId, categoryId }) {
    try {
        const res = await AUTH_REQUEST.post(`/course`, { name, teacherId, categoryId });
        return res.data;
    } catch (error) {
        console.error("Failed create course:", error);
        throw new Error("Failed create course");
    }
}
export async function getBasicsInfo(id) {
    try {
        const res = await AUTH_REQUEST.get(`/course/${id}/basics`);
        return res.data;
    } catch (error) {
        console.error("Failed create course:", error);
        throw new Error("Failed getting basic info course");
    }
}
export async function updateBasicsInfor({ id, name, description, level, price, publish, category }, file) {

    const formData = new FormData()
    if (name) formData.append("name", name)
    if (description) formData.append("description", description)
    if (level) formData.append("level", level)
    if (category) formData.append("category", category)
    if (file) formData.append("file", file)
    if (price) formData.append("price", price)
    if (publish !== null && publish !== undefined) formData.append("publish", publish)
    try {
        const res = await AUTH_REQUEST.post(`/course/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return res.data;
    } catch (error) {
        console.error("Failed create course:", error);
        throw new Error("Failed getting basic info course");
    }
}
export async function deleteCourseByID(id) {
    try {
        const res = await AUTH_REQUEST.delete(`/course/${id}`);
        return res.data;
    } catch (error) {
        console.error("Failed delete course:", error);
        throw new Error("Failed delete course");
    }
}
export async function getCourseOfTeacher(page, kw) {
    const params = new URLSearchParams();
    if (kw)
        params.append("kw", kw)
    if (page)
        params.append("page", page)
    try {
        const res = await AUTH_REQUEST.get(`/courses/teacher?${params.toString()}`);
        return res.data;
    } catch (error) {
        console.error("Failed create course:", error);
        throw new Error("Failed create course");
    }
}
export async function getCourseFilter(teacherId) {
    try {
        const res = await AUTH_REQUEST.get(`/courses/filter/${teacherId}`);
        return res.data;
    } catch (error) {
        console.error("Failed create course:", error);
        throw new Error("Failed create course");
    }
}
export async function getCourse(courseId) {
    try {
        const res = await AUTH_REQUEST.get(`/course/${courseId}`);
        return res.data;
    } catch (error) {
        console.error("Failed create course:", error);
        throw new Error("Failed create course");
    }
}