import { Router } from "express";
import { upload } from "../../shared/middleware/uploadImage";
import { deleteImage, uploadImage, uploadMultipleImages } from "./cloudinary.controller";

export const uploadRouter=Router()

uploadRouter.post("/upload",upload.single("image"),uploadImage)
uploadRouter.post("/uploads",upload.array("images",4),uploadMultipleImages)

uploadRouter.delete("/delete",deleteImage)


