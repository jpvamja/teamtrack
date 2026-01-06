import ApiResponse from "../../utils/apiResponse.js";
import {
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
} from "./task.service.js";

const createTaskController = async (req, res) => {
    const task = await createTask({
        ...req.body,
        projectId: req.body.projectId,
        user: req.user,
    });

    return ApiResponse.created(res, task, "Task created");
};

const getTaskController = async (req, res) => {
    const task = await getTaskById({
        taskId: req.params.id,
        userId: req.user.userId,
    });

    return ApiResponse.success(res, task, "Task fetched");
};

const updateTaskController = async (req, res) => {
    const task = await updateTask({
        taskId: req.params.id,
        updates: req.body,
        user: req.user,
    });

    return ApiResponse.success(res, task, "Task updated");
};

const deleteTaskController = async (req, res) => {
    await deleteTask({
        taskId: req.params.id,
        user: req.user,
    });

    return ApiResponse.success(res, null, "Task deleted");
};

export {
    createTaskController,
    getTaskController,
    updateTaskController,
    deleteTaskController,
};
