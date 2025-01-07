import { Router } from "express";
import { handleUserSignIn, handleUserSignup } from "../controllers/userController";

export const userRouter = Router();

userRouter.post("/signup", handleUserSignup)

userRouter.post("/signin", handleUserSignIn)