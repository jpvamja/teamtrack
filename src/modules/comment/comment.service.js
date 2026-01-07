import Comment from "./comment.model.js";
import Task from "../task/task.model.js";
import Project from "../project/project.model.js";
import Organization from "../organization/organization.model.js";
import ApiError from "../../utils/apiError.js";
import { getPagination } from "../../utils/pagination.js";
import { isValidObjectId } from "../../utils/objectId.js";

/**
 * Add comment to a task
 */
export const addComment = async ({ content, taskId, userId }) => {
    if (!isValidObjectId(taskId)) {
        throw ApiError.badRequest("Invalid task ID");
    }

    const task = await Task.findById(taskId);
    if (!task) {
        throw ApiError.notFound("Task not found");
    }

    const project = await Project.findById(task.project);
    if (!project) {
        throw ApiError.notFound("Project not found");
    }

    const organization = await Organization.findById(project.organization);
    if (!organization) {
        throw ApiError.notFound("Organization not found");
    }

    const isMember = organization.members.some(
        (memberId) => memberId.toString() === userId
    );

    if (!isMember) {
        throw ApiError.forbidden(
            "You are not allowed to comment on this task"
        );
    }

    return Comment.create({
        content,
        task: taskId,
        author: userId,
    });
};

/**
 * Get comments for a task (paginated)
 */
export const getCommentsByTask = async ({ taskId, userId, query }) => {
    if (!isValidObjectId(taskId)) {
        throw ApiError.badRequest("Invalid task ID");
    }

    const task = await Task.findById(taskId);
    if (!task) {
        throw ApiError.notFound("Task not found");
    }

    const project = await Project.findById(task.project);
    if (!project) {
        throw ApiError.notFound("Project not found");
    }

    const organization = await Organization.findById(project.organization);
    if (!organization) {
        throw ApiError.notFound("Organization not found");
    }

    const isMember = organization.members.some(
        (memberId) => memberId.toString() === userId
    );

    if (!isMember) {
        throw ApiError.forbidden(
            "You are not allowed to view comments"
        );
    }

    const { limit, skip } = getPagination(query);

    return Comment.find({ task: taskId })
        .populate("author", "name email")
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(limit);
};
