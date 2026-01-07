import { Router } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import validate from "../middlewares/validator.middleware.js";
import rateLimiter from "../middlewares/rateLimiter.middleware.js";

import {
  register,
  login,
  refresh,
  logout,
} from "../modules/auth/auth.controller.js";

import {
  registerSchema,
  loginSchema,
} from "../modules/auth/auth.validation.js";

const router = Router();

const authLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many auth attempts, please try again later",
});

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  "/register",
  authLimiter,                 // prevent abuse
  validate(registerSchema),    // validate request body
  asyncHandler(register)
);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
  "/login",
  authLimiter,                 // brute-force protection
  validate(loginSchema),
  asyncHandler(login)
);

/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Refresh access token
 * @access  Public (uses HTTP-only cookie)
 */
router.post(
  "/refresh",
  asyncHandler(refresh)
);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user & clear refresh token
 * @access  Public
 */
router.post(
  "/logout",
  asyncHandler(logout)
);

export default router;
