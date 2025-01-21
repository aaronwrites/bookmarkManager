import { api } from "./api"


export const getMeta = async (link : string) => {
    try {
        const { data } = await api.get(`/preview/?url=${link}`);
        return data;
    }
    catch (error) {
        console.error(error)
        throw new Error(`Error while getting preview: ${error}`);
    }
}

export const getContent = async () => {
    try {
        const { data } = await api.get("/contents");
        return data
    }
    catch (error) {
        console.error(error)
        throw new Error(`Error while fetching contents: ${error}`);
    }
}