import Comment from "./comment.model.js";
import Task from "../task/task.model.js";
import Project from "../project/project.model.js";
import ApiError from "../../utils/apiError.js";
import  getPagination  from "../../utils/pagination.js";

export const addComment = async ({ content, taskId, userId }) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const project = await Project.findById(task.project);
  const isMember = project.members.some(
    (m) => m.user.toString() === userId
  );

  if (!isMember) {
    throw new ApiError(403, "You are not allowed to comment on this task");
  }

  return Comment.create({
    content,
    task: taskId,
    author: userId,
  });
};

export const getCommentsByTask = async ({ taskId, userId, query }) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const { limit, skip } = getPagination(query);

  const project = await Project.findById(task.project);
  const isMember = project.members.some(
    (m) => m.user.toString() === userId
  );

  if (!isMember) {
    throw new ApiError(403, "You are not allowed to view comments");
  }

  return Comment.find({ task: taskId })
    .populate("author", "name email")
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);
};
