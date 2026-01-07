import ApiError from "../utils/apiError.js";
import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
    let error = err;

    /**
     * =========================
     * Normalize to ApiError
     * =========================
     */
    if (!(error instanceof ApiError)) {
        error = ApiError.internal(error.message || "Internal Server Error");
    }

    /**
     * =========================
     * Mongoose specific errors
     * =========================
     */

    // Invalid ObjectId
    if (err.name === "CastError") {
        error = ApiError.badRequest("Invalid resource ID");
    }

    // Duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0];
        error = ApiError.badRequest(`Duplicate value for ${field}`, [
            { field, message: "Already exists" },
        ]);
    }

    // Schema validation error
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors || {}).map((e) => ({
            field: e.path,
            message: e.message,
        }));
        error = ApiError.badRequest("Validation failed", errors);
    }

    /**
     * =========================
     * Logging (always log full error)
     * =========================
     */
    logger.error({
        message: error.message,
        statusCode: error.statusCode,
        path: req.originalUrl,
        method: req.method,
        stack: error.stack,
    });

    /**
     * =========================
     * Client response
     * =========================
     */
    const response = {
        success: false,
        message: error.message,
    };

    // Show detailed errors only in development
    if (process.env.NODE_ENV === "development") {
        response.errors = error.errors || [];
        response.stack = error.stack;
    }

    res.status(error.statusCode).json(response);
};

export default errorHandler;
