import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createContent, deleteContent, getAllContents, getContentByTag, searchContents, updateContent } from "../controllers/contentController";

export const contentRouter = Router();

contentRouter.get("/", authMiddleware, getAllContents);

contentRouter.get("/byTag", authMiddleware, getContentByTag);

contentRouter.post("/", authMiddleware, createContent);

contentRouter.put("/", authMiddleware, updateContent);

contentRouter.delete("/:id", authMiddleware, deleteContent);

contentRouter.get("/search", authMiddleware, searchContents);
