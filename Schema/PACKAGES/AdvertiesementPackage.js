const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userdata = new mongoose.Schema(
  {
    ratePerDay: {
      type: Number,
      default: 1,
    },
    validFrom: Date,
    validTo: Date,
    discount: {
      type: Number,
    },
    position: {
      type: String,
      enum: ["TOP", "BOTTOM", "LEFT SIDE", "RIGHT SIDE"],
    },
    name: {
      type: String,
      uppercase: true,
    },
    code: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

module.exports = new mongoose.model("advertisementPackage", userdata);
