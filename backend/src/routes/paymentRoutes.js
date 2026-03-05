const express = require("express");
const router = express.Router();
const { getAllTransactionsController } = require("../controllers/adminController");
const { createPaymentController } = require("../controllers/paymentController");    
//It imports only the createPaymentController function from the paymentController file so you can use it in this file.

const idempotencyMiddleware = require("../middlewares/idempotency");

router.post("/payments", idempotencyMiddleware, createPaymentController);
router.get("/payments", getAllTransactionsController);

module.exports = router;
