import mongoose from "mongoose"

export const connectDB=async()=>{
     const uri = process.env.MONGODB_URI;
  if (!uri) return console.error("❌ No MONGODB_URI found");
    try{
    await mongoose.connect(process.env.MONGODB_URI||"")
     console.log("MONGOOSE IS CONNECTED")
    }catch(error){
        console.error("DB connection error",(error as Error).message)
    }
}