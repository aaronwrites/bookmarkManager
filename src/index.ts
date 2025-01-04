import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRouter";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/v1/user", userRouter);


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