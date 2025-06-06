"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerService = registerService;
exports.loginService = loginService;
const AppError_1 = require("../../shared/utils/AppError");
const hashing_1 = require("../../shared/utils/hashing");
const jsontoken_1 = require("../../shared/utils/jsontoken");
const auth_model_1 = require("./auth.model");
async function registerService(data) {
    const user = await auth_model_1.UserModel.create(data);
    const { password: _password, ...rest } = user.toObject();
    return rest;
}
async function loginService(data) {
    const { email, password } = data;
    const user = await auth_model_1.UserModel.findOne({ email }).lean();
    if (!user)
        throw new AppError_1.AppError("Invalid email or password", 404);
    const verifypassword = (0, hashing_1.verifyPassword)(password, user.password);
    if (!verifypassword)
        throw new AppError_1.AppError("password is Invalid", 400);
    const tokens = (0, jsontoken_1.generateLoginToken)({ email: user.email,
        uid: user._id.toString(),
        role: user.role,
    });
    if (!tokens)
        throw new AppError_1.AppError("Token Genrated Error", 500);
    const { password: _password, ...rest } = user;
    return { user: rest, tokens };
}
