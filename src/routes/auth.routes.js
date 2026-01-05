import express from "express";
import { register } from "../modules/auth/auth.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/register", asyncHandler(register));

export default router;