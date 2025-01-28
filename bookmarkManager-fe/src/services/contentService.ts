import { api } from "./api";

export const getAllContents = async () => {
    const response = await api.get("/contents");
    return response.data
}

export const createContent = async (link : string) => {
    const response = await api.post("/contents", { link });
    return response
}

export type updateContentType = {
    title?: string,
    type?: string,
    tldr?: string,
    tags?: string[],
    contentId: string
}

export const updateContent = async (updatedContent : updateContentType) => {
    const response = await api.put("/contents", updatedContent);
    return response.data;
}

export const getContentsByTag = async (tagId : string) => {
    try {
        const response = await api.get(`/contents/byTag/?tagId=${tagId}`);
        return response.data
    }
    catch(e) {
        Promise.reject(e)
    }
}

export const deleteContent = async (contentId : string) => {
    const response = await api.delete(`/contents/${contentId}`);
    return response
}

export const searchContents = async (seachQuery : string) => {
    const response = await api.get(`/contents/search/?searchQuery=${seachQuery}`);
    return response.data.searchResults
}