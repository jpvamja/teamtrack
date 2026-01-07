import ApiError from "../utils/apiError.js";

const validate = (schema, property = "body") => {
  return async (req, res, next) => {
    try {
      const dataToValidate = req[property];

      if (!dataToValidate) {
        return next(
          ApiError.badRequest(`Missing request ${property}`)
        );
      }

      const { error, value } = schema.validate(dataToValidate, {
        abortEarly: false,   // return all errors
        stripUnknown: true,  // remove unexpected fields
        allowUnknown: false, // explicitly disallow unknown keys
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
    } catch (err) {
      next(err);
    }
  };
};

export default validate;
