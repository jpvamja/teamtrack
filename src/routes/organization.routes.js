import validate from "../middlewares/validator.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import authMiddleware from "../middlewares/auth.middleware.js";

import {
  createOrganizationSchema,
  inviteMemberSchema,
} from "../modules/organization/organization.validation.js";

import {
  createOrganizationController,
  inviteOrganizationMemberController,
} from "../modules/organization/organization.controller.js";

const router = Router();

/**
 * Create organization
 * Any authenticated user can create an org
 */
router.post(
  "/",
  authMiddleware,
  validate(createOrganizationSchema),
  asyncHandler(createOrganizationController)
);

/**
 * Invite member to organization
 * Org-level authorization handled in service
 */
router.post(
  "/:orgId/invite",
  authMiddleware,
  validate(inviteMemberSchema),
  asyncHandler(inviteOrganizationMemberController)
);

export default router;
