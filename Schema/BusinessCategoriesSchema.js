const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Business Category is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("business_category", userdata);
