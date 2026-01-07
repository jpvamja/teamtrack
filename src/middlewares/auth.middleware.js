import ApiError from "../utils/apiError.js";
import { verifyToken } from "../utils/jwt.js";

/**
 * Authentication middleware
 * Verifies JWT access token and attaches user payload to request
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    /**
     * Attach decoded token payload
     * Example payload: { userId, role }
     */
    req.user = decoded;

    /**
     * 🔐 Optional future hardening:
     * - Fetch user from DB
     * - Check isActive / token version
     */

    next();
  } catch (error) {
    next(ApiError.unauthorized("Unauthorized"));
  }
};

export default authMiddleware;
