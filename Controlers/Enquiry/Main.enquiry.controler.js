const validator = require("../../Middlewares/Validator");
const {
  SendSuccess,
  SendError,
  SendFail,
} = require("../../Middlewares/Response");
const MainEnquirySchema = require("../../Schema/ENQUIRIES/Main.enquiry.schema");

const create = async (req, res, next) => {
  const { number, user } = req.body;
  try {
    // return null;
    // console.log(fields, "<< these are fields");j
    // if (!validator.validateField(fields, res)) return null;
    const savedData = await MainEnquirySchema.create({
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
    let filter = req.query;
    console.log(req.body);
    if (req.body.buyer) {
      filter = {
        ...filter,
        buyer: req.body.buyer,
      };
    }
    if (req.body.productCategory) {
      filter = {
        ...filter,
        productCategory: { $in: req.body.productCategory },
      };
    }
    if (req.body.productSubCategory) {
      filter = {
        ...filter,
        productSubCategory: { $in: req.body.productSubCategory },
      };
    }

    const data = await MainEnquirySchema.find(filter)
      .sort({ createdAt: -1 })
      .populate("buyer")
      .populate("productCategory")
      .populate("productSubCategory")
      .populate("uom")
      .populate("secondaryUom")
      .populate("forwardedToMember");

    SendSuccess(res, "Category Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await MainEnquirySchema.findByIdAndUpdate(id, {
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
    const data = await MainEnquirySchema.findByIdAndUpdate(id, req.body, {
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
