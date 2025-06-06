"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const auth_types_1 = require("./auth.types");
const hashing_1 = require("../../shared/utils/hashing");
const AppError_1 = require("../../shared/utils/AppError");
exports.userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: {
        type: String,
        enum: Object.values(auth_types_1.ROLE),
        default: auth_types_1.ROLE.USER
    },
}, {
    timestamps: true
});
exports.userSchema.pre("save", async function (next) {
    const user = this;
    console.log(user);
    try {
        user.password = await (0, hashing_1.hashPassword)(user.password);
        next();
    }
    catch (error) {
        next(new AppError_1.AppError("Unexpected Error!", 500));
    }
});
exports.UserModel = mongoose_1.default.model("users", exports.userSchema);
