const validator = require("../Middlewares/Validator");
const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const PackageSchema = require("../Schema/PACKAGES/Package.schema");

const create = async (req, res, next) => {
  const { name } = req.body;
  try {
    const rand = Math.floor(1000 + Math.random() * 9000);
    console.log(req.body, "<<<this is req body");
    const savedData = await PackageSchema.create({
      ...req.body,
      code: req.body.name.slice(0, 3) + rand,
    });
    SendSuccess(res, "Category Created", savedData);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const read = async (req, res, next) => {
  try {
    const data = await PackageSchema.find(req.query)
      .populate("businessCategory")
      .sort({ createdAt: -1 });
    SendSuccess(res, "Category Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await PackageSchema.findByIdAndDelete(id);
    if (!data) return SendFail(res, "Id not found");
    SendSuccess(res, "Category Deleted", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

module.exports = {
  read,
  create,
  Delete,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
