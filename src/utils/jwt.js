import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const signAccessToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.ACCESS_TOKEN_EXPIRY,
    });
};

export const signRefreshToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.REFRESH_TOKEN_EXPIRY,
    });
};

export const verifyToken = (token) => {
    return jwt.verify(token, env.JWT_SECRET);
};
