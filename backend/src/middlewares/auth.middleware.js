import ApiError from "../utils/apiError.js";
import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw ApiError.unauthorized("Access token missing");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        throw ApiError.unauthorized("Invalid or expired token");
    }
};

export default authMiddleware;
