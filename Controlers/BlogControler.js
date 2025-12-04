const uploadOnCloudinary = require("../Middlewares/Cloudinary");
const SendError = require("../Middlewares/Response");
const validator = require("../Middlewares/Validator");
const BlogSchema = require("../Schema/BlogSchema");

const createBlog = async (req, res, next) => {
  const testData = req.body;

  if (!req.files) {
    return res
      .status(400)
      .send({ success: false, message: "image is required" });
  }

  const { image } = req.files;
  if (!image) {
    return res
      .status(400)
      .send({ success: false, message: "Image is required" });
  }
  let uri = null;
  if (req?.files?.image?.length > 0) {
    uri = await uploadOnCloudinary(req.files.image[0]);
    // req.body.image = uri;
  }
  // const uploadedFile = image[0];

  const { title, description, shortDescription } = testData;
  try {
    if (!validator.isValid(title)) {
      return res
        .status(400)
        .send({ status: false, message: "title is required" });
    }
    if (!validator.isValid(shortDescription)) {
      return res
        .status(400)
        .send({ status: false, message: "shortDescription is required" });
    }
    if (!validator.isValid(description)) {
      return res
        .status(400)
        .send({ status: false, message: "description is required" });
    }

    const savedData = await BlogSchema.create({
      ...testData,
      image: uri,
    });
    res.status(200).send({
      success: true,
      message: "Category Created",
      data: savedData._doc,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const getBlogs = async (req, res, next) => {
  try {
    const data = await BlogSchema.find(req.query);
    if (data.length == 0) {
      return res
        .status(400)
        .send({ success: false, message: "Data not found", data });
    }
    res.status(200).send({
      success: true,
      message: "Categories fetched",
      data,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "ID is required",
      });
    }
    const data = await BlogSchema.findByIdAndDelete(req.params.id);
    if (data.length == 0) {
      return res
        .status(400)
        .send({ success: false, message: "Blog does not exist", data });
    }
    res.status(200).send({
      success: true,
      message: "Blog Deleted",
      data,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

// const userLogin = async function (req, res) {
//   try {
//     const loginDetails = req.body;

//     const { email, password } = loginDetails;

//     if (!validator.isValidRequestBody(loginDetails)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Please provide login details" });
//     }

//     if (!validator.isValid(email)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Email-Id is required" });
//     }

//     if (!validator.isValid(password)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Password is required" });
//     }

//     const userData = await User.findOne({ email });

//     if (!userData) {
//       return res.status(401).send({
//         status: false,
//         message: `Login failed!! Email-Id is incorrect!`,
//       });
//     }

//     const checkPassword = await bcrypt.compare(password, userData.password);

//     if (!checkPassword)
//       return res.status(401).send({
//         status: false,
//         message: `Login failed!! password is incorrect.`,
//       });

//     delete userData["password"];
//     return res.status(200).send({
//       status: true,
//       message: "LogIn Successful!!",
//       data: userData,
//     });
//   } catch (err) {
//     return res.status(500).send({ status: false, error: err.message });
//   }
// };
module.exports = {
  getBlogs,
  createBlog,
  deleteBlog,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
