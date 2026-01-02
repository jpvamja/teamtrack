import ApiError from "../utils/apierror.js";

const errorHandler = (err, req, res, next) => {
    let error = err;

    // Convert unknown errors to ApiError
    if (!(error instanceof ApiError)) {
        error = ApiError.internal(error.message || "Internal Server Error");
    }

    const statusCode = error.statusCode || 500;

    // Mongoose: invalid ObjectId
    if (error.name === "CastError") {
        error = ApiError.badRequest("Invalid resource ID");
    }

    // Mongoose: duplicate key
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        error = ApiError.badRequest(`Duplicate value for ${field}`, [
            { field, message: "Already exists" },
        ]);
    }

    // Mongoose: validation error
    if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((e) => ({
            field: e.path,
            message: e.message,
        }));
        error = ApiError.badRequest("Validation failed", errors);
    }

    const response = {
        success: false,
        statusCode: error.statusCode,
        message: error.message,
    };

    // Expose stack only in development
    if (process.env.NODE_ENV === "development") {
        response.errors = error.errors || [];
        response.stack = error.stack;
    }

    res.status(statusCode).json(response);
};

export default errorHandler;
