const express = require("express");

const {
  create,
  read,
  Delete,
  update,
} = require("../../Controlers/Package.controler");
const router = express.Router();

router.post("/create", create);
router.get("/get", read);
router.delete("/delete/:id", Delete);
// router.patch("/update/:id", update);

module.exports = router;
