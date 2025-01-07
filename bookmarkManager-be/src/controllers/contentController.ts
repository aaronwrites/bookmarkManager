
import { contentModel } from "../database/db";
import { StatusCode } from "..";
import { Request, Response } from "express";

export const getAllContents = async (req : Request, res : Response) => {
    const id = req.userId;
    try {
        const content = await contentModel.find({
            userId: id
        }).populate("userId", "username");
        res.status(StatusCode.OK).json({
            success: true,
            content
        })
    }
    catch(e) {
        res.status(StatusCode.SeverError).json({
            success: false,
            message: "An error occured while fetching contents",
            error: e
        })
    }

}

export const createContent = async (req : Request , res : Response) => {
    const id = req.userId;
    const { title, type, link, notes, tags } = req.body;
    try {
        if(!title || !type || !link) {
            res.status(StatusCode.BadRequest).json({
                success: false,
                message: "All the Fields except tags are required"
            });
            return;
        }

        const content = await contentModel.create({
            title,
            type,
            link,
            notes,
            tags,
            userId: id
        })

        if(!content) {
            res.status(StatusCode.SeverError).json({
                success: false,
                message: "Error while creating content. Try again",
            })
            return;
        }
        res.status(StatusCode.OK).json({
            success: true,
            message: "Content Created successfully"
        })
    }
    catch(e) {
        res.status(StatusCode.SeverError).json({
            success: false,
            message: "Error while creating content. Try again",
            error: e
        })
    }

}

export const updateContent = async (req : Request, res : Response) => {
    const { title, type, link, notes, tags, contentId } = req.body;
    try {
        if(!title || !type || !link) {
            res.status(StatusCode.BadRequest).json({
                success: false,
                message: "All the Fields except tags are required"
            });
            return;
        }
        if(!contentId) {
            res.status(StatusCode.BadRequest).json({
                success: false,
                message: "Content Id is not found"
            })
            return;
        }

        const contentUpdation = await contentModel.findOneAndUpdate({_id: contentId, userId: req.userId}, 
            {
                title,
                type,
                link,
                notes,
                tags
            },
            {new: true}
        )
        if(!contentUpdation) {
            res.status(StatusCode.BadRequest).json({
                success: false,
                message: "Incorrect Content ID or content does not exist"
            })
            return;
        }
        res.status(StatusCode.OK).json({
            success: true,
            message: "Content Updated Successfully",
            updatedContent: contentUpdation
        })
    }
    catch(e) {
        res.status(StatusCode.SeverError).json({
            success: false,
            message: "Error while updating Content",
            error: e
        })
    }
}

export const deleteContent = async (req : Request, res : Response) => {
    const contentId = req.params.id;
    if(!contentId) {
        res.status(StatusCode.BadRequest).json({
            success: false,
            message: "Content ID not found"
        })
    }
    try{
        const contentDeletion = await contentModel.deleteOne({
            _id: contentId,
            userId: req.userId
        })

        if(!contentDeletion) {
            res.status(StatusCode.SeverError).json({
                success: false,
                message: "Error while deleting content. Try Again"
            })
            return;
        }
        console.log(contentDeletion);
        res.status(StatusCode.OK).json({
            success: true,
            message: "Content deleted successfully"
        })
    }
    catch(e) {
        res.status(StatusCode.SeverError).json({
            success: false,
            message: "Incorrect Content ID or Content doesn't exists",
            error: e
        })
    }
    }