import { api } from "./api";

export const getAllContents = async () => {
    const response = await api.get("/contents");
    return response.data
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
