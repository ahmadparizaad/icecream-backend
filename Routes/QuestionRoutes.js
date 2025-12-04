const express = require("express");
const {
  CreateUser,
  userLogin,
} = require("../Controlers/AuthenticationControler");
const {
  createQuestion,
  getQuestions,
  uploadExcel,
  updateQuestion,
  updateQuestionMedia,
} = require("../Controlers/QuestionControler");
const router = express.Router();
const upload = require("../Middlewares/Multer");

router.post("/create", createQuestion);
router.post("/upload-excel", uploadExcel);
router.get("/get", getQuestions);
router.patch(
  "/update/:questionId",

  updateQuestion
);
router.patch(
  "/media",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateQuestionMedia
);

module.exports = router;
