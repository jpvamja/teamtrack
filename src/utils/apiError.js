class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    /**
     * Marks error as expected / operational
     * Useful for logging & crash decisions
     */
    this.isOperational = true;

    // Capture stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    // Optional: prevent mutation
    Object.freeze(this);
  }

  /**
   * 400 - Bad Request
   */
  static badRequest(message = "Bad Request", errors = []) {
    return new ApiError(400, message, errors);
  }

  /**
   * 401 - Unauthorized
   */
  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  /**
   * 403 - Forbidden
   */
  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  /**
   * 404 - Not Found
   */
  static notFound(message = "Not Found") {
    return new ApiError(404, message);
  }

  /**
   * 409 - Conflict
   */
  static conflict(message = "Conflict") {
    return new ApiError(409, message);
  }

  /**
   * 500 - Internal Server Error
   */
  static internal(message = "Internal Server Error") {
    return new ApiError(500, message);
  }

  /**
   * Safe JSON representation
   */
  toJSON() {
    return {
      success: false,
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
    };
  }
}

export default ApiError;
