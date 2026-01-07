import Comment from "./comment.model.js";
import Task from "../task/task.model.js";
import ApiError from "../../utils/apiError.js";
import { getPagination } from "../../utils/pagination.js";
import { isValidObjectId } from "../../utils/objectId.js";

/**
 * Add comment to a task (PROJECT MEMBER ONLY)
 */
export const addComment = async ({ content, taskId, userId }) => {
  if (!isValidObjectId(taskId)) {
    throw ApiError.badRequest("Invalid task ID");
  }

  const task = await Task.findOne({
    _id: taskId,
    isActive: true,
  }).populate({
    path: "project",
    populate: { path: "members.user" },
  });

  if (!task) {
    throw ApiError.notFound("Task not found");
  }

  const isProjectMember = task.project.members.some(
    (m) => m.user._id.toString() === userId
  );

  if (!isProjectMember) {
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
 * Get comments for a task (paginated, PROJECT MEMBER ONLY)
 */
export const getCommentsByTask = async ({
  taskId,
  userId,
  page = 1,
  limit = 20,
}) => {
  if (!isValidObjectId(taskId)) {
    throw ApiError.badRequest("Invalid task ID");
  }

  const task = await Task.findOne({
    _id: taskId,
    isActive: true,
  }).populate({
    path: "project",
    populate: { path: "members.user" },
  });

  if (!task) {
    throw ApiError.notFound("Task not found");
  }

  const isProjectMember = task.project.members.some(
    (m) => m.user._id.toString() === userId
  );

  if (!isProjectMember) {
    throw ApiError.forbidden(
      "You are not allowed to view comments"
    );
  }

  const { skip } = getPagination({ page, limit });

  return Comment.find({
    task: taskId,
    isActive: true,
  })
    .populate("author", "name email")
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);
};
