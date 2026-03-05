const { getAllTransactions } = require("../services/paymentService");

async function getAllTransactionsController(req, res) {
  try {
    const transactions = await getAllTransactions();

    return res.json({
      success: true,
      data: transactions
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getAllTransactionsController
};