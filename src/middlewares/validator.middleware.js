import ApiError from "../utils/apiError.js";

const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
    });

    if (error) {
      const formattedErrors = error.details.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return next(
        new ApiError(400, "Validation failed", formattedErrors)
      );
    }

    req[property] = value;
    next();
  };
};

export default validate;
