require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderhome";

const LISTING_IMAGE_REPAIRS = [
  {
    from: "https://unsplash.com/photos/a-group-of-blue-tents-sitting-in-the-middle-of-a-desert-vEWXUHvHNWg",
    to: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=80",
  },
  {
    from: "https://unsplash.com/photos/snowy-village-nestled-among-snow-covered-mountains-and-pine-trees-LxrL92AstjM",
    to: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
  },
  {
    from: "http://unsplash.com/photos/a-house-with-a-fence-around-it-H_8qQ69v3AA",
    to: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    from: "https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-large-window-LLFwrcOVJNM",
    to: "https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    from: "https://unsplash.com/photos/stone-buildings-line-a-cobblestone-path-with-a-bench-ObYA6PhABU8",
    to: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=800&q=80",
  },
  {
    from: "http://unsplash.com/photos/a-building-with-many-balconies-on-the-top-of-it-AZrkXZO9VDM",
    to: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    from: "https://unsplash.com/photos/a-desert-house-with-a-lantern-in-front-of-it-mHmSRqe0yek",
    to: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
  },
  {
    from: "https://unsplash.com/photos/river-flows-through-a-town-with-green-hills-IqScPCT7fo8",
    to: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  },
];

const repairListingImages = async () => {
  const operations = LISTING_IMAGE_REPAIRS.map(({ from, to }) => ({
    updateMany: {
      filter: { image: from },
      update: { $set: { image: to } },
    },
  }));

  const result = await Listing.bulkWrite(operations);
  return result.modifiedCount || 0;
};

const runRepair = async () => {
  await mongoose.connect(MONGO_URL);
  const repairedImages = await repairListingImages();
  console.log(`repaired ${repairedImages} listing image URLs`);
};

if (require.main === module) {
  runRepair()
    .catch((err) => {
      console.error("image repair failed:", err.message);
      process.exitCode = 1;
    })
    .finally(async () => {
      await mongoose.connection.close();
    });
}

module.exports = {
  LISTING_IMAGE_REPAIRS,
  repairListingImages,
};
