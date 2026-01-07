import ApiResponse from "../../utils/apiResponse.js";
import ApiError from "../../utils/apiError.js";

import {
  registerUser,
  loginUser,
  refreshAccessToken,
} from "./auth.service.js";

/**
 * Register new user
 */
const register = async (req, res) => {
  const user = await registerUser(req.body);

  return ApiResponse.created(
    res,
    user,
    "User registered successfully"
  );
};

/**
 * Login user
 */
const login = async (req, res) => {
  const { accessToken, refreshToken, user } = await loginUser(req.body);

  // Set refresh token as HTTP-only cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return ApiResponse.success(
    res,
    { accessToken, user },
    "Login successful"
  );
};

/**
 * Logout user
 */
const logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return ApiResponse.success(
    res,
    null,
    "Logout successful"
  );
};

/**
 * Refresh access token
 */
const refresh = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw ApiError.unauthorized("Refresh token missing");
  }

  const { accessToken } = await refreshAccessToken(refreshToken);

  return ApiResponse.success(
    res,
    { accessToken },
    "Access token refreshed"
  );
};

export { register, login, logout, refresh };
