const validator = require("../../Middlewares/Validator");
const {
  SendSuccess,
  SendError,
  SendFail,
} = require("../../Middlewares/Response");
const ProductEnquiry = require("../../Schema/ENQUIRIES/Product.enquiry.schema");

const create = async (req, res, next) => {
  const { product, buyer, uom, secondaryUom, location, company } = req.body;
  try {
    let fields = {
      product,
      buyer,
      uom,
      secondaryUom,
      location,
      company,
    };

    // return null;
    // console.log(fields, "<< these are fields");
    if (!validator.validateField(fields, res)) return null;
    const savedData = await ProductEnquiry.create({
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
    const data = await ProductEnquiry.find(req.query)
         .sort({ createdAt: -1 })
      .populate("product")
      .populate("buyer")
      .populate("owner")
      .populate("uom")
      .populate("secondaryUom");

    SendSuccess(res, "Category Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("<<< this is id");
    const data = await ProductEnquiry.findByIdAndUpdate(id, {
      isDeleted: true,
    });

    console.log(req);
    if (!data) return SendFail(res, "Id not found", data);
    SendSuccess(res, "Category Deleted", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await ProductEnquiry.findByIdAndUpdate(id, req.body, {
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
