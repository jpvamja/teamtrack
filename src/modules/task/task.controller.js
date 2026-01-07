import ApiResponse from "../../utils/apiResponse.js";
import {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "./task.service.js";

/**
 * Create task
 */
const createTaskController = async (req, res) => {
  const task = await createTask({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
    projectId: req.body.projectId,
    assigneeId: req.body.assigneeId,
    userId: req.user.userId,
  });

  return ApiResponse.created(
    res,
    task,
    "Task created successfully"
  );
};

/**
 * Get task by ID
 */
const getTaskController = async (req, res) => {
  const task = await getTaskById({
    taskId: req.params.taskId,
    userId: req.user.userId,
  });

  return ApiResponse.success(
    res,
    task,
    "Task fetched successfully"
  );
};

/**
 * Update task
 */
const updateTaskController = async (req, res) => {
  const task = await updateTask({
    taskId: req.params.taskId,
    updates: req.body,
    userId: req.user.userId,
  });

  return ApiResponse.success(
    res,
    task,
    "Task updated successfully"
  );
};

/**
 * Delete task
 */
const deleteTaskController = async (req, res) => {
  await deleteTask({
    taskId: req.params.taskId,
    userId: req.user.userId,
  });

  return ApiResponse.success(
    res,
    null,
    "Task deleted successfully"
  );
};

export {
  createTaskController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
};
