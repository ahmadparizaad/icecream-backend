const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userdata = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    shortDescription: {
      type: String,
      required: [true, "Short Description is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    createdBy: {
      type: ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("blog", userdata);
