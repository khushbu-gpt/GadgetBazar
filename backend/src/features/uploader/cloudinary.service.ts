import { cloudinary } from "../../shared/config/cloudconfig";

export const uploadToCloudinary = async (filePath:any, folder = 'uploads') => {
    return cloudinary.uploader.upload(filePath, { folder });
  };

  export const deleteFromCloudinary = async (publicId:any) => {
    return cloudinary.uploader.destroy(publicId)
  };