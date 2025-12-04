const validator = require("../Middlewares/Validator");
const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const SecondaryUOM = require("../Schema/SecondaryUom.schema");

const create = async (req, res, next) => {
  const { name } = req.body;
  try {
    let fields = { name };

    // return null;
    if (!validator.validateField(fields, res)) return null;
    const savedData = await SecondaryUOM.create({
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
    const data = await SecondaryUOM.find(req.query).populate("parent");
    SendSuccess(res, "uom Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await SecondaryUOM.findByIdAndDelete(id);
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
