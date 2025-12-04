const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userdata = new mongoose.Schema(
  {
    from: {
      type: ObjectId,
      ref: "user",
    },
    member: {
      type: ObjectId,
      ref: "user",
    },
    text: String,
    status: {
      type: String,
      enum: [
        "Replied",
        "Pending for reply",
        "Not Interested",
        "Interested",
        "Delete",
        "Forwarded To Team Member",
      ],
      default: "Pending for reply",
    },
    isDeleted: { type: Boolean, default: false },

    forwardedToMember: {
      type: ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("member-enquiry", userdata);
