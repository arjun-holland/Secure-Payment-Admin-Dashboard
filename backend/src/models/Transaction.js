const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true
    },
    idempotencyKey: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);  //"Transaction" is the MODEL NAME.


