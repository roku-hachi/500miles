const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/refresh-token", authController.refreshToken);
router.post("/login", authController.login);
router.post(
  "/register",
  uploadMiddleware.uploadAvatar,
  authController.register,
);

module.exports = router;
