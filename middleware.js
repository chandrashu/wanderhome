const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {

        req.flash("error", "You must be logged in first!");

        return res.redirect("/login");
    }

    next();
};

// OWNER AUTHORIZATION

module.exports.isOwner = async (req, res, next) => {

    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }

    if (!listing.owner || !listing.owner.equals(req.user._id)) {

        req.flash("error", "You are not the owner of this listing!");

        return res.redirect(`/listings/${id}`);
    }

    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {

    let { id, reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
        throw new ExpressError(404, "Review not found");
    }

    if (!review.author || !review.author.equals(req.user._id)) {

        req.flash("error", "You cannot delete this review.");

        return res.redirect(`/listings/${id}`);
    }

    next();
};
