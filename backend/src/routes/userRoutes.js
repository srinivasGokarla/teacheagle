
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const userController = require("../controllers/user.controller");
const productController = require("../controllers/product.controller");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/inventory", userController.getInventory);
router.post("/addToCart/:userId", userController.addToCart);
router.get("/:userId", userController.getUserCart);
router.put("/updateCartItem/:userId", userController.updateCartItemQuantity);
router.post("/placeOrder/:userId", userController.placeOrder);
router.get("/trackOrder/:userId", userController.trackOrderStatus);
router.put("/updateOrderStatus", userController.updateOrderStatus);
router.get("/orderStatus/:userId", userController.getOrderStatusForUser);


router.post("/addProduct", productController.addProduct);
router.put("/updateProductQuantity", productController.updateProductQuantity);
router.delete("/deleteProduct/:productId", productController.deleteProduct);

module.exports = router;
