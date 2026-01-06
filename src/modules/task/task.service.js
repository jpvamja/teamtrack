import Task from "./task.model.js";
import Project from "../project/project.model.js";
import ApiError from "../../utils/apiError.js";

const VALID_TRANSITIONS = {
    TODO: ["IN_PROGRESS"],
    IN_PROGRESS: ["DONE"],
    DONE: [],
};

const createTask = async ({ title, description, priority, dueDate, projectId, assignee, user }) => {
    const project = await Project.findById(projectId).populate("organization");

    if (!project) {
        throw ApiError.notFound("Project not found");
    }

    const isMember = project.organization.members.some(
        (member) => member.toString() === user.userId
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
        assignee,
        createdBy: user.userId,
    });
};

const getTaskById = async ({ taskId, userId }) => {
    const task = await Task.findById(taskId)
        .populate("project")
        .populate("assignee", "name email");

    if (!task) {
        throw ApiError.notFound("Task not found");
    }

    const isMember = task.project.organization.members.includes(userId);

    if (!isMember) {
        throw ApiError.forbidden("Access denied");
    }

    return task;
};

const updateTask = async ({ taskId, updates, user }) => {
    const task = await Task.findById(taskId).populate({
        path: "project",
        populate: { path: "organization" },
    });

    if (!task) {
        throw ApiError.notFound("Task not found");
    }

    const isMember = task.project.organization.members.some(
        (m) => m.toString() === user.userId
    );

    if (!isMember) {
        throw ApiError.forbidden("Access denied");
    }

    // Status update → assignee only
    if (updates.status && task.assignee?.toString() !== user.userId) {
        throw ApiError.forbidden("Only assignee can update status");
    }

    // Validate status transitions
    if (updates.status) {
        const allowed = VALID_TRANSITIONS[task.status];
        if (!allowed.includes(updates.status)) {
            throw ApiError.badRequest("Invalid status transition");
        }
    }

    // Reassign task → ADMIN / OWNER only
    if (updates.assignee && !["ADMIN", "OWNER"].includes(user.role)) {
        throw ApiError.forbidden("Only ADMIN or OWNER can reassign tasks");
    }

    Object.assign(task, updates);
    await task.save();

    return task;
};

const deleteTask = async ({ taskId, user }) => {
    const task = await Task.findById(taskId).populate({
        path: "project",
        populate: { path: "organization" },
    });

    if (!task) {
        throw ApiError.notFound("Task not found");
    }

    if (!["ADMIN", "OWNER"].includes(user.role)) {
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
