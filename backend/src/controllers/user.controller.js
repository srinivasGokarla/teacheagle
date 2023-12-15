const User = require("../models/user.model");
const Product = require("../models/product.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/config");

exports.registerUser = async (req, res) => {

  try {
    const { name, email, phone, address, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      role,
    });
    await user.save();
    console.log(user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, config.secretKey);
    console.log(token);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getInventory = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


  exports.addToCart = async (req, res) => {
    try {
      const { userId } = req.params; 
      const { productId, quantity } = req.body;
      const user = await User.findById(userId); 
      const product = await Product.findById(productId);
  
      if (!product || product.quantity < quantity) {
        return res.status(400).json({ message: "Invalid product or insufficient quantity" });
      }
  
      const existingCartItem = user.cart.find((item) => item.product.equals(productId));
  
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        user.cart.push({ product: productId, quantity });
      }
  
      await user.save();
  
      res.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getUserCart = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user.cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.updateCartItemQuantity = async (req, res) => {
    try {
      const { userId } = req.params;
      const { productId, quantity } = req.body;
      const user = await User.findById(userId);
  
      const cartItem = user.cart.find((item) => item.product.equals(productId));
  
      if (cartItem) {
        cartItem.quantity = quantity;
        await user.save();
        res.status(200).json({ message: "Cart item quantity updated successfully" });
      } else {
        res.status(400).json({ message: "Item not found in the cart" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

exports.placeOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ message: "Invalid products data" });
    }
    for (const { productId, quantity } of products) {
      const product = await Product.findById(productId);

      if (!product || product.quantity < quantity) {
        return res.status(400).json({ message: "Invalid product or insufficient quantity" });
      }

      product.quantity -= quantity;
      await product.save();
    }
    
    const order = new Order({
      userId,
      products,
    });

    await order.save();

    for (const { productId } of products) {
      await Product.findByIdAndUpdate(productId, { $push: { orders: order._id } });
    }

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  
  exports.trackOrderStatus = async (req, res) => {
    try {
     
      res.status(200).json({ message: "Order status tracking logic goes here" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.updateOrderStatus = async (req, res) => {
    try {
      const { orderId, status } = req.body;
      await Order.findByIdAndUpdate(orderId, { $set: { status } });
      res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getOrderStatusForUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const orders = await Order.find({ userId }).populate("products.productId", "-_id -__v");
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

