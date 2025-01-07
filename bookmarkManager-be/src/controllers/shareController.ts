import { Request, Response } from "express";
import { StatusCode } from "..";
import { contentModel, shareLinkModel } from "../database/db";

export const handleSharing = async (req :  Request, res : Response) => {
    const { share } = req.body;
    try {
        if(share) {
            const existingLink = await shareLinkModel.findOne({
                userId: req.userId,
            });

            if (existingLink) {
                res.json({
                    success: true,
                    hash: existingLink.hash,
                });
                return;
            }
            const shareHash = await shareLinkModel.create({
                hash: crypto.randomUUID(),
                userId: req.userId
            })
            if(!shareHash) {
                res.status(StatusCode.SeverError).json({
                    success: false,
                    message: "Error while generating Link"
                })
                return;
            }
            res.status(StatusCode.OK).json({
                success: true,
                hash: shareHash.hash 
            })
        }
        else {
            const deleteHash = await shareLinkModel.deleteOne({
                userId: req.userId,
            });
            if(deleteHash) {
                res.status(StatusCode.OK).json({
                    success: true,
                    message: "Sharing is disabled successfully"
                })
            }
        }
    }
    catch(e) {
        res.status(StatusCode.SeverError).json({
            success: false,
            message: "Error while generating Link",
            error: e
        })
    }
}

export const getSharedCotents = async (req : Request, res : Response) => {
    try {
        const hash = req.params.shareLink;
        console.log("hash", hash);
        const link = await shareLinkModel.findOne({ hash: hash });
        console.log("Link: ", link);
        if (!link) {
            res.status(StatusCode.Forbidden).json({
                success: false,
                message: "User has not enabled sharing or the Link is invalid",
            });
            return;
        }
        const content = await contentModel.find({
        userId: link.userId,
        }).populate("userId", "username").populate("tags");

        res.json({
            content,
        });
    }
    catch(e) {
        res.status(StatusCode.SeverError).json({
            success: false,
            message: "Error while fetching contents",
            error: e
        })
    }
}