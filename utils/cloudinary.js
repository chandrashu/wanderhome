const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
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
const LOCAL_UPLOAD_DIR = path.join(__dirname, "..", "public", "uploads", "listings");
const LOCAL_UPLOAD_PATH = "/uploads/listings";
const allowLocalImageFallback =
  process.env.NODE_ENV !== "production" || process.env.LOCAL_IMAGE_FALLBACK === "true";

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

const getImageExtension = (file) => {
  const extension = path.extname(file.originalname || "").toLowerCase();
  const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

  if (allowedExtensions.has(extension)) {
    return extension;
  }

  const extensionByMime = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/avif": ".avif",
  };

  return extensionByMime[file.mimetype] || ".jpg";
};

const saveLocalImage = async (file) => {
  try {
    await fs.mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
    const filename = `${Date.now()}-${crypto.randomUUID()}${getImageExtension(file)}`;
    const filepath = path.join(LOCAL_UPLOAD_DIR, filename);

    await fs.writeFile(filepath, file.buffer);

    return {
      secure_url: `${LOCAL_UPLOAD_PATH}/${filename}`,
      public_id: null,
    };
  } catch (error) {
    throw new ExpressError(500, "Could not save listing image. Please try again.");
  }
};

const uploadToCloudinary = (file, folder) => {
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

const uploadImage = async (file, folder = "wanderhome/listings") => {
  const cloudinaryConfig = cloudinary.config();

  if (
    !cloudinaryConfig.cloud_name ||
    !cloudinaryConfig.api_key ||
    !cloudinaryConfig.api_secret
  ) {
    if (allowLocalImageFallback) {
      return saveLocalImage(file);
    }

    throw new ExpressError(
      500,
      "Cloudinary is not configured. Add CLOUDINARY_URL or Cloudinary keys to your .env file."
    );
  }

  try {
    return await uploadToCloudinary(file, folder);
  } catch (error) {
    if (allowLocalImageFallback) {
      return saveLocalImage(file);
    }

    throw error;
  }
};

module.exports = {
  cloudinary,
  upload,
  uploadImage,
  MAX_IMAGE_SIZE_MB,
};
