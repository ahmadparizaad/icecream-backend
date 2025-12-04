const express = require("express");
const {
  create,
  read,
  update,
  Delete,
} = require("../../Controlers/Enquiry/Main.enquiry.controler");

const router = express.Router();
const upload = require("../../Middlewares/Multer");

router.post("/create", upload.fields([{ name: "image", maxCount: 1 }]), create);
router.post("/get", read);
router.delete("/delete/:id", Delete);

module.exports = router;
