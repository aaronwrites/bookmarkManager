import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCode } from "../routes/userRouter";
dotenv.config();

interface JwtPayload {
    userId: string;
}

export const authMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const token = req.headers.authorization;
    if(!token) {
        res.status(StatusCode.Unauthorized).json({
            message: "Authentication Failed. Token is not found"
        })
        return;
    }
    try {
        const { userId } = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET as string) as JwtPayload;
        if(!userId) {
            res.send(StatusCode.SeverError).json({
                message: "Could Not Parse Token"
            })
            return;
        }
        req.userId = userId;
        next();
    }
    catch(e) {
        res.status(StatusCode.SeverError).json({
            message: "Server Error. Try Again later",
            error: e
        })
    }
}