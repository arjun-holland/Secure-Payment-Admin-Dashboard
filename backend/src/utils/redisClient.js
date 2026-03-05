const redis = require("redis");

let redisClient = null;

async function initRedis() {
  if (!process.env.REDIS_URL) {
    console.log("⚠️ Redis disabled (REDIS_URL not set)");
    return null;
  }

  try {
    const client = redis.createClient({
      url: process.env.REDIS_URL
    });

    client.on("error", (err) => {
      console.error("❌ Redis Error:", err.message);
    });

    await client.connect();
    console.log("✅ Redis connected");

    redisClient = client;
    return redisClient;
  } catch (err) {
    console.error("❌ Redis connection failed, continuing without cache");
    return null;
  }
}

function getRedisClient() {
  return redisClient;
}

module.exports = {
  initRedis,
  getRedisClient
};
