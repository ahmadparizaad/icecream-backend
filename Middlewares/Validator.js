const mongoose = require("mongoose");
const { SendFail } = require("./Response");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};
const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const validString = function (value) {
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const validatePassWord = (pass) => {
  let regex =
    /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/;
  const matchIt = pass.match(regex);
  console.log(matchIt, "<<<<this is matchit");
  return matchIt;
};

const validateField = (fields, res) => {
  let valid = true;
  for (const key in fields) {
    if (Object.hasOwnProperty.call(fields, key)) {
      const element = fields[key];
      if (!isValid(element) && valid) {
        SendFail(res, key + " is required");
        valid = false;
      }
    }
  }
  return valid;
};

module.exports = {
  isValid,
  isValidObjectId,
  isValidRequestBody,
  validString,
  validatePassWord,
  validateField,
};
