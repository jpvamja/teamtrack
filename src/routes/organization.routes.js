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

router.post(
    "/",
    authMiddleware,
    authorizeRoles(ROLES.OWNER),
    asyncHandler(createOrg)
);

router.get(
    "/:id",
    authMiddleware,
    asyncHandler(getOrgById)
);

router.post(
    "/invite",
    authMiddleware,
    authorizeRoles(ROLES.OWNER, ROLES.ADMIN),
    asyncHandler(inviteOrgMember)
);

export default router;
