#!/usr/bin/env node

const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "dkxollny8",
  api_key: "443928343517831",
  api_secret: "XWGmmRFU1LoNODfFHWwmISRyhYk",
});

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
