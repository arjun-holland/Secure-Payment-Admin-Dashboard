const { getAllTransactions, deletePayment } = require("../services/paymentService");

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

async function deletePaymentController(req, res) {
  try {
    const { id } = req.params;
    const deletedTransaction = await deletePayment(id);

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.json({
      success: true,
      message: "Transaction deleted successfully",
      data: deletedTransaction
    });

  } catch (err) {
    console.error("Error deleting transaction:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getAllTransactionsController,
  deletePaymentController
};