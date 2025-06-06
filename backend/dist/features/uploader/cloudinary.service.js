"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = exports.uploadToCloudinary = void 0;
const cloudconfig_1 = require("../../shared/config/cloudconfig");
const uploadToCloudinary = async (filePath, folder = 'uploads') => {
    return cloudconfig_1.cloudinary.uploader.upload(filePath, { folder });
};
exports.uploadToCloudinary = uploadToCloudinary;
const deleteFromCloudinary = async (publicId) => {
    return cloudconfig_1.cloudinary.uploader.destroy(publicId);
};
exports.deleteFromCloudinary = deleteFromCloudinary;
