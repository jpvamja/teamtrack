import ApiError from "../utils/apiError.js";

/**
 * Role-based authorization middleware
 * @param  {...string} allowedRoles - Roles allowed to access the resource
 */
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // auth.middleware must run before this
        if (!req.user || !req.user.role) {
            return next(ApiError.unauthorized("User not authenticated"));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(
                ApiError.forbidden(
                    "You do not have permission to access this resource"
                )
            );
        }

        next();
    };
};

export default authorizeRoles;
