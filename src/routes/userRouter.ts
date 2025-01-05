import { Request, Response, Router } from "express";
import { z } from "zod";
import { userModel } from "../database/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export const userRouter = Router();

const userCredentials = z.object({
    username: z.string().min(3, { message: "Username must be 3 or more characters long" }).max(10, { message: "Username must be 10 or fewer characters" }),
    password: z.string().min(8, { message: "Password must be 8 or more characters long" }).max(20, { message: "Password must be 20 or fewer characters" }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$/gm, {message: "Password should have atleast one uppercase, one lowercase, one special character, one number"})
})

enum StatusCode {
    BadRequest = 400,
    Conflict = 409,
    SeverError = 500,
    OK = 200,
    Unauthorized = 401,
    NotFound = 404
}

type userCredentials = z.infer<typeof userCredentials>;

userRouter.post("/signup", async (req: Request, res : Response) => {
    const schemaValidation = userCredentials.safeParse(req.body);
    if(!schemaValidation.success) {
        const errorMessages = schemaValidation.error.issues.map(issue => issue.message)
        res.status(StatusCode.BadRequest).json({
            message: errorMessages
        })
        return;
    }
        const parsedBody  = schemaValidation.data;
    try {
        const userExists  = await userModel.findOne({
            username: parsedBody.username
        })
        if(userExists) {
            res.status(StatusCode.Conflict).json({
                message: "Username Alredy Taken! Try with a different username"
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(parsedBody.password, 5)
        const user = await userModel.create({
            username: parsedBody.username,
            password: hashedPassword
        })
        if(user) {
            res.status(StatusCode.OK).json({
                message: "User Created Successfully"
            })
            return;
        }
    }
    catch(e) {
        res.status(StatusCode.SeverError).json({
            message: "Error creating User",
            error: e
        })
    }



})


userRouter.post("/signin", async (req : Request, res : Response) => {
    const schemaValidation = userCredentials.safeParse(req.body);
    if(!schemaValidation.success) {
        const errorMessages = schemaValidation.error.issues.map(issue => issue.message)
        res.status(StatusCode.Unauthorized).json({
            message: errorMessages
        })
        return;
    }

    const parsedBody = schemaValidation.data;
    try{
        const userExists = await userModel.findOne({
            username: parsedBody.username
        })
        if(!userExists) {
            res.status(StatusCode.NotFound).json({
                message: "User Not Found. Please Signup!"
            })
            return;
        }
        const compareHash = await bcrypt.compare(parsedBody.password, userExists.password);
        if(!compareHash) {
            res.status(StatusCode.Unauthorized).json({
                message: "Incorrect Password. Try Again!"
            })
            return;
        }
        const token = jwt.sign({
            id: userExists._id
        }, process.env.JWT_SECRET as string);
        if(!token) {
            res.status(StatusCode.SeverError).json({
                message: "An Unexpected Error Occured while signing in."
            })
        }
        res.status(StatusCode.OK).json({
            message: "Signed In Successfuly",
            token
        })
        return;
    }
    catch(e) {
        res.send(StatusCode.SeverError).json({
            message: "Internal Server Error",
            error: e
        })
    }

})