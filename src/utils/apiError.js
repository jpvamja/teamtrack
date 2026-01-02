class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);

        this.statusCode = statusCode; // HTTP status code
        this.message = message; // Error message
        this.errors = errors; // Validation errors (if any)
        this.success = false; // Always false for errors

        // Capture stack trace (useful in dev)
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    // Invalid client request (400)
    static badRequest(message = "Bad Request", errors = []) {
        return new ApiError(400, message, errors);
    }

    // Unauthorized (401)
    static unauthorized(message = "Unauthorized") {
        return new ApiError(401, message);
    }

    // Forbidden (403)
    static forbidden(message = "Forbidden") {
        return new ApiError(403, message);
    }

    // Not Found (404)
    static notFound(message = "Not Found") {
        return new ApiError(404, message);
    }

    // Internal Server Error (500)
    static internal(message = "Internal Server Error") {
        return new ApiError(500, message);
    }
}

export default ApiError;

// How to use
// throw ApiError.notFound("User not found");
