const Transaction = require("../models/Transaction");
const { generateTransactionId } = require("../utils/idGenerator");
const { getRedisClient } = require("../utils/redisClient");

/**
 * WRITE PATH — NO REDIS HERE
 * MongoDB is the source of truth
 */
async function createPayment({ name, userId, amount, idempotencyKey }) {

  const existingTxn = await Transaction.findOne({ idempotencyKey });

  if (existingTxn) {
    return existingTxn;
  }

  const transaction = new Transaction({
    transactionId: generateTransactionId(),
    name,
    userId,
    amount,
    idempotencyKey,
    status: "SUCCESS"
  });

  await transaction.save();

  return transaction;
}

/**
 * READ PATH — READ-THROUGH CACHE
 * Redis is OPTIONAL
 */
async function getTransactionById(transactionId) {
  const redisClient = getRedisClient();
  const cacheKey = `txn:${transactionId}`;

  // 1. Try Redis (only if connected)
  if (redisClient) {
    const cachedTxn = await redisClient.get(cacheKey);
    if (cachedTxn) {
      console.log("⚡ Redis HIT");
      return JSON.parse(cachedTxn);
    }
  }

  // 2. MongoDB fallback
  console.log("🐢 MongoDB HIT");
  const txn = await Transaction.findOne({ transactionId });
  if (!txn) return null;

  // 3. Cache result (if Redis exists)
  if (redisClient) {
    await redisClient.setEx(
      cacheKey,
      300, // 5 minutes TTL
      JSON.stringify(txn)
    );
  }

  return txn;
}

async function getAllTransactions() {
  const transactions = await Transaction
    .find()
    .sort({ createdAt: -1 });

  return transactions;
}

module.exports = {
  createPayment,
  getTransactionById,
  getAllTransactions,
};
