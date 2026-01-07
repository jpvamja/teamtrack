import Joi from "joi";

/**
 * Common password rules
 */
const passwordSchema = Joi.string()
  .min(8)
  .max(128)
  .pattern(
    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])")
  )
  .message(
    "Password must contain uppercase, lowercase, number, and special character"
  )
  .required();

/**
 * Register validation
 */
export const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .pattern(/^[a-zA-Z\s]+$/)
    .message("Name must contain only letters and spaces")
    .required(),

  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required(),

  password: passwordSchema,
});

/**
 * Login validation
 */
export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required(),

  password: Joi.string().required(),
});
