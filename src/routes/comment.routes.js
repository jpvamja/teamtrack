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

router.post(
    "/",
    authMiddleware,
    validate(createCommentSchema),
    asyncHandler(createComment)
);

router.get(
    "/",
    authMiddleware,
    validate(getCommentsSchema, "query"),
    asyncHandler(fetchCommentsByTask)
);


export default router;
