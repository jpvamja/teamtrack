import express from "express";

import asyncHandler from "../utils/asyncHandler.js";
import authMiddleware from "../middlewares/auth.middleware.js";

import {
    createTaskController,
    getTaskController,
    updateTaskController,
    deleteTaskController,
} from "../modules/task/task.controller.js";

const router = express.Router();

/**
 * =========================
 * Task Routes
 * =========================
 */

/**
 * Create task
 * Authenticated users only
 * (Role & project rules handled in service layer)
 */
router.post(
    "/",
    authMiddleware,
    asyncHandler(createTaskController)
);

/**
 * Get task by ID
 */
router.get(
    "/:id",
    authMiddleware,
    asyncHandler(getTaskController)
);

/**
 * Update task
 * (status / assignment rules enforced in service)
 */
router.patch(
    "/:id",
    authMiddleware,
    asyncHandler(updateTaskController)
);

/**
 * Delete task
 */
router.delete(
    "/:id",
    authMiddleware,
    asyncHandler(deleteTaskController)
);

export default router;
