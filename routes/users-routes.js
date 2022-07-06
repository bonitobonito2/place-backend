const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/users-controller");
const router = express.Router();

router.get("/", userController.getAllUser);
router.post(
  "/create",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userController.craeteUser
);
router.post("/auth", userController.auth);

module.exports = router;
