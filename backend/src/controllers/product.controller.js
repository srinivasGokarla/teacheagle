const Product = require("../models/product.model");

exports.addProduct = async (req, res) => {
  try {
    const { name, image, description, weight, quantity, price } = req.body;
    const product = new Product({
      name,
      image,
      description,
      weight,
      quantity,
      price,
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProductQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    await Product.findByIdAndUpdate(productId, { quantity });
    res.status(200).json({ message: "Product quantity updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
