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