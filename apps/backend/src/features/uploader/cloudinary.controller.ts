import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { cloudinary } from "../../shared/config/cloudconfig";
export async function uploadImage(req: Request, res: Response) {
  try {
    const filepath = req.file?.path;
    console.log(filepath);
    if (!filepath) throw new Error("Image is required!");
    const result = await cloudinary.uploader.upload(filepath, {
      folder: "uploads",
    });

    fs.unlinkSync(filepath);
    res.json({
      message: "Image uploaded from cloudinary",
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch {
    res.status(500).json({ message: "Image upload failed", });
  }
}

export async function uploadMultipleImages(req: Request, res: Response, next: NextFunction) {
  try {
    const files = req.files
    // console.log("files", files);
    if (!files || !files.length) throw new Error(" At least One Image is required!");

    const uploadResults = await Promise.all(
      files?.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { folder: "uploads" });
        fs.unlinkSync(file.path);
        return { url: result.secure_url, publicId: result.public_id };
      })
    );
    res.json({
      message: "Image uploaded from cloudinary",
      images: uploadResults
    });
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function deleteImage(req: Request, res: Response) {
  try {
    const { publicId } = req.query;
    console.log(publicId);
    if (!publicId || typeof publicId !== "string") {
      throw new Error("publicId not found or invalid!");
    }
    const result = await cloudinary.uploader.destroy(publicId);
    res.json({ message: "Image deleted success!", result });
  } catch (error) {
    console.error(error);
  }
}
