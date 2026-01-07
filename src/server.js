import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";
import logger from "./utils/logger.js";

// DB Connection & Server Starter
connectDB()
    .then(() => {
        app.listen(env.PORT, () => {
            logger.info(`🚀 Server running on port ${env.PORT}`);
            console.log(
                `App listening on port ${env.PORT} using ${env.NODE_ENV} environment.`
            );
            console.log(`Visit : http://localhost:${env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("Server not start.");
        process.exit(1);
    });
