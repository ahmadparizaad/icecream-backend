const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("designation", userdata);
