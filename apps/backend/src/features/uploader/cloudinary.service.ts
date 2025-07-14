import { cloudinary } from "../../shared/config/cloudconfig";

export const uploadToCloudinary = async (filePath: string, folder = 'uploads') => {
    return cloudinary.uploader.upload(filePath, { folder });
  };

  export const deleteFromCloudinary = async (publicId: string) => {
    return cloudinary.uploader.destroy(publicId)
  };