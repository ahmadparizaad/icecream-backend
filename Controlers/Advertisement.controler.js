const validator = require("../Middlewares/Validator");
const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const AdvertiseMentSchema = require("../Schema/Advertisements.schema");
const uploadOnCloudinary = require("../Middlewares/Cloudinary");
const { getDiffInDays } = require("../Middlewares/Timers");

const create = async (req, res, next) => {
  const { number, user } = req.body;
  try {
    if (!req.files) {
      return SendFail(res, "image is required");
    }
    if (!req?.files?.image?.length) return SendFail(res, "Image is required");
    let images = req.files.image;
    console.log(images, "<<< these are images");
    let sendURI = [];
    const getDays = getDiffInDays(req.body.start, req.body.end);
    for (let index = 0; index < images.length; index++) {
      let image = images[index];
      let uri = await uploadOnCloudinary(image);
      sendURI = [...sendURI, uri];
    }
    console.log(sendURI, "<<<<senduri");
    // return null;
    const savedData = await AdvertiseMentSchema.create({
      ...req.body,
      image: sendURI,
      days: getDays,
    });

    SendSuccess(res, "Package Created", savedData);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const read = async (req, res, next) => {
  try {
    const data = await AdvertiseMentSchema.find(req.query)
      .populate("user")
      .populate("package")
      .sort({ number: -1 });

    SendSuccess(res, "Category Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await AdvertiseMentSchema.findByIdAndDelete(id);
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
    console.log(req.body);

    const data = await AdvertiseMentSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!data) return SendFail(res, "Id not found");
    SendSuccess(res, "Category updated", data);
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
