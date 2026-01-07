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
 * App config
 * =========================
 */
app.set("trust proxy", 1); // required behind proxies

/**
 * =========================
 * Global Middlewares
 * =========================
 */
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

/**
 * CORS
 */
app.use(
  cors({
    origin:
      env.NODE_ENV === "production"
        ? ["https://your-frontend.com"] // replace later
        : "*",
    credentials: env.NODE_ENV === "production",
  })
);

app.use(helmet());

/**
 * Global rate limiter
 */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(globalLimiter);

/**
 * Request ID (after rate limiting)
 */
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
 * =========================
 */
app.use(errorHandler);

export default app;
