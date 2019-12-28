const path = require("path");
const router = require("express").Router();
const trailRoutes = require("./trails");
const mtnBikeProjectRoutes = require("./mtnBikeProject");

// Trail routes
router.use("/trails", trailRoutes);

// Google Routes
router.use("/mtnBikeProject", mtnBikeProjectRoutes);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
