const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");
const Listing = require("../models/listing");
const Booking = require("../models/booking");
const User = require("../models/user");


const { isLoggedIn, isOwner } = require("../middleware");
const getAverageRating = require("../utils/averageRating");
const getReviewStats = require("../utils/reviewStats");
const { cloudinary, upload, uploadImage } = require("../utils/cloudinary");
const geocodeLocation = require("../utils/geocode");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getGuestCount = (guests) => {
  if (!guests) {
    return null;
  }

  const matches = guests.toString().match(/\d+/g);
  if (!matches) {
    return null;
  }

  const total = matches.reduce((sum, value) => sum + Number(value), 0);
  return Number.isFinite(total) && total > 0 ? total : null;
};


// VALIDATION MIDDLEWARE
const validateListing = (req, res, next) => {
  const { error, value } = listingSchema.validate(req.body || {}, {
    abortEarly: false,
  });
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);
  }
  if (!value || !value.listing) {
    throw new ExpressError(400, "Listing details are required.");
  }
  req.body = value;
  req.validatedListing = value.listing;
  next();
};

const requireListingImage = (req, res, next) => {
  if (!req.file) {
    throw new ExpressError(400, "Please upload a listing image.");
  }

  next();
};

const hasLocationChanged = (listing, nextListingData) => {
  const currentLocation = (listing.location || "").trim().toLowerCase();
  const currentCountry = (listing.country || "").trim().toLowerCase();
  const nextLocation = (nextListingData.location || "").trim().toLowerCase();
  const nextCountry = (nextListingData.country || "").trim().toLowerCase();

  return currentLocation !== nextLocation || currentCountry !== nextCountry;
};

// INDEX + SEARCH (ONLY ONE ROUTE)
router.get("/", wrapAsync(async (req, res) => {
  const { category, location, date, guests, sort } = req.query;
  const guestCount = getGuestCount(guests);
  const sortOptions = {
    price_asc: { price: 1, _id: -1 },
    price_desc: { price: -1, _id: -1 },
    newest: { _id: -1 },
  };

  let query = {};

  // Category filter
  if (category) {
    query.category = category;
  }

  // Location search
  if (location && location.trim()) {
    const locationRegex = new RegExp(escapeRegex(location.trim()), "i");
    query.$or = [
      { location: locationRegex },
      { country: locationRegex },
      { title: locationRegex },
    ];
  }

  if (guestCount) {
    query.maxGuests = { $gte: guestCount };
  }

  if (date) {
    const requestedDate = new Date(date);

    if (!Number.isNaN(requestedDate.getTime())) {
      requestedDate.setHours(0, 0, 0, 0);
      const nextDate = new Date(requestedDate);
      nextDate.setDate(nextDate.getDate() + 1);

      const unavailableBookings = await Booking.find({
        status: "confirmed",
        checkIn: { $lt: nextDate },
        checkOut: { $gt: requestedDate },
      }).select("listing");

      if (unavailableBookings.length) {
        query._id = { $nin: unavailableBookings.map((booking) => booking.listing) };
      }
    }
  }

  const listingsQuery = Listing.find(query).populate("reviews");

  if (sortOptions[sort]) {
    listingsQuery.sort(sortOptions[sort]);
  }

  const allListings = await listingsQuery;

  res.render("listings/index", {
    allListings,
    category,
    location,
    date,
    guests,
    sort: sortOptions[sort] ? sort : "",
    getAverageRating
  });
}));

// NEW LISTING FORM
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

// WISHLIST PAGE
router.get("/wishlist", isLoggedIn, wrapAsync(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "wishlist",
    populate: {
      path: "reviews",
    },
  });

  res.render("listings/wishlist", {
    wishlist: user.wishlist || [],
    getAverageRating,
  });
}));

// HOST LISTINGS DASHBOARD
router.get("/mine", isLoggedIn, wrapAsync(async (req, res) => {
  const listings = await Listing.find({ owner: req.user._id })
    .populate("reviews")
    .sort({ _id: -1 });

  const bookingCounts = await Booking.aggregate([
    {
      $match: {
        listing: { $in: listings.map((listing) => listing._id) },
        status: "confirmed",
      },
    },
    {
      $group: {
        _id: "$listing",
        count: { $sum: 1 },
      },
    },
  ]);

  const bookingCountByListing = bookingCounts.reduce((map, item) => {
    map[item._id.toString()] = item.count;
    return map;
  }, {});

  res.render("listings/mine", {
    listings,
    bookingCountByListing,
    getAverageRating,
  });
}));

// TOGGLE WISHLIST
router.post("/:id/wishlist", isLoggedIn, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  const user = await User.findById(req.user._id);
  const savedIndex = user.wishlist.findIndex((listingId) => listingId.equals(id));

  if (savedIndex === -1) {
    user.wishlist.push(id);
    req.flash("success", "Listing saved to wishlist!");
  } else {
    user.wishlist.splice(savedIndex, 1);
    req.flash("success", "Listing removed from wishlist.");
  }

  await user.save();

  res.redirect(req.get("Referer") || "/listings");
}));

// CREATE LISTING
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  requireListingImage,
  validateListing,
  wrapAsync(async (req, res) => {
    const listingData = { ...req.validatedListing };
    listingData.geometry = await geocodeLocation(listingData);

    const newListing = new Listing(listingData);
    newListing.owner = req.user._id;

    const image = await uploadImage(req.file);
    newListing.image = image.secure_url;
    newListing.imageFilename = image.public_id;

    await newListing.save();
    req.flash("success", "Listing created successfully!");
    res.redirect("/listings");
  })
);

// SHOW LISTING
router.get("/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate("owner")
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    });

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  let canReview = false;
  let hasReviewed = false;
  let reviewNotice = "Please log in to leave a review.";

  if (req.user) {
    const isOwner = listing.owner && listing.owner._id.equals(req.user._id);
    hasReviewed = listing.reviews.some((review) => {
      return review.author && review.author._id.equals(req.user._id);
    });

    if (isOwner) {
      reviewNotice = "Hosts cannot review their own listings.";
    } else if (hasReviewed) {
      reviewNotice = "You have already reviewed this stay.";
    } else {
      const today = new Date();
      today.setHours(23, 59, 59, 999);

      const completedBooking = await Booking.exists({
        listing: listing._id,
        guest: req.user._id,
        status: "confirmed",
        checkOut: { $lte: today },
      });

      canReview = Boolean(completedBooking);
      reviewNotice = canReview
        ? ""
        : "You can review this stay after completing a booking.";
    }
  }

  res.render("listings/show", {
    listing,
    getAverageRating,
    reviewStats: getReviewStats(listing.reviews),
    canReview,
    hasReviewed,
    reviewNotice,
  });
}));
// EDIT FORM
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  res.render("listings/edit", { listing });
}));

// UPDATE LISTING
router.put("/:id", isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  const listingData = { ...req.validatedListing };
  if (hasLocationChanged(listing, listingData)) {
    listingData.geometry = await geocodeLocation(listingData);
  }

  Object.assign(listing, listingData);

  const oldImageFilename = listing.imageFilename;
  if (req.file) {
    const image = await uploadImage(req.file);
    listing.image = image.secure_url;
    listing.imageFilename = image.public_id;
  }

  await listing.save();

  if (req.file && oldImageFilename) {
    await cloudinary.uploader.destroy(oldImageFilename);
  }

  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
}));

// DELETE LISTING
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);
  if (listing && listing.imageFilename) {
    await cloudinary.uploader.destroy(listing.imageFilename);
  }

  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted successfully!");
  res.redirect("/listings");
}));

module.exports = router;
