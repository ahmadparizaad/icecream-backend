const express = require("express");

const {
  createBlog,
  getBlogs,
  deleteBlog,
} = require("../Controlers/BlogControler");

const router = express.Router();
const upload = require("../Middlewares/Multer");

router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createBlog
);
router.get("/get", getBlogs);
router.delete("/delete/:id", deleteBlog);

module.exports = router;
