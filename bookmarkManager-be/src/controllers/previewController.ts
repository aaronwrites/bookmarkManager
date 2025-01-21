import { load } from "cheerio";
import axios from "axios";
import { Request, Response } from "express";

export const previewGenerator =  async (req : Request, res : Response) => {
    try {
        const { url } = req.query;
        const { data } = await axios.get(url as string);
        const $ = load(data);

        const getMetaTag = (name : string) => {
        return (
            $(`meta[name=${name}]`).attr("content") ||
            $(`meta[propety="twitter${name}"]`).attr("content") ||
            $(`meta[property="og:${name}"]`).attr("content")
        );
        };

        const preview = {
        url,
        title: $("title").first().text(),
        favicon:
            $('link[rel="shortcut icon"]').attr("href") ||
            $('link[rel="alternate icon"]').attr("href"),
        description: getMetaTag("description"),
        image: getMetaTag("image"),
        author: getMetaTag("author"),
        };

        res.status(200).json(preview);
    } catch (error) {
        res
            .status(500)
            .json(
            "Something went wrong while fetching metadata.Kindly check the url"
            );
    }
};

