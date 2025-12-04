const express = require("express");
const {
  create,
  read,
  update,
  Delete,
} = require("../../Controlers/Enquiry/Member.enquiry.controler");

const router = express.Router();
const upload = require("../../Middlewares/Multer");

router.post("/create", create);
router.get("/get", read);
router.delete("/delete/:id", Delete);

module.exports = router;
