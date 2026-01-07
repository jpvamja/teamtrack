import express from "express";

import authRoutes from "./auth.routes.js";
import testRoutes from "./test.routes.js";
import organizationRoutes from "./organization.routes.js";
import projectRoutes from "./project.routes.js";
import taskRoutes from "./task.routes.js";
import commentRoutes from "./comment.routes.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * =========================
 * Health Check
 * =========================
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

/**
 * =========================
 * Authenticated user info
 * =========================
 */
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

/**
 * =========================
 * Route Mounting
 * =========================
 */

// Auth
router.use("/auth", authRoutes);

// Organizations
router.use("/organizations", organizationRoutes);

// Projects
router.use("/projects", projectRoutes);

// Tasks
router.use("/tasks", taskRoutes);

// Comments (task-scoped routes inside)
router.use("/", commentRoutes);

// Test routes (DEV only)
if (process.env.NODE_ENV !== "production") {
  router.use("/test", testRoutes);
}

export default router;
