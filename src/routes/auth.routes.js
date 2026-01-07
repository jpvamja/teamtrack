import express from "express";

import asyncHandler from "../utils/asyncHandler.js";
import authMiddleware from "../middlewares/auth.middleware.js";

import {
    register,
    login,
    logout,
    refresh,
} from "../modules/auth/auth.controller.js";

const router = express.Router();

/**
 * =========================
 * Auth Routes
 * =========================
 */
router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/refresh", asyncHandler(refresh));
router.post("/logout", authMiddleware, asyncHandler(logout));

export default router;
