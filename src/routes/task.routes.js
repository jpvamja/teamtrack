import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import validate from "../middlewares/validator.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

import {
  createTaskSchema,
  updateTaskSchema,
  taskIdParamSchema,
} from "../modules/task/task.validation.js";

import {
  createTaskController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
} from "../modules/task/task.controller.js";

const router = Router();

/**
 * Create task
 */
router.post(
  "/",
  authMiddleware,
  validate(createTaskSchema),
  asyncHandler(createTaskController)
);

/**
 * Get task by ID
 */
router.get(
  "/:taskId",
  authMiddleware,
  validate(taskIdParamSchema, "params"),
  asyncHandler(getTaskController)
);

/**
 * Update task
 */
router.patch(
  "/:taskId",
  authMiddleware,
  validate(taskIdParamSchema, "params"),
  validate(updateTaskSchema),
  asyncHandler(updateTaskController)
);

/**
 * Delete task
 */
router.delete(
  "/:taskId",
  authMiddleware,
  validate(taskIdParamSchema, "params"),
  asyncHandler(deleteTaskController)
);

export default router;
