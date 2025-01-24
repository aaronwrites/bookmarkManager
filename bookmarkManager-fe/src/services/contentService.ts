import { api } from "./api";

export const getAllContents = async () => {
    const response = await api.get("/contents");
    return response.data
}