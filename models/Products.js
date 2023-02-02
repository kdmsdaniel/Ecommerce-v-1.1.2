const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      default: 0,
      trim: true
    },
    sku: {
      type: String,
      trim: true
    },
    stock: {
      type: Number,
      default: 0,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    img: {
      type: String
    },
    productOwner: {
      ref: "users",
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("products", ProductSchema);
