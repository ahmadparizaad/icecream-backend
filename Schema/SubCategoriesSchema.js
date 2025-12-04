const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    subCategoryName: {
      type: String,
      required: [true, "Category Name (categoryName) is required"],
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("subcategory", userdata);
