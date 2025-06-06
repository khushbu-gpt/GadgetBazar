"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserController = registerUserController;
exports.loginUserController = loginUserController;
const userService = __importStar(require("./auth.service"));
const AppError_1 = require("../../shared/utils/AppError");
const sendResponse_1 = require("../../shared/utils/sendResponse");
async function registerUserController(req, res, next) {
    try {
        const user = await userService.registerService(req.body);
        if (!user)
            next(new AppError_1.AppError("user not found", 400));
        (0, sendResponse_1.sendResponse)(res, {
            data: user,
            message: "user register success!",
            status_code: 201,
        });
    }
    catch (error) {
        next(error);
    }
}
async function loginUserController(req, res, next) {
    try {
        const { user, tokens } = await userService.loginService(req.body);
        if (!user)
            next(new AppError_1.AppError("Email is rerequired", 400));
        res.cookie("refresh-token", tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        (0, sendResponse_1.sendResponse)(res, {
            data: { user,
                accessToken: tokens.accesToken },
            message: "login success!"
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}
