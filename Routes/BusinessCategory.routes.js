const express = require("express");
const {
  CreateUser,
  userLogin,
} = require("../Controlers/AuthenticationControler");
const {
  create,
  read,
  Delete,
} = require("../Controlers/BusinessCategory.controler");
const router = express.Router();

router.post("/create", create);
router.get("/get", read);
router.delete("/delete/:id", Delete);

module.exports = router;
