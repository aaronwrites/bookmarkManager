import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createTag, deleteTag, getAllTags, getTag, updateTag } from "../controllers/tagsController";

export const tagsRouter = Router();

tagsRouter.get("/", authMiddleware, getAllTags);

tagsRouter.get("/:id", authMiddleware, getTag);

tagsRouter.post("/", authMiddleware, createTag);

tagsRouter.put("/", authMiddleware, updateTag);

tagsRouter.delete("/:id", authMiddleware, deleteTag);