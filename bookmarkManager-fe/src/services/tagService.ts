import { api } from "./api";

export const getTagName = async (id : string) => {
    const response = await api.get(`/tags/${id}`);
    return response.data.tag
}

export const getAllTags = async () => {
    const response = await api.get(`/tags`);
    return response.data
}

export const createTag = async (tagTitle: string) => {
    const response = await api.post("/tags", { tagTitle });
    return response.data.tag._id;
};

export const deleteTag = async (id : string) => {
    const response = await api.delete(`/tags/${id}`);
    return response
}
