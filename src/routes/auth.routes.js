import express from "express";
import asyncHandler from "../utils/asyncHandler.js";

import { register, login } from "../modules/auth/auth.controller.js";

const router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;
