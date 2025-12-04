const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "name is required"],
    },
    shortDescription: {
      type: String,
      required: [true, "name is required"],
    },
    description: {
      type: String,
      required: [true, "name is required"],
    },
    image: {
      type: String,
      default: null,

      //   required: [true, "Image is required"],
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("news", userdata);
