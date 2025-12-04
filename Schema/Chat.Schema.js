const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const BaseSchema = new mongoose.Schema(
  {
    user1: {
      type: ObjectId,
      required: [true, "Freelancer is required"],
      ref: "user",
    },
    user2: {
      type: ObjectId,
      required: [true, "Owner is required"],
      ref: "user",
    },
    productEnquiry: {
      type: ObjectId,
      //   required: [true, "Project is required"],
      ref: "product-enquiry",
    },
    memberEnquiry: {
      type: ObjectId,
      //   required: [true, "Project is required"],
      ref: "member-enquiry",
    },
    mainEnquiry: {
      type: ObjectId,
      //   required: [true, "Project is required"],
      ref: "main-enquiry",
    },

    messages: [
      {
        type: ObjectId,
        ref: "message",
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("chat", BaseSchema);
