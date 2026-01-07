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
router.use("/auth", authRoutes);
router.use("/test", testRoutes);
router.use("/org", organizationRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/comments", commentRoutes);

export default router;
