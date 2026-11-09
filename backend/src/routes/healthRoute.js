import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => {
  const isMongoDBConnected = mongoose.connection.readyState === 1;
  const status = isMongoDBConnected ? 200 : 503;

  res.status(status).json({
    status: isMongoDBConnected ? "ok" : "error",
    uptime: process.uptime(),
    db: isMongoDBConnected ? "connected" : "down",
  });
});

export default router
