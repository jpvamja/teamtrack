import ApiResponse from "../../utils/apiResponse.js";
import {
    createProject,
    getProjectById,
    listProjectsByOrg,
} from "./project.service.js";

/**
 * Create project
 */
const createProjectController = async (req, res) => {
    const project = await createProject({
        name: req.body.name,
        description: req.body.description,
        organizationId: req.body.organizationId,
        userId: req.user.userId,
    });

    return ApiResponse.created(
        res,
        project,
        "Project created successfully"
    );
};

/**
 * Get project by ID
 */
const getProjectController = async (req, res) => {
    const project = await getProjectById({
        projectId: req.params.id,
        userId: req.user.userId,
    });

    return ApiResponse.success(
        res,
        project,
        "Project fetched successfully"
    );
};

/**
 * List projects by organization
 */
const listProjectsController = async (req, res) => {
    const projects = await listProjectsByOrg({
        organizationId: req.query.organizationId,
        userId: req.user.userId,
    });

    return ApiResponse.success(
        res,
        projects,
        "Projects fetched successfully"
    );
};

export {
    createProjectController,
    getProjectController,
    listProjectsController,
};
