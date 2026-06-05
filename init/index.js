require("dotenv").config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const Booking = require("../models/booking.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderhome";
const isProduction = process.env.NODE_ENV === "production";
const forceSeed = process.argv.includes("--force");

if (isProduction && !forceSeed) {
  throw new Error("Refusing to seed production without --force.");
}

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Booking.deleteMany({});
  await Review.deleteMany({});
  await Listing.deleteMany({});
  await User.updateMany({}, { $set: { wishlist: [] } });
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

main()
  .then(async () => {
    console.log("connected to DB");
    await initDB();
  })
  .catch((err) => {
    console.error("seed failed:", err.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
