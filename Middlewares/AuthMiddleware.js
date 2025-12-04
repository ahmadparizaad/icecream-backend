const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { JWT_SECRET } = require("../../GlobalConstants");
const { JWT_SECRET } = require("../GLOBAL_CONSTANTS");

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).send({ status: false, message: `Unauthorized` });
    }
    let splitToken = token.split(" ");
    let decodeToken = jwt.verify(splitToken[1], JWT_SECRET);
    if (!decodeToken) {
      return res.status(401).send({ status: false, message: `Invalid Token` });
    } else {
      next();
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const generateJWt = (data) => {
  console.log(data, "<<<<datasss");
  const token = jwt.sign(
    {
      ...data,
    },
    JWT_SECRET,
    { expiresIn: "90d" }
  );
  return token;
};

const verifyVendorRole = async (req, res, next) => {
  console.log("verify");
  try {
    jwt.verify(SplitBearer(req), JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({
          success: false,
          message: "Unauthorized !!",
          error: err.message,
        });
      } else {
        if ("vendor" == decode.role) {
          console.log(decode, "<<<jwt");
          next();
        } else {
          res
            .status(401)
            .send({ success: false, message: "Only vendor can access it !!!" });
        }
      }
    });
  } catch (e) {
    console.log(e, "<<<error");
    res
      .status(401)
      .send({ success: false, message: "Unauthorized !!!", error: e.message });
  }
};

const validateUserDetail = async (req, res, next) => {
  if (!req.body.email) {
    res.status(400).send("Email (email) is required");
    return false;
  }
  if (!req.body.password) {
    res.status(400).send("Password (password) is required");
    return false;
  }

  var emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const isCorrectEmailFormat = emailRegex.test(req.body.email);

  var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const checkPasswordValidation = passwordRegex.test(req.body.password);
  if (!isCorrectEmailFormat) {
    res
      .status(400)
      .send({ success: false, message: "Enter correct email address." });
    return false;
  } else if (!checkPasswordValidation) {
    res.status(400).send({
      success: false,
      message:
        "Password must have atlease 1 Uppercase, 1 lowercase, 1 Special Character, and length shouuld be greater than 8",
    });
    return false;
  } else {
    return true;
  }
};

// signup validation of all fields

module.exports = {
  validateToken,
  generateJWt,
  validateUserDetail,
  verifyVendorRole,
};
