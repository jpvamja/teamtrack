import Organization from "./organization.model.js";
import ApiError from "../../utils/apiError.js";
import { isValidObjectId } from "../../utils/objectId.js";

/**
 * Create organization
 */
const createOrganization = async ({ name, userId }) => {
  const organization = await Organization.create({
    name,
    owner: userId,
  });

  return organization;
};

/**
 * Get organization by ID (members only)
 */
const getOrganizationById = async ({ orgId, userId }) => {
  if (!isValidObjectId(orgId)) {
    throw ApiError.badRequest("Invalid organization ID");
  }

  const organization = await Organization.findById(orgId)
    .populate("owner", "name email")
    .populate("members.user", "name email")
    .lean();

  if (!organization) {
    throw ApiError.notFound("Organization not found");
  }

  const isMember = organization.members.some(
    (member) => member.user._id.toString() === userId
  );

  if (!isMember) {
    throw ApiError.forbidden("You are not a member of this organization");
  }

  return organization;
};

/**
 * Invite member (OWNER / ADMIN only)
 */
const inviteMember = async ({
  orgId,
  invitedUserId,
  requesterId,
}) => {
  if (
    !isValidObjectId(orgId) ||
    !isValidObjectId(invitedUserId)
  ) {
    throw ApiError.badRequest("Invalid ID provided");
  }

  const organization = await Organization.findById(orgId);

  if (!organization) {
    throw ApiError.notFound("Organization not found");
  }

  const requester = organization.members.find(
    (member) => member.user.toString() === requesterId
  );

  if (!requester) {
    throw ApiError.forbidden("You are not a member of this organization");
  }

  if (!["OWNER", "ADMIN"].includes(requester.role)) {
    throw ApiError.forbidden(
      "You do not have permission to invite members"
    );
  }

  const alreadyMember = organization.members.some(
    (member) => member.user.toString() === invitedUserId
  );

  if (alreadyMember) {
    throw ApiError.badRequest("User already a member");
  }

  organization.members.push({
    user: invitedUserId,
    role: "MEMBER",
  });

  await organization.save();

  return organization;
};

export {
  createOrganization,
  getOrganizationById,
  inviteMember,
};
