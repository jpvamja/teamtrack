import ApiError from "../utils/apiError.js";

/**
 * Validate request data using Joi schema
 * @param {Object} schema - Joi validation schema
 * @param {"body"|"query"|"params"} property - Request property to validate
 */
const validate = (schema, property = "body") => {
    return (req, res, next) => {
        const dataToValidate = req[property];

        const { error, value } = schema.validate(dataToValidate, {
            abortEarly: false, // return all errors
            stripUnknown: true, // remove unexpected fields
        });

        if (error) {
            const formattedErrors = error.details.map((detail) => ({
                field: detail.path.join("."),
                message: detail.message,
            }));

            return next(
                ApiError.badRequest("Validation failed", formattedErrors)
            );
        }

        // Replace request data with validated & sanitized data
        req[property] = value;
        next();
    };
};

export default validate;
