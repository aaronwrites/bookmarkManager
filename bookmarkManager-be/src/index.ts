import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRouter";
import { contentRouter } from "./routes/contentRouter";
import { tagsRouter } from "./routes/tagsRouter";
import { shareRouter } from "./routes/shareRouter";
import cors from "cors"
import { previewRouter } from "./routes/previewRouter";
dotenv.config();
export enum StatusCode {
    BadRequest = 400,
    Conflict = 409,
    SeverError = 500,
    OK = 200,
    Unauthorized = 401,
    NotFound = 404,
    Forbidden = 403
}

const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/contents", contentRouter);
app.use("/api/v1/tags", tagsRouter);
app.use("/api/v1/bookmarks", shareRouter);
app.use("/api/v1/preview", previewRouter);

const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Database Connection Successfull");
        app.listen(process.env.PORT);
        console.log("Server is listening in port 3000");
    }
    catch(e) {
        console.log("Error Occured");
        console.error(e);
    }
    

}


main();