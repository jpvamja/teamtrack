import ApiResponse from "../../utils/apiResponse.js";
import ApiError from "../../utils/apiError.js";

import {
  createOrganization,
  getOrganizationById,
  inviteMember,
} from "./organization.service.js";

/**
 * Create organization
 */
const createOrganizationController = async (req, res) => {
  const organization = await createOrganization({
    name: req.body.name,
    userId: req.user.userId,
  });

  return ApiResponse.created(
    res,
    organization,
    "Organization created successfully"
  );
};

/**
 * Get organization by ID (member-only)
 */
const getOrganizationController = async (req, res) => {
  const organization = await getOrganizationById({
    orgId: req.params.orgId,
    userId: req.user.userId,
  });

  return ApiResponse.success(
    res,
    organization,
    "Organization fetched successfully"
  );
};

/**
 * Invite member to organization (OWNER / ADMIN only)
 */
const inviteOrganizationMemberController = async (req, res) => {
  const { orgId } = req.params;
  const { userId: invitedUserId } = req.body;

  const organization = await inviteMember({
    orgId,
    invitedUserId,
    requesterId: req.user.userId,
  });

  return ApiResponse.success(
    res,
    organization,
    "Member invited successfully"
  );
};

export {
  createOrganizationController,
  getOrganizationController,
  inviteOrganizationMemberController,
};
