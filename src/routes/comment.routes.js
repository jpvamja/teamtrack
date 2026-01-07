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
 * Comment Routes
 * =========================
 */

// All comment routes require authentication
router.use(authMiddleware);

/**
 * Add comment to task
 */
router.post(
    "/",
    validate(createCommentSchema),
    asyncHandler(createComment)
);

/**
 * Get comments by task
 */
router.get(
    "/",
    validate(getCommentsSchema, "query"),
    asyncHandler(fetchCommentsByTask)
);

export default router;
