const validator = require("../Middlewares/Validator");
const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const BusinessCategoriesSchema = require("../Schema/BusinessCategoriesSchema");

const create = async (req, res, next) => {
  const { name } = req.body;
  try {
    let fields = { name };
    if (!validator.validateField(fields, res)) return null;
    const savedData = await BusinessCategoriesSchema.create({
      ...req.body,
    });
    SendSuccess(res, "Category Created", savedData);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const read = async (req, res, next) => {
  try {
    const data = await BusinessCategoriesSchema.find(req.query);
    SendSuccess(res, "Category Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await BusinessCategoriesSchema.findByIdAndDelete(id);
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
