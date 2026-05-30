const joi = require("joi");


// LISTING SCHEMA

module.exports.listingSchema = joi.object({

   listing: joi.object({

      title: joi.string().required(),

      description: joi.string().required(),

      location: joi.string().required(),

      country: joi.string().required(),

      price: joi.number()
         .required()
         .min(0),

      maxGuests: joi.number()
         .integer()
         .min(1)
         .max(16)
         .required(),

      category: joi.string()
         .valid(
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
         )
         .required(),

      image: joi.any()
         .strip(),

   }).required(),

}).required();


// REVIEW SCHEMA

module.exports.reviewSchema = joi.object({

   review: joi.object({

      rating: joi.number()
         .required()
         .min(1)
         .max(5),

      cleanlinessRating: joi.number()
         .required()
         .min(1)
         .max(5),

      locationRating: joi.number()
         .required()
         .min(1)
         .max(5),

      valueRating: joi.number()
         .required()
         .min(1)
         .max(5),

      comment: joi.string()
         .required(),

      tags: joi.array()
         .items(joi.string())
         .single()
         .default([]),

      images: joi.any()
         .strip(),

   }).required(),

});


// BOOKING SCHEMA

module.exports.bookingSchema = joi.object({

   booking: joi.object({

      checkIn: joi.date()
         .required(),

      checkOut: joi.date()
         .greater(joi.ref("checkIn"))
         .required()
         .messages({
            "date.greater": "Check-out date must be after check-in date",
         }),

      guests: joi.number()
         .integer()
         .min(1)
         .max(16)
         .required(),

   }).required(),

});
