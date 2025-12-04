const express = require("express");

const {
  create,
  read,
  Delete,
  update,
  addMember,
  removeEmployee,
} = require("../Controlers/Desk.controler");
const router = express.Router();

router.post("/create", create);
router.get("/get", read);
router.delete("/delete/:id", Delete);
router.put("/update/:id", update);
router.post("/add-employee", addMember);
router.post("/add-member", addMember);
router.post("/remove-employee", removeEmployee);

module.exports = router;
