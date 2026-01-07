import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";
import logger from "./utils/logger.js";

// =========================
// Start Server
// =========================
const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(env.PORT, () => {
            logger.info(
                `🚀 Server running on port ${env.PORT} in ${env.NODE_ENV} mode`
            );
        });

        /**
         * Graceful shutdown
         */
        const shutdown = (signal) => {
            logger.info(`Received ${signal}. Shutting down gracefully...`);
            server.close(() => {
                logger.info("HTTP server closed");
                process.exit(0);
            });
        };

        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);
    } catch (error) {
        logger.error("❌ Failed to start server", {
            message: error.message,
        });
        process.exit(1);
    }
};

startServer();
