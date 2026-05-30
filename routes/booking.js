const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const { bookingSchema } = require("../schema");
const { isLoggedIn } = require("../middleware");

const SERVICE_FEE = 500;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  }
  next();
};

router.get(
  "/bookings",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const bookings = await Booking.find({ guest: req.user._id })
      .populate({
        path: "listing",
        populate: {
          path: "owner",
        },
      })
      .sort({ createdAt: -1 });

    res.render("bookings/index", { bookings });
  })
);

router.post(
  "/listings/:id/bookings",
  isLoggedIn,
  validateBooking,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { checkIn, checkOut, guests } = req.body.booking;

    const listing = await Listing.findById(id);
    if (!listing) {
      throw new ExpressError(404, "Listing not found");
    }

    if (listing.owner && listing.owner.equals(req.user._id)) {
      req.flash("error", "You cannot book your own listing.");
      return res.redirect(`/listings/${id}`);
    }

    if (Number(guests) > (listing.maxGuests || 4)) {
      req.flash("error", `This listing allows up to ${listing.maxGuests || 4} guests.`);
      return res.redirect(`/listings/${id}`);
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      req.flash("error", "Check-in date cannot be in the past.");
      return res.redirect(`/listings/${id}`);
    }

    const nights = Math.ceil((checkOutDate - checkInDate) / MS_PER_DAY);
    if (nights < 1) {
      req.flash("error", "Please select at least one night.");
      return res.redirect(`/listings/${id}`);
    }

    const overlappingBooking = await Booking.findOne({
      listing: listing._id,
      status: "confirmed",
      checkIn: { $lt: checkOutDate },
      checkOut: { $gt: checkInDate },
    });

    if (overlappingBooking) {
      req.flash("error", "Those dates are already booked. Please choose different dates.");
      return res.redirect(`/listings/${id}`);
    }

    const totalPrice = listing.price * nights + SERVICE_FEE;

    const booking = new Booking({
      listing: listing._id,
      guest: req.user._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      nights,
      pricePerNight: listing.price,
      serviceFee: SERVICE_FEE,
      totalPrice,
    });

    await booking.save();

    req.flash("success", "Your booking is confirmed!");
    res.redirect("/bookings");
  })
);

router.delete(
  "/bookings/:bookingId",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new ExpressError(404, "Booking not found");
    }

    if (!booking.guest.equals(req.user._id)) {
      req.flash("error", "You cannot cancel this booking.");
      return res.redirect("/bookings");
    }

    booking.status = "cancelled";
    await booking.save();

    req.flash("success", "Booking cancelled.");
    res.redirect("/bookings");
  })
);

module.exports = router;
