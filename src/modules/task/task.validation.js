import Joi from "joi";
import { TASK_STATUS, TASK_PRIORITY } from "../../config/constants.js";

/**
 * Common MongoDB ObjectId validator
 */
const objectIdSchema = Joi.string()
  .length(24)
  .hex()
  .required();

/**
 * Create task validation
 */
export const createTaskSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(200)
    .trim()
    .required(),

  description: Joi.string()
    .max(1000)
    .trim()
    .allow("", null),

  projectId: objectIdSchema,

  assigneeId: Joi.string()
    .length(24)
    .hex()
    .optional(),

  dueDate: Joi.date()
    .greater("now")
    .optional(),

  priority: Joi.string()
    .valid(...Object.values(TASK_PRIORITY))
    .optional(),
});

/**
 * Update task validation (partial updates)
 */
export const updateTaskSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(200)
    .trim()
    .optional(),

  description: Joi.string()
    .max(1000)
    .trim()
    .allow("", null),

  status: Joi.string()
    .valid(...Object.values(TASK_STATUS))
    .optional(),

  priority: Joi.string()
    .valid(...Object.values(TASK_PRIORITY))
    .optional(),

  assigneeId: Joi.string()
    .length(24)
    .hex()
    .optional(),

  dueDate: Joi.date()
    .greater("now")
    .optional(),
}).min(1); // 🚨 prevent empty update payloads

/**
 * Task ID param validation
 */
export const taskIdParamSchema = Joi.object({
  taskId: objectIdSchema,
});
