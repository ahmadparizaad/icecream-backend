const bcrypt = require("bcrypt");
const SendError = require("../Middlewares/Response");

const FaqSchema = require("../Schema/FaqSchema");

const createFaq = async (req, res, next) => {
  try {
    const testData = req.body;
    const savedData = await FaqSchema.create({
      ...testData,
    });
    res.status(200).send({
      success: true,
      message: "Faq Created",
      data: savedData._doc,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const getFaq = async (req, res, next) => {
  try {
    const data = await FaqSchema.find(req.query);
    if (data.length == 0) {
      return res
        .status(400)
        .send({ success: false, message: "Data not found", data });
    }
    res.status(200).send({
      success: true,
      message: "Categories fetched",
      data,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

module.exports = {
  createFaq,
  getFaq,
};
