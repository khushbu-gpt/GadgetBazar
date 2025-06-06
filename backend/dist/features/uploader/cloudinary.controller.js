"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = uploadImage;
exports.uploadMultipleImages = uploadMultipleImages;
exports.deleteImage = deleteImage;
const fs_1 = __importDefault(require("fs"));
const cloudconfig_1 = require("../../shared/config/cloudconfig");
async function uploadImage(req, res) {
    try {
        const filepath = req.file?.path;
        console.log(filepath);
        if (!filepath)
            throw new Error("Image is required!");
        const result = await cloudconfig_1.cloudinary.uploader.upload(filepath, {
            folder: "uploads",
        });
        fs_1.default.unlinkSync(filepath);
        res.json({
            message: "Image uploaded from cloudinary",
            url: result.secure_url,
            publicId: result.public_id,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Image upload failed", });
    }
}
async function uploadMultipleImages(req, res, next) {
    try {
        const files = req.files;
        console.log(files);
        if (!files || !files.length)
            throw new Error(" At least One Image is required!");
        const uploadResults = [];
        for (const file of files) {
            const result = await cloudconfig_1.cloudinary.uploader.upload(file.path, {
                folder: "uploads",
            });
            uploadResults.push({
                url: result.secure_url,
                publicId: result.public_id,
            });
            fs_1.default.unlinkSync(file.path);
        }
        res.json({
            message: "Image uploaded from cloudinary",
            images: uploadResults
        });
    }
    catch (error) {
        console.error(error);
        // next(error)
    }
}
async function deleteImage(req, res) {
    try {
        const { publicId } = req.query;
        console.log(publicId);
        if (!publicId || typeof publicId !== "string") {
            throw new Error("publicId not found or invalid!");
        }
        const result = await cloudconfig_1.cloudinary.uploader.destroy(publicId);
        res.json({ message: "Image deleted success!", result });
    }
    catch (error) {
        console.error(error);
    }
}
