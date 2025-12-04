const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userdata = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "user",
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "package",
    },

    image: [{ type: String }],
    zone: {
      type: String,
      enum: ["EAST", "WEST", "NORTH", "SOUTH", "PAN INDIA"],
    },
    start: Date,
    end: Date,
    days: {
      required: true,
      type: Number,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    remark: String,
  },

  { timestamps: true }
);

module.exports = new mongoose.model("advertisement", userdata);
