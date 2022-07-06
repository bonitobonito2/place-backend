const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const placesController = require("../controllers/places-controller");

router.get("/:id", placesController.getPlaceById);

router.get("/user/:id", placesController.getPlacesByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 10 }),
    check("address").not().isEmpty(),
  ],
  placesController.createPlace
);

router.patch(
  "/:id",
  [check("title").not().isEmpty(), check("description").isLength({ min: 10 })],
  placesController.updatePlaceById
);

router.delete("/:id", placesController.deletePlaceById);

module.exports = router;
