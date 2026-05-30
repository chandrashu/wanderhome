const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({

   comment: String,

   rating: {

      type: Number,

      min: 1,

      max: 5,
   },

   cleanlinessRating: {

      type: Number,

      min: 1,

      max: 5,
   },

   locationRating: {

      type: Number,

      min: 1,

      max: 5,
   },

   valueRating: {

      type: Number,

      min: 1,

      max: 5,
   },

   // TAGS

   tags: [

      {

         type: String,

      },

   ],

   images: [

      {

         url: String,

         filename: String,

      },

   ],

   createdAt: {

      type: Date,

      default: Date.now,
   },

   author: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
   },

   updatedAt: Date,

   listing: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "Listing",
   },

});

reviewSchema.index(
   { listing: 1, author: 1 },
   {
      unique: true,
      partialFilterExpression: {
         listing: { $exists: true },
         author: { $exists: true },
      },
   }
);

module.exports =
   mongoose.model(
      "Review",
      reviewSchema
   );
