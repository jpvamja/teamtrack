import ApiResponse from "../../utils/apiResponse.js";
import {
    addComment,
    getCommentsByTask,
} from "./comment.service.js";

/**
 * Create comment
 */
const createComment = async (req, res) => {
    const { content, taskId } = req.body;

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
 * Fetch comments by task
 */
const fetchCommentsByTask = async (req, res) => {
    const { taskId } = req.query;

    const comments = await getCommentsByTask({
        taskId,
        userId: req.user.userId,
        query: req.query,
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
