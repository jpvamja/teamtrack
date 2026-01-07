import asyncHandler from "../../utils/asyncHandler.js";
import {
  addComment,
  getCommentsByTask,
} from "./comment.service.js";

export const createComment = asyncHandler(async (req, res) => {
  const { content, taskId } = req.body;

  const comment = await addComment({
    content,
    taskId,
    userId: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: comment,
  });
});

export const fetchCommentsByTask = asyncHandler(async (req, res) => {
  const { taskId } = req.query;

  const comments = await getCommentsByTask({
    taskId,
    userId: req.user._id,
  });

  res.status(200).json({
    success: true,
    data: comments,
  });
});
