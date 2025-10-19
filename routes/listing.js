const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js")
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { authorize } = require("passport");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


const listingController = require("../controllers/listings.js");

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn , validateListing, upload.single("listing[image]"), wrapAsync(listingController.createListing));



//new Route
//new route ko id wale routes se oopar rakhna warna "new" as a id lelega system
router.get("/new", isLoggedIn, listingController.renderNewForm)



router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// //index route
// router.get("/", wrapAsync(listingController.index));



//agar new route ko show route se pehele likha
//toh woh new ko id samajh rha hai url mien aur search kar rha
//lekin new toh url ka part hai toh use oopar likh diya

//show route
// router.get("/:id", wrapAsync(listingController.showListing))

// //create route
// router.post("/", validateListing, isLoggedIn, wrapAsync(listingController.createListing))

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm))

//Update Route
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))

//Delete Route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


module.exports = router;