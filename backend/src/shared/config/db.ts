import mongoose from "mongoose"

export const connectDB=async()=>{
    try{
    await mongoose.connect("mongodb://localhost:27017/pickbazar")
    console.log("MONGOOSE IS CONNECTED")
    }catch(error){
        console.error("DB connection error",(error as Error).message)
    }
}