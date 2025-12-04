const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userdata = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: "product",
    },
    buyer: {
      type: ObjectId,
      ref: "user",
    },

    owner: { type: ObjectId, ref: "user" },
    company: String,
    contact: Number,
    name: String,
    quantity: Number,
    uom: { type: ObjectId, ref: "uom" },
    secondaryUom: { type: ObjectId, ref: "secondary-uom" },
    isDeleted: { type: Boolean, default: false },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("product-enquiry", userdata);
