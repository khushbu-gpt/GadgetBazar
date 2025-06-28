import { AppError } from "../../shared/utils/AppError";
import { verifyPassword } from "../../shared/utils/hashing";
import { generateLoginToken } from "../../shared/utils/jsontoken";
import { UserModel } from "./auth.model";
import { loginZodType, registeZodType } from "./auth.validation";

export async function registerService(data: registeZodType) {
  const user= await UserModel.create(data);
  const {password:_password,...rest}=user.toObject()
  return rest
}

export async function loginService(data: loginZodType) {
  const { email, password} = data;
  const user = await UserModel.findOne({ email }).lean();
  if (!user) throw new AppError("Invalid email or password", 404);
  const verifypassword = verifyPassword(password, user.password);
  if (!verifypassword) throw new AppError("password is Invalid", 400);
  const tokens=generateLoginToken(
   {email:user.email,
   uid:user._id.toString(),
   role:user.role,
   },)
  if (!tokens) throw new AppError("Token Genrated Error", 500);
  const {password:_password,...rest}=user
  return {user:rest,tokens};
}
