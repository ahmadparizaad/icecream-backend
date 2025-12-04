const bcrypt = require("bcrypt");
const { validateUserDetail } = require("../Middlewares/AuthMiddleware");
const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const User = require("../Schema/User");
const validator = require("../Middlewares/Validator");
const uploadOnCloudinary = require("../Middlewares/Cloudinary");

const getUser = async (req, res, next) => {
  try {
    console.log("fetching users")
   let user=await  User.find(req.query)
   .sort({createdAt:-1})
      .populate("businessCategory")
      .populate("businessSubCategory")
      .populate("productCategory")

      .populate("deskId");
console.log("users",user.length)

      console.log("fetched user")
    if (user.length == 0) {
      return res
        .status(400)
        .send({ success: false, message: "Data not found", user });
    }
    res.status(200).send({
      success: true,
      message: "User successfully created",
      user,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const update = async (req, res) => {
  try {
    // let user = await User.findById(req.params.id);
    let data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    SendSuccess(res, "User Updated", data);
  } catch (error) {
    SendError(res, error);
  }
};
const updateProfile = async (req, res) => {
  try {
    // let user = await User.findById(req.params.id);
    console.log(req.files);
    if (!req?.files?.image.length) return SendFail(res, "Image is required");

    let { value } = req.body;
    if (!value)
      return SendFail(
        res,
        "value is required 1 for profile image 2 for gst image 3 for pan image 4 for company Brochure 5 for company logo"
      );
    if (value > 5) {
      return SendFail(res, "value must be less than 6 for profile image,");
    }
    let uri = await uploadOnCloudinary(req.files.image[0]);
    if (value == 1) {
      let data = await User.findByIdAndUpdate(
        req.params.id,
        { image: uri },
        {
          new: true,
        }
      );
      SendSuccess(res, "User Profile Updated", data);
    }
    if (value == 2) {
      let data = await User.findByIdAndUpdate(
        req.params.id,
        { gstImage: uri },
        {
          new: true,
        }
      );
      SendSuccess(res, "GST Updated", data);
    }
    if (value == 3) {
      let data = await User.findByIdAndUpdate(
        req.params.id,
        { panImage: uri },
        {
          new: true,
        }
      );
      SendSuccess(res, " Pan Image Updated", data);
    }
    if (value == 4) {
      let data = await User.findByIdAndUpdate(
        req.params.id,
        { companyBrochure: uri },
        {
          new: true,
        }
      );
      SendSuccess(res, "Company Brochure Updated", data);
    }
    if (value == 5) {
      let data = await User.findByIdAndUpdate(
        req.params.id,
        { companyLogo: uri },
        {
          new: true,
        }
      );
      SendSuccess(res, "Company Logo Updated", data);
    }
  } catch (error) {
    SendError(res, error);
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
  getUser,
  updateProfile,
  update,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
