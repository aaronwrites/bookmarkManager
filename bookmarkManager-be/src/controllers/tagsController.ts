import { tagsModel } from "../database/db";
import { StatusCode } from "..";
import { Request, Response } from "express";


export const getTag = async (req : Request, res : Response) => {
    try {
        const tag = await tagsModel.findOne({
            _id: req.params.id,
            userId: req.userId
        })
        res.status(StatusCode.OK).json({
            success: true,
            tag
        })
    }
    catch(e) {
        res.status(StatusCode.SeverError).json({
            success: false,
            message: "Error while fetching tag details",
            error: e
        })
    }
}

export const getAllTags = async (req : Request, res : Response) => {
    try {
        const tags = await tagsModel.find({
            userId: req.userId
        })
        res.status(StatusCode.OK).json({
            success: true,
            tags
        })
    }
    catch(e) {
        res.status(StatusCode.SeverError).json({
            success: false,
            message: "Error while fetching tags",
            error: e
        })
    }
}

export const createTag = async (req : Request, res : Response) => {
    const { tagTitle } = req.body;
    if(!tagTitle || tagTitle === "") {
        res.status(StatusCode.BadRequest).json({
            success: false,
            message: "No tag name found"
        })
    }
    try {
        const ifTagExists = await tagsModel.findOne({
            tagName: tagTitle,
            userId: req.userId,
          });
          console.log(ifTagExists)
          if (ifTagExists) {
             res.status(StatusCode.OK).json({
              success: true,
              message: "Tag already exists",
              tag: ifTagExists, // Optionally return the existing tag
            });
            return;
          }
        const tag = await tagsModel.create({
            tagName: tagTitle,
            userId: req.userId
        })
        console.log(tag)
        if(!tag) {
            res.status(StatusCode.SeverError).json({
                success: false,
                message: "Error while creating Tag"
            })
            return;
        }
        res.status(StatusCode.OK).json({
            success: true, 
            tag
        })
    }
    catch(e) {
        console.error("Error details:", e);
        res.status(StatusCode.SeverError).json({
            success: false,
            message: "Erro while creating Tag"
        })
    }
}

export const updateTag = async (req : Request, res : Response) => {
    const { tagTitle, tagId } = req.body;
    if(!tagTitle || !tagId) {
        res.status(StatusCode.BadRequest).json({
            success: false,
            message: "Tag title or ID is not found"
        })
    }
    try {
        const tag = await tagsModel.findOneAndUpdate({
            _id: tagId,
            userId: req.userId
        },
        {
            tagName: tagTitle
        },
        {new: true}
        )
        console.log(tag)
        if(!tag) {
            res.status(StatusCode.SeverError).json({
                success: false,
                message: "Error while updating Tag"
            })
            return;
        }
        res.status(StatusCode.OK).json({
            success: true, 
            message: "Tag Name updated succesfully",
            updatedTag: tag
        })
    }
    catch(e) {
        res.status(StatusCode.SeverError).json({
            success: false,
            message: "Erro while updating Tag"
        })
    }
}

export const deleteTag = async (req : Request, res : Response) => {
    try {
        const tags = await tagsModel.deleteOne({
            _id: req.params.id,
            userId: req.userId
        })
        if(tags){
            res.status(StatusCode.OK).json({
                success: true,
                message: "Tag deleted successfully"
            })
            return;
        }
    }
    catch(e) {
        res.status(StatusCode.SeverError).json({
            success: false,
            message: "Incorrect Tag ID or tag not found",
            error: e
        })
    }
}