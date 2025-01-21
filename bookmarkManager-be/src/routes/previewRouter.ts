import { Router } from "express";
import { previewGenerator } from "../controllers/previewController";

export const previewRouter = Router();

previewRouter.get("/", previewGenerator);