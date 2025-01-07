import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createContent, deleteContent, getAllContents, updateContent } from "../controllers/contentController";

export const contentRouter = Router();

contentRouter.get("/", authMiddleware, getAllContents);

contentRouter.post("/", authMiddleware, createContent);

contentRouter.put("/", authMiddleware, updateContent);

contentRouter.delete("/:id", authMiddleware, deleteContent);

