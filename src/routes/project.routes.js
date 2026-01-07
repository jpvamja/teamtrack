import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import validate from "../middlewares/validator.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

import {
  createProjectSchema,
  getProjectSchema,
} from "../modules/project/project.validation.js";

import {
  createProjectController,
  getProjectController,
  listProjectsController,
} from "../modules/project/project.controller.js";

const router = Router();

/**
 * Create project (org-level authorization handled in service)
 */
router.post(
  "/",
  authMiddleware,
  validate(createProjectSchema),
  asyncHandler(createProjectController)
);

/**
 * List projects by organization
 */
router.get(
  "/organization/:organizationId",
  authMiddleware,
  asyncHandler(listProjectsController)
);

/**
 * Get project by ID
 */
router.get(
  "/:projectId",
  authMiddleware,
  validate(getProjectSchema, "params"),
  asyncHandler(getProjectController)
);

export default router;
