const validator = require("../Middlewares/Validator");
const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const AdvertiesementSchema = require("../Schema/PACKAGES/AdvertiesementPackage");

const create = async (req, res, next) => {
  const { name } = req.body;
  try {
    const rand = Math.floor(1000 + Math.random() * 9000);
    console.log(req.body, "<<<this is req body");
    const savedData = await AdvertiesementSchema.create({
      ...req.body,
      code: req.body.name.slice(0, 3) + rand,
    });
    SendSuccess(res, "Advertiesement Created", savedData);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const read = async (req, res, next) => {
  try {
    const data = await AdvertiesementSchema.find(req.query).sort({
      createdAt: -1,
    });
    SendSuccess(res, "Advertiesement Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await AdvertiesementSchema.findByIdAndDelete(id);
    if (!data) return SendFail(res, "Id not found");
    SendSuccess(res, "Advertiesement Deleted", data);
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
