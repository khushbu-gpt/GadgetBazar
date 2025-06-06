"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const AppError_1 = require("../utils/AppError");
const mongoose_1 = __importDefault(require("mongoose"));
function errorHandler(err, _req, res) {
    let statusCode = 500;
    let message = "Something went wrong";
    let status = "error";
    if (err.code === 11000 && err.keyPattern?.email) {
        statusCode = 400;
        message = "Email already exists";
        status = "fail";
    }
    else if (err instanceof AppError_1.AppError) {
        statusCode = err.statusCode || 500;
        message = err.message;
        status = err.status || "error";
    }
    else if (err instanceof mongoose_1.default.Error) {
        statusCode = 400;
        message = err.message;
        status = "fail";
    }
    res.status(statusCode).json({
        status,
        success: false,
        message,
    });
}
