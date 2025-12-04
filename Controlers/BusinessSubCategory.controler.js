const validator = require("../Middlewares/Validator");
const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const BusinessSubCategory = require("../Schema/BusinessSubCategory.schema");

const create = async (req, res, next) => {
  const { name, parent } = req.body;
  try {
    let fields = { name, parent };
    console.log(req.body);
    // return null;
    if (!validator.validateField(fields, res)) return null;
    const savedData = await BusinessSubCategory.create({
      ...req.body,
    });

    SendSuccess(res, "uom Created", savedData);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const read = async (req, res, next) => {
  try {
    const data = await BusinessSubCategory.find(req.query).populate("parent");
    // console.log(data, "<<< thisis data");
    res
      .status(200)
      .send({ success: true, data, message: "Sub Category Fetched" });
    // return SendSuccess(res, "Sub Categories Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await BusinessSubCategory.findByIdAndDelete(id);
    if (!data) return SendFail(res, "Id not found");
    SendSuccess(res, "uom Deleted", data);
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
