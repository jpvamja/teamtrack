import ApiResponse from "../../utils/apiResponse.js";
import {
    createProject,
    getProjectById,
    listProjectsByOrg,
} from "./project.service.js";


const createProjectController = async (req, res) => {
    const project = await createProject({
        name: req.body.name,
        description: req.body.description,
        orgId: req.body.orgId,
        user: req.user,
    });

    return ApiResponse.created(res, project, "Project created successfully");
};

const getProjectController = async (req, res) => {
    const project = await getProjectById({
        projectId: req.params.id,
        userId: req.user.userId,
    });

    return ApiResponse.success(res, project, "Project fetched successfully");
};

const listProjectsController = async (req, res) => {
    const projects = await listProjectsByOrg({
        orgId: req.query.orgId,
        userId: req.user.userId,
    });

    return ApiResponse.success(res, projects, "Projects fetched successfully");
};

export {
    createProjectController,
    getProjectController,
    listProjectsController,
};
