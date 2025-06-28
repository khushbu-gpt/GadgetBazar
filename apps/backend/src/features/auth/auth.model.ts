import mongoose from "mongoose";
import { IUser, ROLE } from "./auth.types";
import { hashPassword } from "../../shared/utils/hashing";
import { AppError } from "../../shared/utils/AppError";

export const userSchema=new mongoose.Schema<IUser>({
 name:{type:String,required:true},
 email:{type:String,required:true,unique:true},
 password:{type:String,required:true},
 phone:{type:String},
 role:{
    type:String,
    enum:Object.values(ROLE),
    default:ROLE.USER
 },
},{
    timestamps:true
})


userSchema.pre("save", async function (next) {
    const user = this;
    console.log(user);
    try {
      user.password = await hashPassword(user.password);
      next();
    } catch (error) {
      next(new AppError("Unexpected Error!", 500));
    }
  });
export const UserModel=mongoose.model("User",userSchema)

