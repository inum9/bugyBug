import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { fileURLToPath } from "url";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOU_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadonCloudinary = async (localFile) => {
  try {
    if (!localFile) return null;
    const response = await cloudinary.uploader.upload(localFile, {
      resource_type: "auto",
    });
    console.log("file is uploaded successfully on cloudinary", response.url);
    fs.unlinkSync(localFile);
    return response;
  } catch (error) {
    fs.unlinkSync(localFile); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadonCloudinary };
