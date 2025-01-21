import { api } from "./api"

export const getContent = async () => {
    try {
        const { data } = await api.get("/contents");
        return data
    }
    catch (error) {
        console.error(error)
        throw new Error("Something went wrong while fetching contents");
    }
}