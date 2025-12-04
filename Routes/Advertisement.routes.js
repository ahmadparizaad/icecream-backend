const express = require("express");

const {
  create,
  read,
  Delete,
  update,
} = require("../Controlers/Advertisement.controler");
const upload = require("../Middlewares/Multer");
const router = express.Router();

router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 10 }]),
  create
);
router.get("/get", read);
router.delete("/delete/:id", Delete);
router.put("/update/:id", update);

module.exports = router;
