const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const BaseSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
    },
    createdAt: Date,
    file: { type: String, default: null },
    seen: { type: Boolean, default: false },
    writer: { type: ObjectId, ref: "user" },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("message", BaseSchema);
