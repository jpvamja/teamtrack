import Project from "./project.model.js";
import Organization from "../organization/organization.model.js";
import ApiError from "../../utils/apiError.js";
import { isValidObjectId } from "../../utils/objectId.js";

/**
 * Create project (ORG OWNER / ADMIN only)
 */
const createProject = async ({
  name,
  description,
  organizationId,
  userId,
}) => {
  if (!isValidObjectId(organizationId)) {
    throw ApiError.badRequest("Invalid organization ID");
  }

  const organization = await Organization.findById(organizationId);

  if (!organization) {
    throw ApiError.notFound("Organization not found");
  }

  const requester = organization.members.find(
    (member) => member.user.toString() === userId
  );

  if (!requester) {
    throw ApiError.forbidden(
      "You are not a member of this organization"
    );
  }

  if (!["OWNER", "ADMIN"].includes(requester.role)) {
    throw ApiError.forbidden(
      "You do not have permission to create projects"
    );
  }

  const project = await Project.create({
    name,
    description,
    organization: organizationId,
    createdBy: userId,
  });

  return project;
};

/**
 * Get project by ID (PROJECT MEMBER only)
 */
const getProjectById = async ({ projectId, userId }) => {
  if (!isValidObjectId(projectId)) {
    throw ApiError.badRequest("Invalid project ID");
  }

  const project = await Project.findById(projectId)
    .populate("organization")
    .populate("members.user", "name email");

  if (!project || project.status !== "ACTIVE") {
    throw ApiError.notFound("Project not found");
  }

  const isProjectMember = project.members.some(
    (member) => member.user._id.toString() === userId
  );

  if (!isProjectMember) {
    throw ApiError.forbidden("Access denied");
  }

  return project;
};

/**
 * List projects by organization (ORG MEMBER only)
 */
const listProjectsByOrg = async ({
  organizationId,
  userId,
}) => {
  if (!isValidObjectId(organizationId)) {
    throw ApiError.badRequest("Invalid organization ID");
  }

  const organization = await Organization.findById(organizationId);

  if (!organization) {
    throw ApiError.notFound("Organization not found");
  }

  const isOrgMember = organization.members.some(
    (member) => member.user.toString() === userId
  );

  if (!isOrgMember) {
    throw ApiError.forbidden("Access denied");
  }

  return Project.find({
    organization: organizationId,
    status: "ACTIVE",
  }).lean();
};

export {
  createProject,
  getProjectById,
  listProjectsByOrg,
};
