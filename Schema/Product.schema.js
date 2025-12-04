const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product_category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product_subcategory",
    },
    uom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "uom",
    },
    secUom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "secondary-uom",
    },
    mrp: Number,
    hsn_code: String,
    gst_code: String,
    description: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    image: String,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("product", userdata);
