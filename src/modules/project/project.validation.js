import Joi from "joi";

/**
 * Common MongoDB ObjectId validator
 */
const objectIdSchema = Joi.string()
  .length(24)
  .hex()
  .required();

/**
 * Create project validation
 */
export const createProjectSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .trim()
    .pattern(/^[a-zA-Z0-9\s-_]+$/)
    .message("Project name contains invalid characters")
    .required(),

  description: Joi.string()
    .max(500)
    .trim()
    .allow("", null),

  organizationId: objectIdSchema,
});

/**
 * Get project by ID (params)
 */
export const getProjectSchema = Joi.object({
  projectId: objectIdSchema,
});

/**
 * List projects (query)
 */
export const listProjectsSchema = Joi.object({
  organizationId: Joi.string()
    .length(24)
    .hex()
    .optional(),
});
