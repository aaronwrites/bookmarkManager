import { useQuery } from "@tanstack/react-query";
import { getMeta } from "../services/previewService";

export const usePreview = (link: string) => {
    const { data, isError, isPending } = useQuery({
    queryKey: ["preview", link],
    queryFn: () => getMeta(link),
    retry: false,
    });

    const isTweet = link.includes("x.com") && link.includes("/status/");
    return { data, isError, isTweet, isPending };
};
