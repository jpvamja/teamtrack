import Joi from "joi";

export const createCommentSchema = Joi.object({
  taskId: Joi.string().required(),
  content: Joi.string().trim().min(1).max(1000).required(),
});

export const getCommentsSchema = Joi.object({
  taskId: Joi.string().required(),
});
