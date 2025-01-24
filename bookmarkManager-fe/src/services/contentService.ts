import { api } from "./api";

export const getContent = async () => {
    const response = await api.get("/contents");
    return response.data
}