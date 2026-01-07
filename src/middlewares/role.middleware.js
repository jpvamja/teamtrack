import ApiError from "../utils/apiError.js";

/**
 * Global role authorization middleware
 * ⚠️ Use ONLY for global roles (not org/project roles)
 */
const authorizeRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // authMiddleware must run before this
      const userRole = req.user?.role;

      if (!userRole) {
        return next(
          ApiError.forbidden("Access denied")
        );
      }

      if (!allowedRoles.includes(userRole)) {
        return next(
          ApiError.forbidden(
            "You do not have permission to access this resource"
          )
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authorizeRoles;
