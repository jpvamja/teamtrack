import Joi from "joi";

/**
 * Create comment validation
 */
export const createCommentSchema = Joi.object({
    taskId: Joi.string().required(),
    content: Joi.string().trim().min(1).max(1000).required(),
});

/**
 * Get comments by task (query)
 */
export const getCommentsSchema = Joi.object({
    taskId: Joi.string().required(),
});
