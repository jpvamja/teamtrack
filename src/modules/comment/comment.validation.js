import Joi from "joi";

/**
 * Common MongoDB ObjectId validator
 */
const objectIdSchema = Joi.string()
  .length(24)
  .hex()
  .required();

/**
 * Create comment validation
 */
export const createCommentSchema = Joi.object({
  taskId: objectIdSchema,

  content: Joi.string()
    .trim()
    .min(1)
    .max(1000)
    .required(),
});

/**
 * Get comments by task (query)
 */
export const getCommentsSchema = Joi.object({
  taskId: objectIdSchema,

  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(50)
    .default(20),
});
