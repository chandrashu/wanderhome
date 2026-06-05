#!/usr/bin/env node

require("dotenv").config();
const { v2: cloudinary } = require("cloudinary");

const hasCloudinaryUrl = Boolean(process.env.CLOUDINARY_URL);
const hasSeparateCloudinaryConfig =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (hasCloudinaryUrl) {
  cloudinary.config(true);
} else if (hasSeparateCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  throw new Error(
    "Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET before running this script."
  );
}

async function main() {
  const sampleImageUrl =
    "https://res.cloudinary.com/demo/image/upload/sample.jpg";

  const uploadResult = await cloudinary.uploader.upload(sampleImageUrl, {
    folder: "wanderhome/onboarding",
  });

  console.log("Uploaded image secure URL:");
  console.log(uploadResult.secure_url);
  console.log("Uploaded image public ID:");
  console.log(uploadResult.public_id);

  const details = await cloudinary.api.resource(uploadResult.public_id);

  console.log("Image metadata:");
  console.log(`Width: ${details.width}`);
  console.log(`Height: ${details.height}`);
  console.log(`Format: ${details.format}`);
  console.log(`File size bytes: ${details.bytes}`);

  const transformedUrl = cloudinary.url(uploadResult.public_id, {
    secure: true,
    // f_auto lets Cloudinary choose the best image format for the browser.
    fetch_format: "auto",
    // q_auto lets Cloudinary choose a good quality/compression balance.
    quality: "auto",
  });

  console.log(
    "Done! Click link below to see optimized version of the image. Check the size and the format."
  );
  console.log(transformedUrl);
}

main().catch((error) => {
  console.error("Cloudinary onboarding failed:");
  console.error(error.message);
  process.exitCode = 1;
});
