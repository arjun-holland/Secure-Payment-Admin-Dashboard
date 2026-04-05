const express = require("express");
const router = express.Router();
const { getAllTransactionsController, deletePaymentController } = require("../controllers/adminController");
const { createPaymentController } = require("../controllers/paymentController");
//It imports only the createPaymentController function from the paymentController file so you can use it in this file.

const idempotencyMiddleware = require("../middlewares/idempotency");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/rbacMiddleware");
const { paymentRateLimiter } = require("../middlewares/rateLimiter");

router.post("/payments", authMiddleware, authorizeRoles("user"), paymentRateLimiter, idempotencyMiddleware, createPaymentController);
router.get("/payments", authMiddleware, authorizeRoles("admin"), getAllTransactionsController);
router.delete("/payments/:id", authMiddleware, authorizeRoles("admin"), deletePaymentController);

module.exports = router;
