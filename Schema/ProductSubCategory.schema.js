const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const userdata = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
    },
    number: Number,
    image: String,
    parent: {
      type: ObjectId,
      ref: "product_category",
      required: [true, "Busness Category is required"],
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("product_subcategory", userdata);
