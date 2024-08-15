const express = require("express");
const router= express.Router({mergeParams:true})
const ExpressError = require("../utils/ExpressError.js")
const wrapAsync = require("../utils/wrapAsync.js")
const Review =require("../models/review.js")
const Listing =require("../models/listing.js")
const {isLoggedIn, isReviewAuthor} =require("../middleware.js")



router.post("/",isLoggedIn, async (req, res) => {
    let listing = await Listing.findById(req.params.id)
    let newReview = new Review(req.body.review)
    newReview.author=req.user.id;
    console.log(newReview)
    console.error(listing)
    listing.reviews.push(newReview)

    await newReview.save();
    await listing.save();
    req.flash("success", "review created")
    
    res.redirect(`/listings/${req.params.id}`)
})

//delete review 

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(async (req, res, next)=>{
    let  {id , reviewId}= req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    
    req.flash("success", "review Deleted")
   res.redirect(`/listings/${id}`)
}))

module.exports =router