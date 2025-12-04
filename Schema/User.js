const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const strReq = { type: String };
const numReq = { type: Number };
const userdata = new mongoose.Schema(
  {
    firstName: {
      type: String,
      // required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      // required: [true, "Last Name is required"],
    },
    shortName: String,
    image: String,
    organizationName: {
      type: String,
      // required: [true, "Organization name is requried"],dd
    },
    mobile2: Number,
    address1: { type: String },
    address2: String,
    address3: String,
    country: strReq,
    state: strReq,
    productCategory: {
      type: ObjectId,
      ref: "product_category",
    },

    city: strReq,
    landMark: strReq,
    gstNumber: strReq,
    employeeNumber: numReq,
    turnover: numReq,
    verified:{
      type:Boolean,
      default:false,
    },
    businessCategory: [
      {
        type: ObjectId,
        ref: "business_category",
      },
    ],
    businessSubCategory: [
      {
        type: ObjectId,
        ref: "business_subcategory",
      },
    ],
    password: String,
    gstImage: { type: String, default: null },
    panImage: { type: String, default: null },
    companyBrochure: { type: String, default: null },
    companyLogo: { type: String, default: null },
    panNumber: String,
    typeOfCompany: String,
    pinCode: Number,
    email: { type: String, unique: true },
    mobile: {
      type: Number,
      unique: true,
      required: [true, "Mobile number required"],
    },
    deskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "desk",
      default: null,
    },
    deskNumber: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["employee", "member", "admin", "submember", "guest"],
      required: [true, "Role is required"],
    },
    subUsers: [
      {
        type: Object,
        default: null,
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("user", userdata);
