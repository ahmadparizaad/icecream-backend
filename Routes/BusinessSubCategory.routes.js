const express = require("express");

const {
  create,
  read,
  Delete,
} = require("../Controlers/BusinessSubCategory.controler");
const router = express.Router();

router.post("/create", create);
router.get("/get", read);
router.delete("/delete/:id", Delete);

module.exports = router;
