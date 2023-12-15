
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  weight: { type: Number, required: false },
  quantity: { type: Number, required: true },
  price: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("Product", productSchema);
