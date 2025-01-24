import { api } from "./api"


export const getMeta = async (link : string) => {
    const response = await api.get(`/preview/?url=${link}`);
    return response.data;
}