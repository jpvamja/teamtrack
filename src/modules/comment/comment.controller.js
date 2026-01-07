import ApiResponse from "../../utils/apiResponse.js";
import {
  addComment,
  getCommentsByTask,
} from "./comment.service.js";

/**
 * Create comment
 */
const createComment = async (req, res) => {
  const { content } = req.body;
  const { taskId } = req.params;

  const comment = await addComment({
    content,
    taskId,
    userId: req.user.userId,
  });

  return ApiResponse.created(
    res,
    comment,
    "Comment added successfully"
  );
};

/**
 * Fetch comments by task (paginated)
 */
const fetchCommentsByTask = async (req, res) => {
  const { taskId } = req.params;
  const { page, limit } = req.query;

  const comments = await getCommentsByTask({
    taskId,
    userId: req.user.userId,
    page,
    limit,
  });

  return ApiResponse.success(
    res,
    comments,
    "Comments fetched successfully"
  );
};

export {
  createComment,
  fetchCommentsByTask,
};
