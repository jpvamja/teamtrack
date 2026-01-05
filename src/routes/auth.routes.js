import express from "express";
import asyncHandler from "../utils/asyncHandler.js";

import { register, login ,logout } from "../modules/auth/auth.controller.js";

const router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/logout", asyncHandler(logout));

export default router;
