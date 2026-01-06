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

router.post(
    "/",
    authMiddleware,
    asyncHandler(createTaskController)
);

router.get(
    "/:id",
    authMiddleware,
    asyncHandler(getTaskController)
);

router.patch(
    "/:id",
    authMiddleware,
    asyncHandler(updateTaskController)
);

router.delete(
    "/:id",
    authMiddleware,
    asyncHandler(deleteTaskController)
);

export default router;
