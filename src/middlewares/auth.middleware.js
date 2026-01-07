import ApiError from "../utils/apiError.js";
import { verifyToken } from "../utils/jwt.js";

/**
 * Authentication middleware
 * Verifies JWT access token and attaches user payload to request
 */
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(ApiError.unauthorized("Access token missing"));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);

        // Attach decoded token payload to request
        req.user = decoded;

        next();
    } catch (error) {
        return next(ApiError.unauthorized("Invalid or expired token"));
    }
};

export default authMiddleware;
