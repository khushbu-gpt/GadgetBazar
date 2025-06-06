"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const argon2_1 = __importDefault(require("argon2"));
async function hashPassword(text) {
    if (!text)
        throw new Error("Password is not hashed");
    return await argon2_1.default.hash(text);
}
async function verifyPassword(password, hashPassword) {
    if (!password || !hashPassword)
        throw new Error("Passwords are  not verified");
    return await argon2_1.default.verify(hashPassword, password);
}
