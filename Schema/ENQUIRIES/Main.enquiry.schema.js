const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const refer = (ref) => ({ type: ObjectId, ref });
const userdata = new mongoose.Schema(
  {
    buyer: refer("user"),
    productCategory: refer("product_category"),
    productSubCategory: refer("product_subcategory"),
    company: String,
    name: String,
    contact: Number,
    quantity: Number,
    uom: refer("uom"),
    location: String,
    secondaryUom: refer("secondary-uom"),
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

module.exports = new mongoose.model("main-enquiry", userdata);
