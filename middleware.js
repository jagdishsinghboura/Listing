const Listing = require("./models/listing")
const Review = require("./models/review")
const ExpressError = require("./utils/ExpressError")
const { listingSchema } = require("./schema")

module.exports.saveRedirectUrl = (req, res, next) => {
    console.log(req.session.redirectUrl)
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must login before")
        res.redirect("/login")
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.curUser._id)) {
        req.flash("error", "you are not owner of this post ")
        res.redirect(`/listings/${id}`)
    }
    next()
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.isReviewAuthor =async (req, res, next) => {
    let { id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.curUser._id)) {
        req.flash("error", "you are not author of this review ")
        res.redirect(`/listings/${id}`)
    }
    next()
}

