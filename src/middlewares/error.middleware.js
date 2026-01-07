import ApiError from "../utils/apiError.js";
import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  /**
   * =========================
   * Known error transformations
   * =========================
   */

  // Invalid ObjectId
  if (error.name === "CastError") {
    error = ApiError.badRequest("Invalid resource ID");
  }

  // Duplicate key error
  else if (error.code === 11000) {
    const field = Object.keys(error.keyValue || {})[0];
    error = ApiError.badRequest(`Duplicate value for ${field}`, [
      { field, message: "Already exists" },
    ]);
  }

  // Mongoose schema validation error
  else if (error.name === "ValidationError") {
    const errors = Object.values(error.errors || {}).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    error = ApiError.badRequest("Validation failed", errors);
  }

  // JWT errors
  else if (
    error.name === "JsonWebTokenError" ||
    error.name === "TokenExpiredError"
  ) {
    error = ApiError.unauthorized("Unauthorized");
  }

  /**
   * =========================
   * Normalize to ApiError
   * =========================
   */
  if (!(error instanceof ApiError)) {
    error = ApiError.internal(
      error.message || "Internal Server Error"
    );
  }

  /**
   * =========================
   * Logging
   * =========================
   */
  const logPayload = {
    message: error.message,
    statusCode: error.statusCode,
    method: req.method,
    path: req.originalUrl,
  };

  if (error.statusCode >= 500) {
    logger.error({ ...logPayload, stack: error.stack });
  } else {
    logger.warn(logPayload);
  }

  /**
   * =========================
   * Client response
   * =========================
   */
  const response = {
    success: false,
    message: error.message,
  };

  if (process.env.NODE_ENV === "development") {
    response.errors = error.errors || [];
    response.stack = error.stack;
  }

  res.status(error.statusCode).json(response);
};

export default errorHandler;
