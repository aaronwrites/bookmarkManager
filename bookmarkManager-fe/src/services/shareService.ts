import { api } from "./api";

export const generateShareLink = async (share : boolean) => {
    const response = await api.post("/bookmarks/share", { share });
    return response.data
}

export const getSharedContent = async (hash : string) => {
    const response = await api.get(`/bookmarks/${hash}`);
    return response.data
}