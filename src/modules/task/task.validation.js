import Joi from "joi";
import { TASK_STATUS, TASK_PRIORITY } from "../../config/constants.js";

/**
 * Create task validation
 */
export const createTaskSchema = Joi.object({
    title: Joi.string().min(2).max(200).required(),
    description: Joi.string().max(1000).allow("", null),
    projectId: Joi.string().required(),
    assigneeId: Joi.string().optional(),
    dueDate: Joi.date().greater("now").optional(),
    priority: Joi.string()
        .valid(...Object.values(TASK_PRIORITY))
        .optional(),
});

/**
 * Update task validation
 * (partial updates allowed)
 */
export const updateTaskSchema = Joi.object({
    title: Joi.string().min(2).max(200).optional(),
    description: Joi.string().max(1000).allow("", null),
    status: Joi.string()
        .valid(...Object.values(TASK_STATUS))
        .optional(),
    priority: Joi.string()
        .valid(...Object.values(TASK_PRIORITY))
        .optional(),
    assigneeId: Joi.string().optional(),
    dueDate: Joi.date().greater("now").optional(),
});

/**
 * Get / Delete task (params)
 */
export const taskIdParamSchema = Joi.object({
    id: Joi.string().required(),
});
