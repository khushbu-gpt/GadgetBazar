"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = generateRefreshToken;
exports.generateAccessToken = generateAccessToken;
exports.generateLoginToken = generateLoginToken;
exports.decodeToken = decodeToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("./AppError");
function generateRefreshToken({ email, uid, role }) {
    const refreshExpiry = process.env.JWT_REFRESH_EXPIRY || "30d";
    const secret = process.env.JWT_SECRET;
    if (!refreshExpiry)
        throw new AppError_1.AppError("Refresh Expiry is required");
    return jsonwebtoken_1.default.sign({ email, uid, role, type: "REFRESH" }, secret, {
        expiresIn: refreshExpiry
    });
}
function generateAccessToken({ email, uid, role }) {
    const accessExpiry = process.env.JWT_EXPIRY_FORMAT || "1d";
    const secret = process.env.JWT_SECRET;
    if (!accessExpiry)
        throw new AppError_1.AppError("Access Expiry is required");
    return jsonwebtoken_1.default.sign({ email, uid, role, type: "ACCESS" }, secret, {
        expiresIn: accessExpiry
    });
}
function generateLoginToken({ uid, email, role }) {
    const accessExpiry = process.env.JWT_EXPIRY_FORMAT || "1d";
    if (!accessExpiry)
        throw new AppError_1.AppError("Access Expiry is required");
    return {
        refreshToken: generateRefreshToken({ uid, email, role }),
        accesToken: generateAccessToken({ uid, email, role }),
    };
}
function decodeToken(token) {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error("JWT Secret is required");
    return jsonwebtoken_1.default.verify(token, secret);
}
