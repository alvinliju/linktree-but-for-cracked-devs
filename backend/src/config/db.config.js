import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const dbConnect =  async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("db connected")

    }catch(err){
        return err
    }
}