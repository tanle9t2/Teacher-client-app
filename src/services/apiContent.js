import { AUTH_REQUEST } from "../utils/axiosConfig";


export async function createSubContent(name, type, mainContentId, file, onProgress) {
    const formData = new FormData();
    formData.append("file", file)
    formData.append("name", name)
    formData.append("type", type)
    formData.append("mainContentId", mainContentId)
    try {
        return AUTH_REQUEST.post('/content/subContent', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (event) => {
                const percent = Math.round((event.loaded * 100) / event.total);
                if (onProgress) onProgress(percent);
            },
        });
    } catch (error) {
        console.error("Failed create course:", error);
        throw new Error("Failed create course");
    }
}
export async function deleteSubContent(subId) {
    try {
        return AUTH_REQUEST.delete(`/content/sub/${subId}`);
    } catch (error) {
        console.error("Failed create course:", error);
        throw new Error("Failed create course");
    }
}
export async function deleteMainContent(id) {
    try {
        return AUTH_REQUEST.delete(`/content/${id}`);
    } catch (error) {
        console.error("Failed delete main content:", error);
        throw new Error("Failed delete main content");
    }
}
export async function createContent({ sectionId, name, typeContent, typeResource }, file) {
    const formData = new FormData();
    if (name) formData.append("name", name)
    if (sectionId) formData.append("sectionId", sectionId)
    if (typeContent) formData.append("typeContent", typeContent)
    if (file) {
        formData.append("file", file)
        formData.append("type", typeResource)
    }

    try {
        return AUTH_REQUEST.post(`/content`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    } catch (error) {
        console.error("Failed update content:", error);
        throw new Error("Failed create course");
    }
}

export async function updateContent({ id, name, type }, file) {
    const formData = new FormData();
    if (name)
        formData.append("name", name)
    if (file) {
        formData.append("file", file)
        formData.append("type", type)
    }
    try {
        return AUTH_REQUEST.post(`/content/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    } catch (error) {
        console.error("Failed update content:", error);
        throw new Error("Failed create course");
    }
}
