const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: String,
  productDescription: String,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  brands: [
    {
      brandName: String,
      detail: String,
      price: Number,
      image: String,
    },
  ],
}, { versionKey: false });

module.exports = mongoose.model("Product", productSchema);