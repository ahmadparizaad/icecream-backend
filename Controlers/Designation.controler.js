const validator = require("../Middlewares/Validator");
const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const Designation = require("../Schema/Designation.Schema");

const create = async (req, res, next) => {
  const { name } = req.body;
  try {
    let fields = { name };

    // return null;
    if (!validator.validateField(fields, res)) return null;
    const savedData = await Designation.create({
      ...req.body,
    });

    SendSuccess(res, "Designation Created", savedData);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const read = async (req, res, next) => {
  try {
    const data = await Designation.find(req.query);
    SendSuccess(res, "Designation Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Designation.findByIdAndDelete(id);
    if (!data) return SendFail(res, "Id not found");
    SendSuccess(res, "Designation Deleted", data);
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
