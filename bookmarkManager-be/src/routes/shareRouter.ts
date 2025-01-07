import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getSharedCotents, handleSharing } from "../controllers/shareController";

export const shareRouter = Router();

shareRouter.post("/share", authMiddleware, handleSharing);

shareRouter.get("/:shareLink", getSharedCotents);