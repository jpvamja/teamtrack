import Project from "./project.model.js";
import Organization from "../organization/organization.model.js";
import ApiError from "../../utils/apiError.js";

const createProject = async ({ name, description, orgId, user }) => {
    if (!name || !orgId) {
        throw ApiError.badRequest("Project name and organization are required");
    }

    const organization = await Organization.findById(orgId);

    if (!organization) {
        throw ApiError.notFound("Organization not found");
    }

    const isMember = organization.members.some(
        (member) => member.toString() === user.userId
    );

    if (!isMember) {
        throw ApiError.forbidden("You are not a member of this organization");
    }

    const project = await Project.create({
        name,
        description,
        organization: orgId,
        createdBy: user.userId,
    });

    return project;
};

const getProjectById = async ({ projectId, userId }) => {
    const project = await Project.findById(projectId).populate("organization");

    if (!project) {
        throw ApiError.notFound("Project not found");
    }

    const isMember = project.organization.members.some(
        (member) => member.toString() === userId
    );

    if (!isMember) {
        throw ApiError.forbidden("Access denied");
    }

    return project;
};

const listProjectsByOrg = async ({ orgId, userId }) => {
    const organization = await Organization.findById(orgId);

    if (!organization) {
        throw ApiError.notFound("Organization not found");
    }

    const isMember = organization.members.some(
        (member) => member.toString() === userId
    );

    if (!isMember) {
        throw ApiError.forbidden("Access denied");
    }

    return Project.find({ organization: orgId });
};

export {
    createProject,
    getProjectById,
    listProjectsByOrg,
};
