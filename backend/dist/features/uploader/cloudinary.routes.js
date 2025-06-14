"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const express_1 = require("express");
const uploadImage_1 = require("../../shared/middleware/uploadImage");
const cloudinary_controller_1 = require("./cloudinary.controller");
exports.uploadRouter = (0, express_1.Router)();
exports.uploadRouter.post("/upload", uploadImage_1.upload.single("image"), cloudinary_controller_1.uploadImage);
exports.uploadRouter.post("/uploads", uploadImage_1.upload.array("images", 4), cloudinary_controller_1.uploadMultipleImages);
exports.uploadRouter.delete("/delete", cloudinary_controller_1.deleteImage);
