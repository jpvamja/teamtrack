import express from "express";

import asyncHandler from "../utils/asyncHandler.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import ROLES from "../config/roles.js";

import {
    createProjectController,
    getProjectController,
    listProjectsController,
} from "../modules/project/project.controller.js";

const router = express.Router();

/**
 * =========================
 * Project Routes
 * =========================
 */

/**
 * Create project
 * ADMIN & OWNER only
 */
router.post(
    "/",
    authMiddleware,
    authorizeRoles(ROLES.ADMIN, ROLES.OWNER),
    asyncHandler(createProjectController)
);

/**
 * List projects (by org / membership)
 */
router.get(
    "/",
    authMiddleware,
    asyncHandler(listProjectsController)
);

/**
 * Get project by ID
 */
router.get(
    "/:id",
    authMiddleware,
    asyncHandler(getProjectController)
);

export default router;
