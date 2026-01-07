import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import routes from "./routes/index.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import requestIdMiddleware from "./middlewares/requestId.middleware.js";
import env from "./config/env.js";

const app = express();

/**
 * =========================
 * Global Middlewares
 * =========================
 */
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(
    cors({
        origin: "*", // restrict in production if needed
        credentials: true,
    })
);

app.use(helmet());

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: "Too many requests, please try again later",
    })
);

app.use(requestIdMiddleware);

/**
 * =========================
 * API Routes
 * =========================
 */
app.use("/api/v1", routes);

/**
 * =========================
 * Global Error Handler
 * (must be last)
 * =========================
 */
app.use(errorHandler);

export default app;
