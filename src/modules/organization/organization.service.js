import Organization from "./organization.model.js";
import ApiError from "../../utils/apiError.js";

const createOrganization = async ({ name, userId }) => {
    if (!name) {
        throw ApiError.badRequest("Organization name is required");
    }

    const organization = await Organization.create({
        name,
        owner: userId,
        members: [userId], // owner is also a member
    });

    return organization;
};

const getOrganizationById = async ({ orgId, userId }) => {
    const organization = await Organization.findById(orgId)
        .populate("owner", "name email")
        .populate("members", "name email");

    if (!organization) {
        throw ApiError.notFound("Organization not found");
    }

    const isMember = organization.members.some(
        (member) => member._id.toString() === userId
    );

    if (!isMember) {
        throw ApiError.forbidden("You are not a member of this organization");
    }

    return organization;
};

const inviteMember = async ({ orgId, userId }) => {
    const organization = await Organization.findById(orgId);

    if (!organization) {
        throw ApiError.notFound("Organization not found");
    }

    const alreadyMember = organization.members.includes(userId);

    if (alreadyMember) {
        throw ApiError.badRequest("User already a member");
    }

    organization.members.push(userId);
    await organization.save();

    return organization;
};

export {
    createOrganization,
    getOrganizationById,
    inviteMember,
};
