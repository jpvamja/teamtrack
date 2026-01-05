import ApiError from "../utils/apiError.js";

const authorizeRoles = (...allowedRoles) => {
    return (req,res,next) => {
        if (!req.user || !req.user.role) {
            throw ApiError.unauthorized("User not authenticated")
        }

        if (!allowedRoles.includes(req.user.role)) {
            throw ApiError.forbidden("You do not have permission to access this resource");
        }

        next();
    }
};

export default authorizeRoles;