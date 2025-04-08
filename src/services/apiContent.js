import api from "./api";

export async function createSubContent(name, type, mainContentId, file, onProgress) {
    const formData = new FormData();
    formData.append("file", file)
    formData.append("name", name)
    formData.append("type", type)
    formData.append("mainContentId", mainContentId)
    try {
        return api.post('/content/subContent', formData, {
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