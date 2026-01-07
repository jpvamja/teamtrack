import ApiResponse from "../../utils/apiResponse.js";
import {
    createOrganization,
    getOrganizationById,
    inviteMember,
} from "./organization.service.js";

const createOrg = async (req, res) => {
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

const getOrgById = async (req, res) => {
    const organization = await getOrganizationById({
        orgId: req.params.id,
        userId: req.user.userId,
    });

    return ApiResponse.success(
        res,
        organization,
        "Organization fetched successfully"
    );
};

const inviteOrgMember = async (req, res) => {
    const organization = await inviteMember({
        orgId: req.body.orgId,
        userId: req.body.userId,
    });

    return ApiResponse.success(
        res,
        organization,
        "Member added successfully"
    );
};

export {
    createOrg,
    getOrgById,
    inviteOrgMember,
};
