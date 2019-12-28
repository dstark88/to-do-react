const router = require("express").Router();
const mtnBikeProjectController = require("../../controllers/mtnBikeProjectController");

// Matches with "/api/mtnBikeProject"
router
  .route("/")
  .get(mtnBikeProjectController.findAll);

module.exports = router;
