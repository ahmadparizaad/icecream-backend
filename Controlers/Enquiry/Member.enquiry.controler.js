const validator = require("../../Middlewares/Validator");
const {
  SendSuccess,
  SendError,
  SendFail,
} = require("../../Middlewares/Response");
const MemberEnquiry = require("../../Schema/ENQUIRIES/MemberEnquiry.Schema");

const create = async (req, res, next) => {
  try {
    // return null;
    // console.log(fields, "<< these are fields");
    // if (!validator.validateField(fields, res)) return null;
    const savedData = await MemberEnquiry.create({
      ...req.body,
    });

    SendSuccess(res, "Enquiry Created", savedData);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const read = async (req, res, next) => {
  try {
    const data = await MemberEnquiry.find(req.query)
      .sort({ createdAt: -1 })
      .populate("from")
      .populate("member");

    SendSuccess(res, "Category Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await MemberEnquiry.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (!data) return SendFail(res, "Id not found");
    SendSuccess(res, "Category Deleted", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await MemberEnquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
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
  update,
  Delete,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
