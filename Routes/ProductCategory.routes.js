const express = require("express");
const {
  CreateUser,
  userLogin,
} = require("../Controlers/AuthenticationControler");
const {
  create,
  read,
  Delete,
} = require("../Controlers/ProductCategory.controler");
const upload = require("../Middlewares/Multer");
const router = express.Router();

router.post("/create", upload.fields([{ name: "image", maxCount: 1 }]), create);
router.get("/get", read);
router.delete("/delete/:id", Delete);

module.exports = router;
