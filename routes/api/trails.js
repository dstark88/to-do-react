const router = require("express").Router();
const trailController = require("../../controllers/trailController");

// Matches with "/api/trails"
router.route("/")
  .get(trailController.findAll)
  .post(trailController.create);

// Matches with "/api/trails/:id"
router
  .route("/:id")
  .get(trailController.findById)
  .put(trailController.update)
  .delete(trailController.remove);

module.exports = router;
