const express = require("express");
const {
  CreateUser,
  userLogin,
} = require("../Controlers/AuthenticationControler");
const {
  getUser,
  update,
  updateProfile,
} = require("../Controlers/UserControler");
const router = express.Router();
const upload = require("../Middlewares/Multer");

router.get("/get", getUser);
router.put("/update/:id", update);
router.put(
  "/update-media/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateProfile
);

module.exports = router;
