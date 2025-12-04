const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
    },
    number: Number,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("uom", userdata);
