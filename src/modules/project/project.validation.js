import Joi from "joi";

/**
 * Create project validation
 */
export const createProjectSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(500).allow("", null),
    organizationId: Joi.string().required(),
});

/**
 * Get project by ID (params)
 */
export const getProjectSchema = Joi.object({
    id: Joi.string().required(),
});

/**
 * List projects (query)
 * Optional filters for future scalability
 */
export const listProjectsSchema = Joi.object({
    organizationId: Joi.string().optional(),
});
