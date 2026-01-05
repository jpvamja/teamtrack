import express from "express";
import cors from "cors";

import routes from "./routes/index.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API Routes
app.use("/api/v1", routes);

// Global Error Handler
app.use(errorHandler);

export default app;
