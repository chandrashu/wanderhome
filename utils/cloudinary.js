const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const ExpressError = require("./ExpressError");

const isFilled = (value) => {
  return Boolean(value && !value.toLowerCase().startsWith("your-"));
};

const hasSeparateCloudinaryConfig =
  isFilled(process.env.CLOUDINARY_CLOUD_NAME) &&
  isFilled(process.env.CLOUDINARY_API_KEY) &&
  isFilled(process.env.CLOUDINARY_API_SECRET);

const hasCloudinaryUrl =
  isFilled(process.env.CLOUDINARY_URL) &&
  process.env.CLOUDINARY_URL.toLowerCase().startsWith("cloudinary://");

if (hasSeparateCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else if (hasCloudinaryUrl) {
  cloudinary.config(true);
}

const storage = multer.memoryStorage();
const MAX_IMAGE_SIZE_MB = 15;

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new ExpressError(400, "Please upload an image file."));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_IMAGE_SIZE_MB * 1024 * 1024,
  },
});

const uploadImage = (file, folder = "wanderhome/listings") => {
  const cloudinaryConfig = cloudinary.config();

  if (
    !cloudinaryConfig.cloud_name ||
    !cloudinaryConfig.api_key ||
    !cloudinaryConfig.api_secret
  ) {
    throw new ExpressError(
      500,
      "Cloudinary is not configured. Add CLOUDINARY_URL or Cloudinary keys to your .env file."
    );
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    stream.end(file.buffer);
  });
};

module.exports = {
  cloudinary,
  upload,
  uploadImage,
  MAX_IMAGE_SIZE_MB,
};
