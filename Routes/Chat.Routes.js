const express = require("express");
const router = express.Router();
// const upload = require("../Middlewares/multer");

const {
  Create,
  Read,
  Delete,
  Update,
  MyChat,
  messageSeen,
} = require("../Controlers/Chat.Controler");

// use this for File route
// router.post("/create", upload.fields([{ name: "image", maxCount: 1 }]), create);

router.post("/create", Create);
router.get("/get", Read);
router.get("/my-chat", MyChat);
router.delete("/delete/:id", Delete);
router.put("/update/:id", Update);
router.put("/seen", messageSeen);
// router.patch("/update/:id", update);

module.exports = router;
