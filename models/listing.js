const mongoose = require("mongoose");
const Review = require("./review");
const Booking = require("./booking");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        : v,
  },
  imageFilename: String,
  price: Number,
  location: String,
  country: String,
  maxGuests: {
    type: Number,
    min: 1,
    max: 16,
    default: 4,
  },

  geometry: {
   type: {
      type: String,
      enum: ["Point"],
      default: "Point",
   },

   coordinates: {
      type: [Number],
      default: [77.2090, 28.6139],
   },
},

  owner: {
   type: Schema.Types.ObjectId,
   ref: "User",
},

  category: {
    type: String,
    enum: [
  "Trending",
  "Rooms",
  "Spiritual",
  "Heritage",
  "Nature",
  "Mountains",
  "Beach",
  "Pools",
  "Camping",
  "Farm",
  "City"
],
    required: true,
    default: "Rooms",
},

  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review",
    },
  ],
 });

listingSchema.index({ category: 1, location: 1, maxGuests: 1 });

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews}});
    await Booking.deleteMany({ listing: listing._id });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

