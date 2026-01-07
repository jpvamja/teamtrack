import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "./apiError.js";

const ACCESS = "access";
const REFRESH = "refresh";

/**
 * Common JWT options
 */
const JWT_OPTIONS = {
  algorithm: "HS256",
  issuer: "teamtrack-api",
};

/**
 * Sign short-lived access token
 */
export const signAccessToken = (payload) => {
  return jwt.sign(
    { ...payload, tokenType: ACCESS },
    env.JWT_ACCESS_SECRET,
    {
      ...JWT_OPTIONS,
      expiresIn: env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

/**
 * Sign long-lived refresh token
 */
export const signRefreshToken = (payload) => {
  return jwt.sign(
    { ...payload, tokenType: REFRESH },
    env.JWT_REFRESH_SECRET,
    {
      ...JWT_OPTIONS,
      expiresIn: env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

/**
 * Verify JWT token
 */
export const verifyToken = (token, expectedType = ACCESS) => {
  try {
    const decoded = jwt.verify(token, 
      expectedType === ACCESS
        ? env.JWT_ACCESS_SECRET
        : env.JWT_REFRESH_SECRET,
      { algorithms: ["HS256"], issuer: JWT_OPTIONS.issuer }
    );

    if (decoded.tokenType !== expectedType) {
      throw ApiError.unauthorized("Invalid token type");
    }

    return decoded;
  } catch (error) {
    throw ApiError.unauthorized("Unauthorized");
  }
};
