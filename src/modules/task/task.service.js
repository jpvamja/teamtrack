import Task from "./task.model.js";
import Project from "../project/project.model.js";
import ApiError from "../../utils/apiError.js";
import { isValidObjectId } from "../../utils/objectId.js";
import { TASK_STATUS } from "../../config/constants.js";

/**
 * Allowed task status transitions
 */
const VALID_TRANSITIONS = {
    [TASK_STATUS.TODO]: [TASK_STATUS.IN_PROGRESS],
    [TASK_STATUS.IN_PROGRESS]: [TASK_STATUS.DONE],
    [TASK_STATUS.DONE]: [],
};

/**
 * Create task
 */
const createTask = async ({
    title,
    description,
    priority,
    dueDate,
    projectId,
    assigneeId,
    userId,
}) => {
    if (!isValidObjectId(projectId)) {
        throw ApiError.badRequest("Invalid project ID");
    }

    const project = await Project.findById(projectId).populate("organization");

    if (!project) {
        throw ApiError.notFound("Project not found");
    }

    const isMember = project.organization.members.some(
        (memberId) => memberId.toString() === userId
    );

    if (!isMember) {
        throw ApiError.forbidden("You are not a project member");
    }

    return Task.create({
        title,
        description,
        priority,
        dueDate,
        project: projectId,
        assignee: assigneeId,
        createdBy: userId,
    });
};

/**
 * Get task by ID
 */
const getTaskById = async ({ taskId, userId }) => {
    if (!isValidObjectId(taskId)) {
        throw ApiError.badRequest("Invalid task ID");
    }

    const task = await Task.findById(taskId)
        .populate({
            path: "project",
            populate: { path: "organization" },
        })
        .populate("assignee", "name email");

    if (!task) {
        throw ApiError.notFound("Task not found");
    }

    const isMember = task.project.organization.members.some(
        (memberId) => memberId.toString() === userId
    );

    if (!isMember) {
        throw ApiError.forbidden("Access denied");
    }

    return task;
};

/**
 * Update task
 */
const updateTask = async ({ taskId, updates, userId, role }) => {
    if (!isValidObjectId(taskId)) {
        throw ApiError.badRequest("Invalid task ID");
    }

    const task = await Task.findById(taskId).populate({
        path: "project",
        populate: { path: "organization" },
    });

    if (!task) {
        throw ApiError.notFound("Task not found");
    }

    const isMember = task.project.organization.members.some(
        (memberId) => memberId.toString() === userId
    );

    if (!isMember) {
        throw ApiError.forbidden("Access denied");
    }

    // Status update → assignee only
    if (updates.status && task.assignee?.toString() !== userId) {
        throw ApiError.forbidden("Only assignee can update status");
    }

    // Validate status transition
    if (updates.status) {
        const allowed = VALID_TRANSITIONS[task.status];
        if (!allowed.includes(updates.status)) {
            throw ApiError.badRequest("Invalid status transition");
        }
    }

    // Reassign task → ADMIN / OWNER only
    if (updates.assignee && !["ADMIN", "OWNER"].includes(role)) {
        throw ApiError.forbidden("Only ADMIN or OWNER can reassign tasks");
    }

    Object.assign(task, updates);
    await task.save();

    return task;
};

/**
 * Delete task
 */
const deleteTask = async ({ taskId, userId, role }) => {
    if (!isValidObjectId(taskId)) {
        throw ApiError.badRequest("Invalid task ID");
    }

    const task = await Task.findById(taskId).populate({
        path: "project",
        populate: { path: "organization" },
    });

    if (!task) {
        throw ApiError.notFound("Task not found");
    }

    const isMember = task.project.organization.members.some(
        (memberId) => memberId.toString() === userId
    );

    if (!isMember) {
        throw ApiError.forbidden("Access denied");
    }

    if (!["ADMIN", "OWNER"].includes(role)) {
        throw ApiError.forbidden("Only ADMIN or OWNER can delete tasks");
    }

    await task.deleteOne();
};

export {
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
};
