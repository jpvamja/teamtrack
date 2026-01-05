import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import ROLES from "../config/roles.js";

import {
    createProjectController,
    getProjectController,
    listProjectsController,
} from "../modules/project/project.controller.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    authorizeRoles(ROLES.ADMIN, ROLES.OWNER),
    asyncHandler(createProjectController)
);

router.get(
    "/:id",
    authMiddleware,
    asyncHandler(getProjectController)
);

router.get(
    "/",
    authMiddleware,
    asyncHandler(listProjectsController)
);

export default router;
