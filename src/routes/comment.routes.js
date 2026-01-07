import express from "express";
import {
  createComment,
  fetchCommentsByTask,
} from "./comment.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createComment);
router.get("/", fetchCommentsByTask);

export default router;
