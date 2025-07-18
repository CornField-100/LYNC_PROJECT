const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth");
const { validateUserInput, validatePassword } = require("../middleware/validation");
const {
  getDashboardStats,
  getAllUsers,
  createUser,
  getUserCreationStats,
  promoteToAdmin,
  demoteToUser,
  deleteUser,
  getAllProductsAdmin,
  getAllInvoicesAdmin,
  updateProductStock,
  getSalesAnalytics,
} = require("../controllers/adminController");
const { getAllOrders, getOrderById, getOrderStats, updateOrderStatus, deleteOrder, sendOrderNotification } = require("../controllers/orderController");

// All admin routes require authentication and admin role
router.use(verifyToken, isAdmin);

// Dashboard routes
router.get("/dashboard", getDashboardStats);
router.get("/analytics", getSalesAnalytics);

// User management routes
router.get("/users", getAllUsers);
router.get("/users/stats", getUserCreationStats);
router.post("/users", validateUserInput, validatePassword, createUser);
router.put("/users/:userId/promote", promoteToAdmin);
router.put("/users/:userId/demote", demoteToUser);
router.delete("/users/:userId", deleteUser);

// Product management routes
router.get("/products", getAllProductsAdmin);
router.put("/products/:productId/stock", updateProductStock);

// Invoice management routes
router.get("/invoices", getAllInvoicesAdmin);

// Order management routes
router.get("/orders", getAllOrders);
router.get("/orders/stats", getOrderStats);
router.get("/orders/:orderId", getOrderById);
router.patch("/orders/:orderId", updateOrderStatus);
router.post("/orders/:orderId/notify", sendOrderNotification);
router.delete("/orders/:orderId", deleteOrder);

module.exports = router;
