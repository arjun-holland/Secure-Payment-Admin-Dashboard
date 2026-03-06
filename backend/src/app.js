const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");   // ✅ ADD THIS
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const { initRedis } = require("./utils/redisClient");

(async () => {
  await initRedis();
})();

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: [
      "https://paymentadmindashboard-aakhnrh1x-arjuns-projects-eb45d837.vercel.app",
      "http://localhost:5173"
    ],
    credentials: true
  })
);

app.use(express.json());

// MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", paymentRoutes);

module.exports = app;
