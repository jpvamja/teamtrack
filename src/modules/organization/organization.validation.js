import Joi from "joi";

/**
 * Common MongoDB ObjectId validator
 */
const objectIdSchema = Joi.string()
  .length(24)
  .hex()
  .required();

/**
 * Create organization
 */
export const createOrganizationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .trim()
    .pattern(/^[a-zA-Z0-9\s-_]+$/)
    .message("Organization name contains invalid characters")
    .required(),
});

/**
 * Invite member to organization
 */
export const inviteMemberSchema = Joi.object({
  orgId: objectIdSchema,
  userId: objectIdSchema,
});
