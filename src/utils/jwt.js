import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "./apiError.js";

/**
 * Sign short-lived access token
 */
export const signAccessToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.ACCESS_TOKEN_EXPIRY,
    });
};

/**
 * Sign long-lived refresh token
 */
export const signRefreshToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.REFRESH_TOKEN_EXPIRY,
    });
};

/**
 * Verify JWT token
 * Throws ApiError on invalid / expired token
 */
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
        throw ApiError.unauthorized("Invalid or expired token");
    }
};
