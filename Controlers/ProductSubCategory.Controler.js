const validator = require("../Middlewares/Validator");
const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const ProductSubCategory = require("../Schema/ProductSubCategory.schema");
const uploadOnCloudinary = require("../Middlewares/Cloudinary");

const create = async (req, res, next) => {
  const { name, parent } = req.body;
  try {
    let fields = { name, parent };
    console.log(req.body);
    // return null;
    if (!req?.files?.image?.length) {
      return SendFail(res, "Image is required");
    }
    if (!validator.validateField(fields, res)) return null;
    let imageUrl = null;
    if (req?.files?.image?.length) {
      imageUrl = await uploadOnCloudinary(req.files.image[0]);
    }
    const savedData = await ProductSubCategory.create({
      ...req.body,
      image: imageUrl,
    });

    SendSuccess(res, "uom Created", savedData);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const read = async (req, res, next) => {
  try {
    const data = await ProductSubCategory.find(req.query).populate("parent");
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
    const data = await ProductSubCategory.findByIdAndDelete(id);
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
