import mongoose from "mongoose";
import env from "./env.js";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    mongoose.connection.on("connected", () => {
      logger.info("MongoDB connection established");
    });

    mongoose.connection.on("error", (err) => {
      logger.error("MongoDB connection error", {
        message: err.message,
      });
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });

    await mongoose.connect(env.MONGO_URI);

    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection failed", {
      message: error.message,
      stack:
        env.NODE_ENV === "development"
          ? error.stack
          : undefined,
    });

    // Fail fast
    process.exit(1);
  }
};

/**
 * Graceful shutdown
 */
const closeDB = async () => {
  try {
    await mongoose.connection.close();
    logger.info("MongoDB connection closed");
  } catch (err) {
    logger.error("Error closing MongoDB connection", {
      message: err.message,
    });
  }
};

process.on("SIGINT", closeDB);
process.on("SIGTERM", closeDB);

export default connectDB;
