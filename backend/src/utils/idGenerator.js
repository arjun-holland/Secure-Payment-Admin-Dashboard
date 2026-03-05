//AIM : generates a short, random, URL-safe, collision-resistant transaction ID using cryptographically secure randomness.

const crypto = require("crypto");

const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generateTransactionId(length = 8) {
  const bytes = crypto.randomBytes(length);   //bytes = [63, 162, 25, 124, 136, 225, 4, 185]
  let id = "";

  for (let i = 0; i < length; i++) {
    id += BASE62[bytes[i] % 62];
  }

  return id;
}

module.exports = { generateTransactionId };

