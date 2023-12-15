
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  status: { type: String, enum: ["Pending", "Processing", "Shipped", "Delivered"], default: "Pending" },
});

module.exports = mongoose.model("Order", orderSchema);
