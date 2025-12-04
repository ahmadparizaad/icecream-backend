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
    parent: { type: ObjectId, ref: "uom", required: [true, "UOM is required"] },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("secondary-uom", userdata);
