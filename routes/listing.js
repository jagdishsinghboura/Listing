const express = require("express")
const router = express.Router()
const ExpressError = require("../utils/ExpressError.js")
const { listingSchema } = require("../schema.js")
const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js")
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js")
const ListingController = require("../controllers/listing.js")
const multer = require("multer")
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })

//All listing routes//Index routes
//add new listing
router
    .route("/")
    .get(wrapAsync(ListingController.index))
    .post(isLoggedIn,
        upload.single('listing[image]')
        , wrapAsync(ListingController.createListing))
// .post(isLoggedIn, upload.single('listing[image]'),(req , res)=>{
//    res.send(req.file);
// });



//create new listing
router.get('/new', isLoggedIn, wrapAsync(ListingController.renderNewForm))



//submit edit
//delete listing
router
    .route("/:id")
    .delete(isLoggedIn, isOwner, wrapAsync(ListingController.destroy))
    .put(isLoggedIn, isOwner,  upload.single('listing[image]'), wrapAsync(ListingController.updateListing))
    .get(wrapAsync(ListingController.showListing))


//edit show
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.renderEditForm))




module.exports = router;







//How to use multer 

/* 1 first in tour form   do  enctype="multipart/form-data"
 and 
 2 =import multer from  and use uploasd with storage  
 3= use a middleware in youor post route uplod singlle (name of file )
 4 : = config the clodinary 
 5 := config the storage 

 */