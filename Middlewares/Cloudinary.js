const cloudinary = require("cloudinary").v2;

// Configure Cloudinary from environment variables. In Vercel, set these in the UI.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload helper supports either a file with { path } (old disk-based)
// or a file object with `buffer` property (multer memoryStorage).
const uploadOnCloudinary = async (file) => {
  try {
    if (!file) return null;
    // If file.buffer exists (from multer.memoryStorage)
    if (file.buffer) {
      return await new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        upload_stream.end(file.buffer);
      });
    }
    // Fallback to upload by path
    if (file.path) {
      const data = await cloudinary.uploader.upload(file.path);
      return data.secure_url;
    }
    // If input is a URL already, return it
    if (typeof file === "string" && file.startsWith("http")) return file;
    return null;
  } catch (error) {
    console.log("Cloudinary upload error:", error.message || error);
    throw error;
  }
};

module.exports = uploadOnCloudinary;
