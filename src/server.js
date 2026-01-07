import app from "./app.js";
import connectDB, { closeDB } from "./config/db.js";
import env from "./config/env.js";
import logger from "./utils/logger.js";

let server;
let isShuttingDown = false;

// =========================
// Start Server
// =========================
const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(env.PORT, () => {
      logger.info(
        `🚀 Server running on port ${env.PORT} in ${env.NODE_ENV} mode`,
        {
          pid: process.pid,
          node: process.version,
        }
      );
    });
  } catch (error) {
    logger.error("❌ Failed to start server", {
      message: error.message,
      stack:
        env.NODE_ENV === "development"
          ? error.stack
          : undefined,
    });
    process.exit(1);
  }
};

/**
 * Graceful shutdown handler
 */
const shutdown = async (signal) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.info(`Received ${signal}. Shutting down gracefully...`);

  try {
    if (server) {
      await new Promise((resolve) =>
        server.close(resolve)
      );
      logger.info("HTTP server closed");
    }

    await closeDB();
  } catch (err) {
    logger.error("Error during shutdown", {
      message: err.message,
    });
  } finally {
    process.exit(0);
  }
};

/**
 * Process-level error handling
 */
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Promise Rejection", {
    reason,
  });
  shutdown("unhandledRejection");
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception", {
    message: error.message,
    stack: error.stack,
  });
  shutdown("uncaughtException");
});

startServer();
