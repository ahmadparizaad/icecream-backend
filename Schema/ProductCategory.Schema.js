const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name (categoryName) is required"],
    },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("product_category", userdata);
