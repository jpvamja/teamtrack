import Project from "./project.model.js";
import Organization from "../organization/organization.model.js";
import ApiError from "../../utils/apiError.js";
import { isValidObjectId } from "../../utils/objectId.js";

/**
 * Create project
 */
const createProject = async ({ name, description, organizationId, userId }) => {
    if (!isValidObjectId(organizationId)) {
        throw ApiError.badRequest("Invalid organization ID");
    }

    const organization = await Organization.findById(organizationId);

    if (!organization) {
        throw ApiError.notFound("Organization not found");
    }

    const isMember = organization.members?.some(
        (memberId) => memberId.toString() === userId
    );

    if (!isMember) {
        throw ApiError.forbidden(
            "You are not a member of this organization"
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
 * Get project by ID
 */
const getProjectById = async ({ projectId, userId }) => {
    if (!isValidObjectId(projectId)) {
        throw ApiError.badRequest("Invalid project ID");
    }

    const project = await Project.findById(projectId).populate("organization");

    if (!project) {
        throw ApiError.notFound("Project not found");
    }

    const isMember = project.organization.members?.some(
        (memberId) => memberId.toString() === userId
    );

    if (!isMember) {
        throw ApiError.forbidden("Access denied");
    }

    return project;
};

/**
 * List projects by organization
 */
const listProjectsByOrg = async ({ organizationId, userId }) => {
    if (!isValidObjectId(organizationId)) {
        throw ApiError.badRequest("Invalid organization ID");
    }

    const organization = await Organization.findById(organizationId);

    if (!organization) {
        throw ApiError.notFound("Organization not found");
    }

    const isMember = organization.members?.some(
        (memberId) => memberId.toString() === userId
    );

    if (!isMember) {
        throw ApiError.forbidden("Access denied");
    }

    return Project.find({ organization: organizationId });
};

export {
    createProject,
    getProjectById,
    listProjectsByOrg,
};
