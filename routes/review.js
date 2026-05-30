const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js"); 
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const Booking = require("../models/booking.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");
const { cloudinary, upload, uploadImage } = require("../utils/cloudinary.js");

const validatedReview = (req, res, next) => {
  let { error, value } = reviewSchema.validate(req.body || {}, {
    abortEarly: false,
  });
  if (error) {
    let errMes = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMes);
  }

  req.body = value;
  req.validatedReview = value.review;
  next();
};

const uploadReviewImages = async (files = []) => {
  return Promise.all(
    files.map(async (file) => {
      const image = await uploadImage(file, "wanderhome/reviews");

      return {
        url: image.secure_url,
        filename: image.public_id,
      };
    })
  );
};

const deleteReviewImages = async (images = []) => {
  await Promise.all(
    images
      .filter((image) => image && image.filename)
      .map((image) => cloudinary.uploader.destroy(image.filename))
  );
};

/* CREATE REVIEW */
router.post(
    "/", 
    isLoggedIn,
    upload.array("review[images]", 3),
    validatedReview,
    wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
      throw new ExpressError(404, "Listing not found");
    }

    if (listing.owner && listing.owner.equals(req.user._id)) {
      req.flash("error", "You cannot review your own listing.");
      return res.redirect(`/listings/${listing._id}`);
    }

    const alreadyReviewed = await Review.findOne({
      listing: listing._id,
      author: req.user._id,
    });

    if (alreadyReviewed) {
      req.flash("error", "You have already reviewed this stay.");
      return res.redirect(`/listings/${listing._id}`);
    }

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const completedBooking = await Booking.exists({
      listing: listing._id,
      guest: req.user._id,
      status: "confirmed",
      checkOut: { $lte: today },
    });

    if (!completedBooking) {
      req.flash("error", "You can review this stay after completing a booking.");
      return res.redirect(`/listings/${listing._id}`);
    }

    let newReview = new Review(req.validatedReview);
    newReview.author = req.user._id;
    newReview.listing = listing._id;
    newReview.images = await uploadReviewImages(req.files);

    listing.reviews.push(newReview);
     
    await newReview.save();
    await listing.save();

    req.flash("success", "Review added successfully!");
    return res.redirect(`/listings/${listing._id}`);
  })
);

// EDIT REVIEW
router.get("/:reviewId/edit", isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;

  const listing = await Listing.findById(id);
  const review = await Review.findById(reviewId);

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  if (!review) {
    throw new ExpressError(404, "Review not found");
  }

  res.render("reviews/edit", { listing, review });
}));

// UPDATE REVIEW
router.put(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  upload.array("review[images]", 3),
  validatedReview,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      throw new ExpressError(404, "Review not found");
    }

    const oldImages = review.images || [];
    Object.assign(review, req.validatedReview);
    review.updatedAt = new Date();

    if (req.files && req.files.length) {
      review.images = await uploadReviewImages(req.files);
    }

    await review.save();

    if (req.files && req.files.length) {
      await deleteReviewImages(oldImages);
    }

    req.flash("success", "Review updated successfully!");
    return res.redirect(`/listings/${id}`);
  })
);

//Delet Review//
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId} });
  await Review.findByIdAndDelete(reviewId);

  if (review && review.images && review.images.length) {
    await deleteReviewImages(review.images);
  }

  req.flash("success", "Review deleted successfully!");
  return res.redirect(`/listings/${id}`);
}));

module.exports = router;
