import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validator.middleware.js";

import {
  createComment,
  fetchCommentsByTask,
} from "../modules/comment/comment.controller.js";

import {
  createCommentSchema,
  getCommentsSchema,
} from "../modules/comment/comment.validation.js";

const router = express.Router();

/**
 * =========================
 * Comment Routes (Task Scoped)
 * =========================
 */

/**
 * Create comment on a task
 * POST /tasks/:taskId/comments
 */
router.post(
  "/tasks/:taskId/comments",
  authMiddleware,
  validate(createCommentSchema, "body"),
  asyncHandler(createComment)
);

/**
 * Get comments for a task (paginated)
 * GET /tasks/:taskId/comments
 */
router.get(
  "/tasks/:taskId/comments",
  authMiddleware,
  validate(getCommentsSchema, "query"),
  asyncHandler(fetchCommentsByTask)
);

export default router;
