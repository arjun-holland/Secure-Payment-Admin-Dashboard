const { createPayment, getTransactionById } = require("../services/paymentService");

/**
 * CREATE PAYMENT (POST /payments)
 * Idempotency enforced via middleware
 */
async function createPaymentController(req, res) {
  try {
    const { name, userId, amount } = req.body;
    const idempotencyKey = req.idempotencyKey;

    // Validation
    if (!name || !userId || !amount) {
      return res.status(400).json({
        message: "Name, userId and amount are required"
      });
    }

    const transaction = await createPayment({
      name,
      userId,
      amount,
      idempotencyKey
    });

    return res.status(201).json({
      transactionId: transaction.transactionId,
      name: transaction.name,
      userId: transaction.userId,
      amount: transaction.amount,
      status: transaction.status,
      idempotencyKey: transaction.idempotencyKey
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

/**
 * GET PAYMENT (GET /payments/:transactionId)
 * Read-through Redis cache
 */
async function getPaymentController(req, res) {
  try {
    const { transactionId } = req.params;

    const txn = await getTransactionById(transactionId);

    if (!txn) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    return res.json({
      transactionId: txn.transactionId,
      name: txn.name,
      userId: txn.userId,
      amount: txn.amount,
      status: txn.status,
      idempotencyKey: txn.idempotencyKey
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

module.exports = {
  createPaymentController,
  getPaymentController
};