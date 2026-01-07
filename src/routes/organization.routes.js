import express from "express";

import asyncHandler from "../utils/asyncHandler.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import ROLES from "../config/roles.js";

import {
    createOrg,
    getOrgById,
    inviteOrgMember,
} from "../modules/organization/organization.controller.js";

const router = express.Router();

/**
 * =========================
 * Organization Routes
 * =========================
 */

/**
 * Create organization
 * Only OWNER can create org
 */
router.post(
    "/",
    authMiddleware,
    authorizeRoles(ROLES.OWNER),
    asyncHandler(createOrg)
);

/**
 * Get organization by ID
 * Any authenticated member can view
 */
router.get(
    "/:id",
    authMiddleware,
    asyncHandler(getOrgById)
);

/**
 * Invite member to organization
 * OWNER & ADMIN allowed
 */
router.post(
    "/invite",
    authMiddleware,
    authorizeRoles(ROLES.OWNER, ROLES.ADMIN),
    asyncHandler(inviteOrgMember)
);

export default router;
